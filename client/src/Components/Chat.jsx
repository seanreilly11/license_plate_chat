import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import { conversationActions } from "../redux/actions/conversation.actions";
import { useAuth } from "../hooks/useAuth";
import { messageActions } from "../redux/actions/message.actions";
import Spinner from "./Spinner";
import RequestStatement from "./RequestStatement";
const socket = socketIO.connect("http://localhost:4000", {
    autoConnect: false,
});

function Chat() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const messagesReceived = useSelector((state) => state.messages.items);
    const convo = useSelector((state) => state.conversations.item);
    const loading = useSelector((state) => state.messages.loading);
    const [messageText, setMessageText] = useState("");
    const joinedRef = useRef(false);
    const isFirstViewRef = useRef(true);
    const fetchedRef = useRef(false);
    const scrollToRef = useRef(null);
    const loggedInUser = useAuth();

    const handleJoin = (e) => {
        if (joinedRef.current) return;

        socket.auth = { username: loggedInUser.firstname };
        socket.connect();

        socket.emit("joinRoom", { username: loggedInUser.firstname, room: id });
        joinedRef.current = true;
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (messageText) {
            const msg = {
                text: messageText,
                senderId: loggedInUser.id,
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

        if (!fetchedRef.current) {
            dispatch(conversationActions.getSingle(id));
            fetchedRef.current = true;
        }
        handleJoin();

        return () => {
            socket.off("message");
            socket.offAny();
        };
    }, [socket]);

    useEffect(() => {
        if (
            isFirstViewRef.current &&
            !loading &&
            messagesReceived?.length > 0
        ) {
            scrollToRef.current?.scrollIntoView({ behavior: "auto" });
            isFirstViewRef.current = false;
        }
        scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messagesReceived]);

    return (
        <div>
            <header className="chat-header">
                <button onClick={() => navigate(-1)}>{"<"}</button>
                <h5 className="mb-0 ms-3">
                    {convo?.userDetails?.firstname}{" "}
                    {convo?.userDetails?.lastname} -{" "}
                    {convo?.userDetails?.carDetails?.plate}
                </h5>
            </header>
            <div className="message-list">
                {messagesReceived?.map((msg, i) => (
                    <MessageItem
                        key={msg._id}
                        msg={msg}
                        user={loggedInUser}
                        prev={messagesReceived[i - 1]?.createdDate}
                    />
                ))}
                {!loading && messagesReceived?.length < 1 && (
                    <div className="mt-4 text-center">
                        <h1>{convo?.userDetails?.carDetails?.plate}</h1>
                        <p>
                            {convo?.userDetails?.firstname}{" "}
                            {convo?.userDetails?.lastname}
                        </p>
                    </div>
                )}
                {loading && isFirstViewRef.current && (
                    <div className="mt-3">
                        <Spinner />
                    </div>
                )}
                {convo?.status === 0 &&
                    convo.initiatedUser !== loggedInUser.id && (
                        <RequestStatement user={convo.userDetails} />
                    )}
                <div ref={scrollToRef}></div>
            </div>
            <form className="chat-form" onSubmit={handleSend}>
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    autoComplete="off"
                    placeholder="Aa"
                />
                <input type="submit" value="Send" />
            </form>
        </div>
    );
}

export default Chat;
