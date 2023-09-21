import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { makeConversationID } from "../utils/utils";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { conversationActions } from "../redux/actions/conversation.actions";

function ChatListItem({ user }) {
    const loggedInUser = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const convo = useSelector((state) => state.conversations.item);

    const navigateToChat = () => {
        // check if conversation exist, if not create it, then go to id route
        // to check search convoIds with the created convoId
        dispatch(
            conversationActions.findConversationId(
                makeConversationID(user._id, loggedInUser.id)
            )
        );
    };

    useEffect(() => {
        if (convo) navigate("/chat/" + convo._id);
        return () => dispatch(conversationActions.removeFoundConvo());
    }, [convo]);

    //to={"/chat/" + makeConversationID(user._id, loggedInUser.id)}

    return (
        <div onClick={navigateToChat} className={"chat-list-item"}>
            {user.firstname + " " + user.lastname} - {user.carDetails.plate}
        </div>
    );
}

export default ChatListItem;
