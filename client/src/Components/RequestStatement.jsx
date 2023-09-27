import React from "react";

function RequestStatement({ user }) {
    return (
        <div className="mt-3">
            <h3>{user.firstname} has sent you a message request</h3>
            <p>Reply to accept this message request or block the user here</p>
            <button>Block</button>
        </div>
    );
}

export default RequestStatement;
