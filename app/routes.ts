import express from 'express';
import { getLogs } from './controllers/dreamLogController';

const router = express.Router();

// router.get('/', controller.getHome);
router.get('/logs', getLogs);

export default router;
