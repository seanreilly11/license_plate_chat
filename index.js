const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const formatMessage = require("./utils/messages");
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} = require("./utils/users");
const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const botName = "Chat Bot";

const videos = require("./routes/videos");
const users = require("./routes/users");
const courses = require("./routes/courses");

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.use("/api/v1/videos", videos);
app.use("/api/v1/users", users);
app.use("/api/v1/courses", courses);

// io.use((socket, next) => {
//     const username = socket.handshake.auth.username;
//     if (!username) {
//         return next(new Error("invalid username"));
//     }
//     socket.username = username;
//     next();
// });
//

// Run when client connects
io.on("connection", (socket) => {
    // console.log(io.of("/").adapter);
    console.log("Connected: " + socket.id);
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // Welcome current user only
        io.to(socket.id).emit(
            "message",
            formatMessage(botName, "Welcome to ChatCord!", user.room)
        );

        // Broadcast when a user connects to everyone except latest user
        socket
            .to(user.room)
            .emit(
                "message",
                formatMessage(
                    botName,
                    `${user.username} has joined the chat`,
                    user.room
                )
            );

        // Send users and room info
        // io.to(user.room).emit("roomUsers", {
        //     room: user.room,
        //     users: getRoomUsers(user.room),
        // });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit(
            "message",
            formatMessage(user.username, msg, user.room)
        );
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});

server.listen(4000, () => "Server is running on port 4000");
