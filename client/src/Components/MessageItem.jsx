import React from "react";
import moment from "moment";
import { isToday, isThisWeek, isThisYear } from "../utils/utils";

function MessageItem({ msg, user, prev }) {
    const showTime = (time) => {
        time = new Date(time);
        let formattedTime = "";
        const diff = (time.getTime() - new Date(prev).getTime()) / 1000;
        if (diff > 600 || !prev) {
            if (isToday(time)) formattedTime = moment(time).format("h:mm a");
            else if (isThisWeek(time))
                formattedTime = moment(time).format("ddd h:mm a");
            else if (isThisYear(time))
                formattedTime = moment(time).format("DD MMM h:mm a");
            else formattedTime = moment(time).format("DD MMM YYYY h:mm a");

            return (
                <div className="my-3 text-center">
                    <p className="mb-0">{formattedTime}</p>
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
