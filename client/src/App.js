import React from "react";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import ChatList from "./Components/ChatList";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import { history } from "./hooks/useHistory";
import Register from "./Components/Register";
import { useAuth } from "./hooks/useAuth";
import { auth } from "./hooks/useAuthConst";

function App() {
    // const location = useLocation();
    history.navigate = useNavigate();
    history.location = useLocation();
    const user = useAuth();
    auth.id = user?.id;
    auth.token = user?.token;
    auth.name = user?.firstname;

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <ChatList />
                    </PrivateRoute>
                }
            />
            <Route
                path="/chat/:id"
                element={
                    <PrivateRoute>
                        <Chat />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;
