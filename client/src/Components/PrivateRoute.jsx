import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute({ children }) {
    const isAuthed = useAuth();
    if (!isAuthed) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default PrivateRoute;
