import React from "react";
import { NavLink } from "react-router-dom";
import { getFormattedTime } from "../utils/utils";

function ChatListItem({ convo }) {
    const { userDetails } = convo;

    const showTime = (time) => {
        time = new Date(time);
        return <small className="mb-0">{getFormattedTime(time)}</small>;
    };

    return (
        <NavLink to={"/chat/" + convo._id} className={"chat-list-item"}>
            {userDetails?.firstname + " " + userDetails?.lastname} -{" "}
            {userDetails?.carDetails?.plate} status: {convo.status}
            <div>{showTime(convo.updatedDate)}</div>
        </NavLink>
    );
}

export default ChatListItem;
