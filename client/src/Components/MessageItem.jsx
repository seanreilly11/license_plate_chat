import React from "react";
import { getFormattedTime } from "../utils/utils";

function MessageItem({ msg, user, prev }) {
    const showTime = (time) => {
        time = new Date(time);
        const diff = (time.getTime() - new Date(prev).getTime()) / 1000;
        if (diff > 600 || !prev) {
            return (
                <div className="my-3 text-center">
                    <p className="mb-0">{getFormattedTime(time)}</p>
                </div>
            );
        }
    };

    return (
        <>
            {showTime(msg.createdDate)}
            <div
                className={
                    "chat-message " +
                    (msg.senderId === user.id ? "right" : "left")
                }
            >
                {/* <h6 className="mb-0">{msg.senderId}:</h6> */}
                <p className="mb-0">{msg.text}</p>
            </div>
        </>
    );
}

export default MessageItem;
