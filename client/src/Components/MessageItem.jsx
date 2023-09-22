import React from "react";
import moment from "moment";
import { isToday, isThisWeek, isThisYear } from "../utils/utils";

function MessageItem({ msg, user, prev }) {
    const showTime = (time) => {
        time = new Date(time);
        const diff = (time.getTime() - new Date(prev).getTime()) / 1000;
        if (diff > 600 || !prev) {
            if (isToday(time))
                return <p className="mb-2">{moment(time).format("h:mm a")}</p>;
            else if (isThisWeek(time))
                return (
                    <p className="mb-2">{moment(time).format("ddd h:mm a")}</p>
                );
            else if (isThisYear(time))
                return (
                    <p className="mb-2">
                        {moment(time).format("DD MMM h:mm a")}
                    </p>
                );
            else
                return (
                    <p className="mb-2">
                        {moment(time).format("DD MMM YYYY h:mm a")}
                    </p>
                );
        }
    };

    return (
        <div className="mb-3 text-center">
            {showTime(msg.createdDate)}
            <div
                style={{
                    textAlign: msg.senderId === user.id ? "right" : "left",
                }}
            >
                <h6 className="mb-0">{msg.senderId}:</h6>
                <p>{msg.text}</p>
            </div>
        </div>
    );
}

export default MessageItem;
