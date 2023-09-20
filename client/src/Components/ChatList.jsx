import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { userActions } from "../redux/actions/user.actions";

function ChatList() {
    const users = useSelector((state) => state.users.items);
    const fetchedRef = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (fetchedRef.current) return;
        dispatch(userActions.getAll());
        fetchedRef.current = true;
    }, []);

    return (
        <div>
            {users?.length > 0 ? (
                users?.map((user) => (
                    <ChatListItem user={user} key={user._id} />
                ))
            ) : (
                <div className="loader"></div>
            )}
        </div>
    );
}

export default ChatList;
