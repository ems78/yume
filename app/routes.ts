import express from "express";
import {
  getLogs,
  getLogById,
  addLog,
  editLog,
  deleteLog,
} from "./controllers/dreamLogController";
import {
  getTags,
  getTagById,
  addTag,
  editTag,
  deleteTag,
} from "./controllers/tagController";
import {
  registerUser,
  login,
  getUserInfo,
  editAccountInfo,
} from "./controllers/userController";
import {
  handleValidationResult,
  validateId,
  registrationValidationRules,
  loginValidationRules,
  editAccountInfoValidationRules,
  tagValidationRules,
  dreamLogValidationRules,
} from "./middleware/validate";
import { authenticateToken } from "./middleware/authenticateToken";

const router = express.Router();

router.get("/logs", authenticateToken, getLogs);
router.get(
  "/logs/:id",
  authenticateToken,
  validateId(),
  handleValidationResult,
  getLogById
);
router.post(
  "/logs",
  authenticateToken,
  dreamLogValidationRules(),
  handleValidationResult,
  addLog
);
router.put(
  "/logs/:id",
  authenticateToken,
  validateId(),
  handleValidationResult,
  editLog
);
router.delete(
  "/logs/:id",
  authenticateToken,
  validateId(),
  handleValidationResult,
  deleteLog
);

router.get("/tags", authenticateToken, getTags);
router.get("/tags/:id", validateId(), handleValidationResult, getTagById);
router.post("/tags", tagValidationRules(), handleValidationResult, addTag);
router.put("/tags/:id", validateId(), handleValidationResult, editTag);
router.delete("/tags/:id", validateId(), handleValidationResult, deleteTag);

router.post("/login", loginValidationRules(), handleValidationResult, login);
router.get("/account", authenticateToken, getUserInfo);
router.post(
  "/register",
  registrationValidationRules(),
  handleValidationResult,
  registerUser
);
router.put(
  "/account",
  editAccountInfoValidationRules(),
  handleValidationResult,
  authenticateToken,
  editAccountInfo
);

export default router;
