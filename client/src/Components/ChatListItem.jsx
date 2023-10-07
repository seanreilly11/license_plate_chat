import React from "react";
import { NavLink } from "react-router-dom";
import { getFormattedTime } from "../utils/utils";
import { useAuth } from "../hooks/useAuth";

function ChatListItem({ convo }) {
    const { userDetails } = convo;
    const loggedInUser = useAuth();

    const showTime = (time) => {
        time = new Date(time);
        return <small className="mb-0">{getFormattedTime(time)}</small>;
    };

    return (
        <NavLink
            to={"/chat/" + convo._id}
            className={"chat-list-item "}
            style={{
                fontWeight: !convo.seenBy.includes(loggedInUser.id)
                    ? "bold"
                    : "initial",
            }}
        >
            <div className="d-flex align-items-center">
                <h3 className="mb-0">{userDetails?.carDetails?.plate}</h3>
                <h3 className=" mx-2">-</h3>
                <h6 className="mb-0">
                    {userDetails?.firstname + " " + userDetails?.lastname}
                </h6>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <span>
                    {convo.lastMessageText.length < 32
                        ? convo.lastMessageText
                        : convo.lastMessageText.substring(0, 32) + "..."}
                </span>
                <span>{showTime(convo.updatedDate)}</span>
            </div>
        </NavLink>
    );
}

export default ChatListItem;
