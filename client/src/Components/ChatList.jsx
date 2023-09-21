import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { userActions } from "../redux/actions/user.actions";
import { useAuth } from "../hooks/useAuth";

function ChatList() {
    const users = useSelector((state) => state.users.items);
    const fetchedRef = useRef(false);
    const dispatch = useDispatch();
    const loggedInUser = useAuth();

    useEffect(() => {
        if (fetchedRef.current) return;
        dispatch(userActions.getAll());
        fetchedRef.current = true;
    }, []);

    return (
        <div>
            {users?.length > 0 ? (
                users?.map((user) => {
                    if (user._id !== loggedInUser.id)
                        return <ChatListItem user={user} key={user._id} />;
                })
            ) : (
                <div className="loader"></div>
            )}
        </div>
    );
}

export default ChatList;
