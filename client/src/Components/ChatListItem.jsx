import React from "react";
import { NavLink } from "react-router-dom";

function ChatListItem({ convo }) {
    const { userDetails } = convo;

    return (
        <NavLink to={"/chat/" + convo._id} className={"chat-list-item"}>
            {userDetails?.firstname + " " + userDetails?.lastname} -{" "}
            {userDetails?.carDetails?.plate} status: {convo.status}
        </NavLink>
    );
}

export default ChatListItem;
