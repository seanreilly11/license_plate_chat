import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import ChatList from "./Components/ChatList";
import Login from "./Components/Login";

function App() {
    return (
        <div>
            <h1>License Plate Chat App</h1>
            <Routes>
                <Route path="/" element={<ChatList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat/:id" element={<Chat />} />
            </Routes>
        </div>
    );
}

export default App;
