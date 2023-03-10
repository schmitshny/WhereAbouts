import express from "express";

import {
  getPosts,
  searchPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getSinglePost,
  commentPost,
  getUserPosts,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/search", searchPosts);
router.get("/:id", getSinglePost);
router.get("/getUserPosts/:creatorId", getUserPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
