import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/user.actions";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";

function RequestStatement({ user, blocked }) {
    const dispatch = useDispatch();
    const loggedInUser = useAuth();
    const loading = useSelector((state) => state.users.loading);

    const handleSubmit = () => {
        const obj = { blockeeId: user._id, blockerId: loggedInUser.id };
        dispatch(userActions.blockUser(obj));
    };

    return (
        <div className="request-statement">
            {blocked ? (
                <>
                    <h3>You have blocked {user.firstname}</h3>
                    <p>
                        You will not be able to message each other or see each
                        other unless you unblock them.
                    </p>
                    <button
                        className="btn btn-outline-primary btn-block w-100"
                        onClick={handleSubmit}
                    >
                        {loading ? <Spinner /> : "Unblock"}
                    </button>
                </>
            ) : (
                <>
                    <h3>{user.firstname} has sent you a message request</h3>
                    <p>
                        Reply to accept this message request or block the user
                        here
                    </p>
                    <button
                        className="btn btn-outline-primary btn-block w-100"
                        onClick={handleSubmit}
                    >
                        {loading ? <Spinner /> : "Block"}
                    </button>
                </>
            )}
        </div>
    );
}

export default RequestStatement;
