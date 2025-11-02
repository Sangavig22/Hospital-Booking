import bookingModel from '../model/bookingModel.js';
import mongoose from 'mongoose';


export const booking = async (req, res, next) => {
  console.log(req.body);
  const { fullName, age, contactNo, address, doctorId, doctorName, date, time, email } = req.body;

  // Validate input
  if (!fullName || !age || !contactNo || !address || !doctorId || !doctorName || !date || !time) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    // Save booking (include email if provided)
    const newBooking = new bookingModel({ email, fullName, age, contactNo, address, doctorId, doctorName, date, time });
    await newBooking.save();
    return res.json({ success: true, message: "Booking created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const userEmail = req.query.userEmail;
    const filter = {};
    if (userEmail) filter.email = userEmail;
    const bookings = await bookingModel.find(filter).sort({ date: -1 });
    return res.json({ success: true, data: bookings });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log('DELETE booking id:', id);
    if (!id) return res.status(400).json({ success: false, message: 'Booking id required.' });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid booking id.' });
    }
    const deleted = await bookingModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Booking not found.' });
    return res.json({ success: true, message: 'Booking deleted successfully.' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log('UPDATE booking id:', id, 'body:', req.body);
    if (!id) return res.status(400).json({ success: false, message: 'Booking id required.' });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid booking id.' });
    }

    // Only allow certain fields to be updated for rescheduling
    const { date, time, doctorId, doctorName } = req.body;
    const update = {};
    if (date) update.date = date;
    if (time) update.time = time;
    if (doctorId) update.doctorId = doctorId;
    if (doctorName) update.doctorName = doctorName;

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields to update.' });
    }

    const updated = await bookingModel.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Booking not found.' });
    return res.json({ success: true, data: updated, message: 'Booking updated successfully.' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};


export default booking;

