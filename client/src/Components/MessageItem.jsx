import React from "react";
import moment from "moment";

function MessageItem({ msg, user }) {
    return (
        <div
            className="mb-3"
            style={{
                textAlign: msg.senderId === user.id ? "right" : "left",
            }}
        >
            <h6 className="mb-0">{msg.senderId}:</h6>
            <small>{moment(msg.createdDate).fromNow()}</small>
            <p>{msg.text}</p>
        </div>
    );
}

export default MessageItem;
