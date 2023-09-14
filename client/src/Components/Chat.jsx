import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Chat() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Chat");
    }, [id]);

    return (
        <div>
            <header className="p-3">
                <button onClick={() => navigate(-1)}>{"<"}</button>Chat {id}
            </header>
            <div className="p-3">Messages</div>
        </div>
    );
}

export default Chat;
