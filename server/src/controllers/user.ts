import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.send({ message: "User doesn't exist." });
    }
    const isPasswordCorrent = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrent) {
      return res.send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "2h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 12);
    await user.updateOne({ password: hashPassword });
    return res.status(200).json({ message: "Password updated!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, name, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ message: "User already exists." });
    }
    if (password !== confirmPassword) {
      return res.send({ message: "Password don't match" });
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
      lastName,
    });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "2h",
    });

    res.status(200).json({ result: newUser, token });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const setAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      { avatarImage: avatarImage },
      {
        new: true,
      }
    );
    if (userData) {
      res.json({ isSet: true });
    }
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const { email, name, lastName, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { email, name, lastName, bio },
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select(
      "name lastName avatarImage"
    );

    if (user) {
      res.json(user);
    }
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};
