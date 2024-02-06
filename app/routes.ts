import express from 'express';
import { getLogs, getLogById, addLog, editLog, deleteLog } from './controllers/dreamLogController';

const router = express.Router();

router.get('/logs', getLogs);
router.get('/logs/:id', getLogById);
router.post('/logs', addLog);
router.put('/logs/:id', editLog);
router.delete('/logs/:id', deleteLog);

export default router;
