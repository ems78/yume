import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../interfaces";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userCollection = (req as any).collections.users;
    const user: User = await findUserByEmail(email, userCollection);

    if (!user) {
      return res.status(401).json({ message: "No account for email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    config();
    const secretKey: string = process.env.JWT_SECRET || "SECRET_KEY";
    const token = jwt.sign(
      { userId: user._id, userEmail: user.email },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const userCollection = (req as any).collections.users;

    if (await findUserByEmail(email, userCollection)) {
      return res
        .status(409)
        .json({ message: "Email is already registered. Please log in." });
    }

    if (await findUserByUsername(username, userCollection)) {
      return res
        .status(409)
        .json({ message: "Username is already taken. Please choose another." });
    }

    const hashedPassword = await hashPassword(password);

    const user = await userCollection.insertOne({
      username,
      email,
      passwordHash: hashedPassword,
    });

    if (!user) {
      return res.status(500).json({ message: "Error signing up" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error("Error signing up: ", error);
    res.status(500).json({ message: "Error signing up" });
  }
};

const findUserByEmail = async (email: string, userCollection: any) => {
  try {
    const user = await userCollection.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error finding user by email: ", error);
    throw error;
  }
};

const findUserByUsername = async (username: string, userCollection: any) => {
  try {
    const user = await userCollection.findOne({ username });
    return user;
  } catch (error) {
    console.error("Error finding user by username: ", error);
    throw error;
  }
};

const hashPassword = async (password: string) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Error hashing password: ", error);
    throw error;
  }
};
