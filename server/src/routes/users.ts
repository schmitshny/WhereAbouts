import express from "express";
import {
  changePassword,
  editAccount,
  getUserInfo,
  setAvatar,
  signin,
  signup,
} from "../controllers/user";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/setAvatar/:id", setAvatar);
router.patch("/editAccount/:id", editAccount);
router.patch("/changePassword", changePassword);
router.get("/getUserInfo/:id", getUserInfo);

export default router;
