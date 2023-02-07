import { Schema, model } from "mongoose";
import { User } from "./user";

interface Post {
  title: string;
  message: string;
  name: string;
  creator: User;
  tags: [string];
  selectedFile: string;
  createdAt: Date;
  likes: string[];
  comments: string[];
}

const postSchema = new Schema<Post>({
  title: String,
  message: String,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  tags: [String],
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
});

const PostMessage = model("PostMessage", postSchema);

export default PostMessage;
