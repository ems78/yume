import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = tokenHeader.split(" ")[1];

  try {
    const secretKey: string = process.env.JWT_SECRET || "SECRET_KEY";
    const payload = jwt.verify(token, secretKey) as TokenPayload;
    (req as any).user = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }

    console.error("Error authenticating token: ", error);
    return res.status(500).json({ message: "Error authenticating token" });
  }
};
