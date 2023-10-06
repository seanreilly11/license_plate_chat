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
            <div className="d-flex align-items-center">
                <h3 className="mb-0">{userDetails?.carDetails?.plate}</h3>
                <h3 className=" mx-2">-</h3>
                <h6 className="mb-0">
                    {userDetails?.firstname + " " + userDetails?.lastname}
                </h6>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <span>{convo.lastMessageText}</span>
                <span>{showTime(convo.updatedDate)}</span>
            </div>
        </NavLink>
    );
}

export default ChatListItem;
