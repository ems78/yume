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

const router = express.Router();

router.get("/logs", getLogs);
router.get("/logs/:id", getLogById);
router.post("/logs", addLog);
router.put("/logs/:id", editLog);
router.delete("/logs/:id", deleteLog);

router.get("/tags", getTags);
router.get("/tags/:id", getTagById);
router.post("/tags", addTag);
router.put("/tags/:id", editTag);
router.delete("/tags/:id", deleteTag);

export default router;
