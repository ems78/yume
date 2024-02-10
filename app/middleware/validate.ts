import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { ObjectId } from "mongodb";

export const handleValidationResult = (
  req: Request,
  res: Response,
  next: Function
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateId = () => {
  return [
    param("id").custom((value) => {
      if (!ObjectId.isValid(value)) {
        throw new Error("Invalid ID format");
      }
      return true;
    }),
  ];
};

export const registrationValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is required"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("username")
      .isLength({ max: 20 })
      .withMessage("Username must be at most 20 characters long"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("password")
      .isLength({ max: 20 })
      .withMessage("Password must be at most 20 characters long"),
  ];
};

export const loginValidationRules = () => {
  return [
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export const editAccountInfoValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is required"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("username")
      .isLength({ max: 20 })
      .withMessage("Username must be at most 20 characters long"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email format"),
  ];
};

export const tagValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("name")
      .isLength({ max: 20 })
      .withMessage("Name must be at most 22 characters long"),
  ];
};

export const dreamLogValidationRules = () => {
  return [
    body("title").notEmpty().withMessage("Title is required"),
    body("title")
      .isLength({ max: 50 })
      .withMessage("Title must be at most 50 characters long"),
    body("description").notEmpty().withMessage("Description is required"),
    body("description")
      .isLength({ max: 2700 })
      .withMessage("Description must be at most 2700 characters long"),
    body("tags").isArray().withMessage("Tags must be an array"),
    body("tags.*").custom((value) => {
      if (!ObjectId.isValid(value)) {
        throw new Error("Invalid tag ID format");
      }
      return true;
    }),
    body("date").notEmpty().withMessage("Date is required"),
    body("date").isISO8601().withMessage("Invalid date format"),
    body("userId").notEmpty().withMessage("User ID is required"),
  ];
};
