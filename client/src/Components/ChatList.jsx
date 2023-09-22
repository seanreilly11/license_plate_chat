import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { userActions } from "../redux/actions/user.actions";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import { conversationActions } from "../redux/actions/conversation.actions";
import Spinner from "./Spinner";

function ChatList() {
    const user = useSelector((state) => state.users.item);
    const fetchedRef = useRef(false);
    const dispatch = useDispatch();
    const loggedInUser = useAuth();

    useEffect(() => {
        if (fetchedRef.current) return;
        dispatch(userActions.getSingle(loggedInUser.id));
        fetchedRef.current = true;
    }, []);

    return (
        <div>
            <h1 className="p-2">Messages</h1>
            <SearchBar />
            {user?.conversations?.length > 0 ? (
                user?.conversations?.map((convo) => {
                    return <ChatListItem convo={convo} key={convo} />;
                })
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default ChatList;
