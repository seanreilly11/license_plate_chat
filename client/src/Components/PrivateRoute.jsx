import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute({ children }) {
    const isAuthed = useAuth();
    if (!isAuthed.id) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default PrivateRoute;
