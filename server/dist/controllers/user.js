"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUserInfo = exports.editAccount = exports.setAvatar = exports.signup = exports.changePassword = exports.signin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (!existingUser) {
            return res.send({ message: "User doesn't exist." });
        }
        const isPasswordCorrent = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrent) {
            return res.send({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "2h" });
        res.status(200).json({ result: existingUser, token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signin = signin;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword, userId } = req.body;
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(500).json({ message: "Something went wrong" });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const hashPassword = yield bcryptjs_1.default.hash(newPassword, 12);
        yield user.updateOne({ password: hashPassword });
        return res.status(200).json({ message: "Password updated!" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.changePassword = changePassword;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, name, lastName } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.send({ message: "User already exists." });
        }
        if (password !== confirmPassword) {
            return res.send({ message: "Password don't match" });
        }
        const hashPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = yield user_1.default.create({
            email,
            password: hashPassword,
            name,
            lastName,
        });
        const token = jsonwebtoken_1.default.sign({ email: newUser.email, id: newUser._id }, "test", {
            expiresIn: "2h",
        });
        res.status(200).json({ result: newUser, token });
    }
    catch (_a) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signup = signup;
const setAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = yield user_1.default.findByIdAndUpdate(userId, { avatarImage: avatarImage }, {
            new: true,
        });
        if (userData) {
            res.json({ isSet: true });
        }
    }
    catch (_b) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.setAvatar = setAvatar;
const editAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { email, name, lastName, bio } = req.body;
        const updatedUser = yield user_1.default.findByIdAndUpdate(userId, {
            $set: { email, name, lastName, bio },
        }, {
            new: true,
        });
        res.json(updatedUser);
    }
    catch (_c) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.editAccount = editAccount;
const getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_1.default.findById(userId).select("name lastName avatarImage");
        if (user) {
            res.json(user);
        }
    }
    catch (_d) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getUserInfo = getUserInfo;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({ _id: { $ne: req.params.id } }).select([
            "name",
            "lastName",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    }
    catch (ex) {
        next(ex);
    }
});
exports.getAllUsers = getAllUsers;
