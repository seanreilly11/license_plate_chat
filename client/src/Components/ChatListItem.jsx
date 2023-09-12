import React from "react";
import { NavLink } from "react-router-dom";

function ChatListItem({ item }) {
    return (
        <NavLink to={"/chat/" + item} className={"chat-list-item"}>
            User {item}
        </NavLink>
    );
}

export default ChatListItem;
