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

// Dream Log routes //
/**
 * GET /api/logs
 * returns all logs
 */
router.get("/logs", authenticateToken, getLogs);

/**
 * GET /api/logs/:id
 * returns a log by id
 */
router.get(
  "/logs/:id",
  authenticateToken,
  validateId(),
  handleValidationResult,
  getLogById
);

/**
 * POST /api/logs
 * adds a log
 */
router.post(
  "/logs",
  authenticateToken,
  dreamLogValidationRules(),
  handleValidationResult,
  addLog
);

/**
 * PUT /api/logs/:id
 * edits a log
 */
router.put(
  "/logs/:id",
  authenticateToken,
  validateId(),
  handleValidationResult,
  editLog
);

/**
 * DELETE /api/logs/:id
 * deletes a log
 */
router.delete(
  "/logs/:id",
  authenticateToken,
  validateId(),
  handleValidationResult,
  deleteLog
);

// ------------------------------------------------- //
// Tag routes //
/**
 * GET /api/tags
 * returns all tags
 */
router.get("/tags", authenticateToken, getTags);

/**
 * GET /api/tags/:id
 * returns a tag by id
 */
router.get(
  "/tags/:id",
  authenticateToken,
  validateId(),
  handleValidationResult,
  getTagById
);

/**
 * POST /api/tags
 * adds a tag
 */
router.post("/tags", tagValidationRules(), handleValidationResult, addTag);
router.put(
  "/tags/:id",
  authenticateToken,
  validateId(),
  handleValidationResult,
  editTag
);

/**
 * DELETE /api/tags/:id
 * deletes a tag
 */
router.delete("/tags/:id", validateId(), handleValidationResult, deleteTag);

// ------------------------------------------------- //
// User routes //
/**
 * POST /api/login
 * logs in a user
 */
router.post("/login", loginValidationRules(), handleValidationResult, login);

/**
 * GET /api/account
 * returns user info
 */
router.get("/account", authenticateToken, getUserInfo);

/**
 * POST /api/register
 * registers a user
 */
router.post(
  "/register",
  registrationValidationRules(),
  handleValidationResult,
  registerUser
);

/**
 * PUT /api/account
 * edits user info
 */
router.put(
  "/account",
  editAccountInfoValidationRules(),
  handleValidationResult,
  authenticateToken,
  editAccountInfo
);

export default router;
