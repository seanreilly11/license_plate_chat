import React from "react";

function RequestStatement({ user }) {
    return (
        <div className="request-statement">
            <h3>{user.firstname} has sent you a message request</h3>
            <p>Reply to accept this message request or block the user here</p>
            <button className="btn btn-outline-primary btn-block w-100">
                Block
            </button>
        </div>
    );
}

export default RequestStatement;
