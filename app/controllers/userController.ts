import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../interfaces";
import { Collection } from "mongoose";

/**
 * Performs user login.
 * @param {Request} req The request object containing user credentials in the request body.
 * @param {Response} res The response object used to send the login result.
 * @returns {Promise<void | Response<any>>} A promise that resolves with the response sent to the client, or void if no response is sent.
 */
export const login = async (
  req: Request,
  res: Response
): Promise<void | Response<any>> => {
  try {
    const { email, password } = req.body;
    const userCollection = (req as any).collections.users;
    const user: User | null = await findUserByEmail(email, userCollection);

    if (!user) {
      return res.status(401).json({ message: "Account doesn't exist" });
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

/**
 * Registers a new user.
 * @param {Request} req The request object containing user registration data in the request body.
 * @param {Response} res The response object used to send the registration result.
 * @returns {Promise<void | Response<any>>} A promise that resolves with the response sent to the client, or void if no response is sent.
 */
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void | Response<any>> => {
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

/**
 * Finds a user by email in the specified user collection.
 * @param {string} email The email of the user to find.
 * @param {Collection<User>} userCollection The collection where the user should be searched for.
 * @returns {Promise<User | null>} A promise that resolves to the found user, or null if not found.
 * @throws {Error} If there is an error while finding the user.
 */
const findUserByEmail = async (
  email: string,
  userCollection: Collection<User>
): Promise<User | null> => {
  try {
    const user = await userCollection.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error finding user by email: ", error);
    throw error;
  }
};

/**
 * Finds a user by username in the specified user collection.
 * @param {string} username The username of the user to find.
 * @param {Collection<User>} userCollection The collection where the user should be searched for.
 * @returns {Promise<User | null>} A promise that resolves to the found user, or null if not found.
 * @throws {Error} If there is an error while finding the user.
 */
const findUserByUsername = async (
  username: string,
  userCollection: Collection<User>
): Promise<User | null> => {
  try {
    const user = await userCollection.findOne({ username });
    return user;
  } catch (error) {
    console.error("Error finding user by username: ", error);
    throw error;
  }
};

/**
 * Hashes the given password using bcrypt.
 * @param {string} password The password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 * @throws {Error} If there is an error while hashing the password.
 */
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
