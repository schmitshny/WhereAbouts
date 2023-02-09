import express from "express";
import {
  changePassword,
  editAccount,
  getAllUsers,
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
router.get("/allUsers/:id", getAllUsers);

export default router;
