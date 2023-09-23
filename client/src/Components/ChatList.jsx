import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { userActions } from "../redux/actions/user.actions";
import { authenticationActions } from "../redux/actions/authentication.actions";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";
import Search from "./Search";
import SearchBar from "./SearchBar";
import SearchListItem from "./SearchListItem";

function ChatList() {
    const user = useSelector((state) => state.users.item);
    const userSearch = useSelector((state) => state.users.items);
    const fetchedRef = useRef(false);
    const dispatch = useDispatch();
    const loggedInUser = useAuth();
    const [searchActive, setSearchActive] = useState(false);

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
            <SearchBar setSearchActive={setSearchActive} />
            <div>
                {searchActive ? (
                    userSearch?.map((user) => (
                        <SearchListItem user={user} key={user._id} />
                    ))
                ) : user?.conversations?.length > 0 ? (
                    user?.conversations?.map((convo) => (
                        <ChatListItem convo={convo} key={convo._id} />
                    ))
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
}

export default ChatList;
