import express from "express";
import { getAllMessages, addMessage } from "../controllers/messages";
const router = express.Router();

router.post("/addMessage", addMessage);
router.post("/getMessages", getAllMessages);

export default router;
