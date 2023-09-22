import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
import MessageItem from "./MessageItem";
import { useDispatch, useSelector } from "react-redux";
import { conversationActions } from "../redux/actions/conversation.actions";
import { useAuth } from "../hooks/useAuth";
import { messageActions } from "../redux/actions/message.actions";
import Spinner from "./Spinner";
const socket = socketIO.connect("http://localhost:4000", {
    autoConnect: false,
});

function Chat() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const messagesReceived = useSelector((state) => state.messages.items);
    const [messageText, setMessageText] = useState("");
    const joinedRef = useRef(false);
    const scrollToRef = useRef(null);
    const user = useAuth();

    const handleJoin = (e) => {
        if (joinedRef.current) return;

        socket.auth = { username: user.firstname };
        socket.connect();

        socket.emit("joinRoom", { username: user.firstname, room: id });
        joinedRef.current = true;
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (messageText) {
            const msg = {
                text: messageText,
                senderId: user.id,
                conversationId: id,
            };
            socket.emit("chatMessage", msg);
            setMessageText("");
        }
    };

    useEffect(() => {
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });
        socket.on("message", (data) => {
            dispatch(messageActions.newMessage(data));
        });

        dispatch(conversationActions.getSingle(id));
        handleJoin();

        return () => {
            socket.off("message");
            socket.offAny();
        };
    }, [socket]);

    useEffect(() => {
        scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messagesReceived]);

    return (
        <div>
            <header className="chat-header">
                <button onClick={() => navigate(-1)}>{"<"}</button>Chat {id}
            </header>
            <div className="message-list">
                {messagesReceived?.length > 0 ? (
                    messagesReceived?.map((msg, i) => (
                        <MessageItem
                            key={msg._id}
                            msg={msg}
                            user={user}
                            prev={messagesReceived[i - 1]?.createdDate}
                        />
                    ))
                ) : (
                    <Spinner />
                )}
                <div ref={scrollToRef}></div>
            </div>
            <form className="chat-form" onSubmit={handleSend}>
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    autoComplete="off"
                />
                <input type="submit" value="Send" />
            </form>
        </div>
    );
}

export default Chat;
