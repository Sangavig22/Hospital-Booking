import express from 'express';

import booking from '../controller/bookingControlller.js';

const router = express.Router();

router.post('/booking', booking);

export default router;