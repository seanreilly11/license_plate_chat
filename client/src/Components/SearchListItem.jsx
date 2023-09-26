import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeConversationID } from "../utils/utils";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { conversationActions } from "../redux/actions/conversation.actions";

function SearchListItem({ user }) {
    const loggedInUser = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const convoId = useSelector((state) => state.conversations.convoId);
    const { userDetails } = user;

    const navigateToChat = () => {
        // check if conversation exist, if not create it, then go to id route
        // to check search convoIds with the created convoId
        dispatch(
            conversationActions.findConversationId(
                makeConversationID(userDetails._id, loggedInUser.id),
                loggedInUser.id
            )
        );
    };

    useEffect(() => {
        if (convoId) navigate("/chat/" + convoId);
        return () => dispatch(conversationActions.removeFoundConvo());
    }, [convoId]);

    return (
        <div onClick={navigateToChat} className={"chat-list-item"}>
            {user.plate}
        </div>
    );
}

export default SearchListItem;
