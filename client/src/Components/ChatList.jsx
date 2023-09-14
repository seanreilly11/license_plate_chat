import React, { useEffect, useRef, useState } from "react";
import ChatListItem from "./ChatListItem";

function ChatList() {
    const [users, setUsers] = useState([]);
    const fetchedRef = useRef(false);

    const fetchUserData = () => {
        if (fetchedRef.current) return;
        fetch("http://localhost:4000/api/v1/users")
            .then((response) => response.json())
            .then((data) => setUsers(data));
        fetchedRef.current = true;
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            {users.length > 0 ? (
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
