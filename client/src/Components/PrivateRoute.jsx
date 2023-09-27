import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute({ children }) {
    const auth = useAuth();
    if (!auth.id) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default PrivateRoute;
