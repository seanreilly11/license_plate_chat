import React from "react";

function MessageItem({ msg, user }) {
    return (
        <div
            className="mb-3"
            style={{
                textAlign: msg.username === user ? "right" : "left",
            }}
            key={msg.time}
        >
            <h6 className="mb-0">{msg.username}:</h6>
            <p>{msg.message}</p>
        </div>
    );
}

export default MessageItem;
