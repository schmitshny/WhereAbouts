"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.post("/signin", user_1.signin);
router.post("/signup", user_1.signup);
router.patch("/setAvatar/:id", user_1.setAvatar);
router.patch("/editAccount/:id", user_1.editAccount);
router.patch("/changePassword", user_1.changePassword);
router.get("/getUserInfo/:id", user_1.getUserInfo);
router.get("/allUsers/:id", user_1.getAllUsers);
exports.default = router;
