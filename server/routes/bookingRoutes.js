import express from 'express';

import booking, { getBookings, deleteBooking, updateBooking } from '../controller/bookingControlller.js';

const router = express.Router();

router.post('/booking', booking);
router.get('/bookings', getBookings);
router.delete('/booking/:id', deleteBooking);
router.put('/booking/:id', updateBooking);

export default router;