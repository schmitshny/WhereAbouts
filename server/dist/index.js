"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const posts_1 = __importDefault(require("./routes/posts"));
const users_1 = __importDefault(require("./routes/users"));
const messages_1 = __importDefault(require("./routes/messages"));
const socket = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)());
app.use("/posts", posts_1.default);
app.use("/user", users_1.default);
app.use("/messages", messages_1.default);
const PORT = process.env.PORT || 5000;
mongoose_1.default
    .connect(process.env.CONNECTION_URL)
    .then(() => {
    console.log("DB Connection Succesfull");
})
    .catch((error) => {
    console.log(error.message);
});
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on Port ${process.env.PORT}`);
});
const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});
