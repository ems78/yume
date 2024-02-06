import express from 'express';
import { getLogs, addLog } from './controllers/dreamLogController';

const router = express.Router();

router.get('/logs', getLogs);
router.post('/logs', addLog);

export default router;
