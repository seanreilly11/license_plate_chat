import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:4000", {
    autoConnect: false,
});

function Chat() {
    const { id } = useParams();
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [messageText, setMessageText] = useState("");
    const joinedRef = useRef(false);
    const user = search.get("user");

    const handleJoin = (e) => {
        if (joinedRef.current) return;

        socket.auth = { username: user };
        socket.connect();

        // const roomName = e.target.name;
        socket.emit("joinRoom", { username: user, room: id });

        joinedRef.current = true;
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (messageText) {
            socket.emit("chatMessage", messageText);
            setMessageText("");
        }
    };

    useEffect(() => {
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });
        socket.on("message", (data) => {
            console.log(data);
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    room: data.room,
                    time: data.time,
                },
            ]);
        });

        handleJoin();

        // Remove event listener on component unmount
        return () => socket.off("message");
    }, [socket]);

    return (
        <div>
            <header className="p-3">
                <button onClick={() => navigate(-1)}>{"<"}</button>Chat {id}
            </header>
            <div className="p-3">
                <h4>Messages</h4>
                {messagesReceived?.map((msg) => (
                    <div className="mb-3" key={msg.time}>
                        <h6 className="mb-0">{msg.username}:</h6>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend}>
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
