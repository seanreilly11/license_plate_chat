import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { userActions } from "../redux/actions/user.actions";
import { authenticationActions } from "../redux/actions/authentication.actions";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "./SearchBar";
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

    const handleLogout = () => {
        dispatch(authenticationActions.signOut(loggedInUser.id));
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center p-2">
                <h1 className="mb-0">Messages</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
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
