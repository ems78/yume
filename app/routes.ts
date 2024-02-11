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
router.get("/logs/:id", validateId(), handleValidationResult, getLogById);
router.post("/logs", dreamLogValidationRules(), handleValidationResult, addLog);
router.put("/logs/:id", validateId(), handleValidationResult, editLog);
router.delete("/logs/:id", validateId(), handleValidationResult, deleteLog);

router.get("/tags", getTags);
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
