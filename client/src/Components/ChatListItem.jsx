import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { makeConversationID } from "../utils/utils";
// import { useAuth } from "../hooks/useAuth";
// import { useDispatch, useSelector } from "react-redux";
// import { conversationActions } from "../redux/actions/conversation.actions";

function ChatListItem({ convo }) {
    // const loggedInUser = useAuth();
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const convoId = useSelector((state) => state.conversations.convoId);
    const { userDetails } = convo;

    // const navigateToChat = () => {
    //     // check if conversation exist, if not create it, then go to id route
    //     // to check search convoIds with the created convoId
    //     dispatch(
    //         conversationActions.findConversationId(
    //             makeConversationID(user._id, loggedInUser.id)
    //         )
    //     );
    // };

    // useEffect(() => {
    //     if (convoId) navigate("/chat/" + convoId);
    //     return () => dispatch(conversationActions.removeFoundConvo());
    // }, [convoId]);

    return (
        <NavLink to={"/chat/" + convo._id} className={"chat-list-item"}>
            {userDetails.firstname + " " + userDetails.lastname} -{" "}
            {userDetails.carDetails.plate}
        </NavLink>
    );
}

export default ChatListItem;
