"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    avatarImage: { type: String, required: false, default: "" },
    bio: { type: String, required: false, default: "" },
});
exports.default = (0, mongoose_1.model)("User", userSchema);
