import React from "react";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import ChatList from "./Components/ChatList";
import Login from "./Components/Login";
import { history } from "./hooks/useHistory";

function App() {
    // const location = useLocation();
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div>
            <h1>License Plate Chat App</h1>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<ChatList />} />
                <Route path="/chat/:id" element={<Chat />} />
            </Routes>
        </div>
    );
}

export default App;
