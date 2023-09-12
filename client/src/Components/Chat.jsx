import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Chat() {
    const { id } = useParams();

    useEffect(() => {
        console.log("Chat");
    }, [id]);

    return <div>Chat {id}</div>;
}

export default Chat;
