import React from "react";
import { NavLink } from "react-router-dom";

function ChatListItem({ user }) {
    return (
        <NavLink to={"/chat/" + user._id} className={"chat-list-item"}>
            {user.firstname + " " + user.lastname} - {user.carDetails[0].plate}
        </NavLink>
    );
}

export default ChatListItem;
