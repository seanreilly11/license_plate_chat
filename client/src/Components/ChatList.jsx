import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { userActions } from "../redux/actions/user.actions";
import { authenticationActions } from "../redux/actions/authentication.actions";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";

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
                <p className="mb-0">{loggedInUser.firstname}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <SearchBar />
            <div>
                {/* show active messages  */}
                {user?.conversations?.length > 0 ? (
                    user?.conversations?.map(
                        (convo) =>
                            (convo.status === 1 ||
                                convo.initiatedUser === loggedInUser.id) &&
                            convo.messages.length > 0 && (
                                <ChatListItem convo={convo} key={convo._id} />
                            )
                    )
                ) : (
                    <Spinner />
                )}
            </div>
            <div>
                <h2 className="m-2 mt-4">Requests</h2>
                {/* show message requests  */}
                {user?.conversations?.length > 0 &&
                    user?.conversations?.map(
                        (convo) =>
                            convo.status === 0 &&
                            convo.initiatedUser !== loggedInUser.id && (
                                <ChatListItem convo={convo} key={convo._id} />
                            )
                    )}
            </div>
        </div>
    );
}

export default ChatList;
