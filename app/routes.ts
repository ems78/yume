import express from 'express';

const controller = require('./controller')
const router = express.Router();

router.get('/', controller.getHome);

export default router;
