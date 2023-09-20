import React from "react";
import { useSelector } from "react-redux";

export function useAuth() {
    const auth = JSON.parse(localStorage.getItem("user"));
    const auth2 = useSelector((state) => state.authentication.id);
    return auth || auth2;
}
