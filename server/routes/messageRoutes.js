import express from 'express';
import message from '../controller/messageController.js';

const router = express.Router();

router.post('/message', message);

export default router;