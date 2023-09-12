import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import ChatList from "./Components/ChatList";

function App() {
    return (
        <div>
            <h1>License Plate Chat App</h1>
            <div className="d-flex">
                <ChatList />
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/chat/:id" element={<Chat />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
