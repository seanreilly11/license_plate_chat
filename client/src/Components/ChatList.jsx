import React from "react";
import ChatListItem from "./ChatListItem";

function ChatList() {
    return (
        <div>
            {[1, 2, 3].map((item) => (
                <ChatListItem item={item} key={item} />
            ))}
        </div>
    );
}

export default ChatList;
