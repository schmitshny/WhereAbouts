import { Schema, model } from "mongoose";

export interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  id: string;
  avatarImage: string;
  bio: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  avatarImage: { type: String, required: false, default: "" },
  bio: { type: String, required: false, default: "" },
});

export default model("User", userSchema);
