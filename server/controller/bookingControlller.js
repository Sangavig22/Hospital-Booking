import bookingModel from '../model/bookingModel.js'; 


export const booking = async (req, res, next) => {
  console.log(req.body);
  const { fullName, age, contactNo, address, doctorId, doctorName, date, time } = req.body;

  // Validate input
  if (!fullName || !age || !contactNo || !address || !doctorId || !doctorName || !date || !time) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    // Save booking
    const newBooking = new bookingModel({ fullName, age, contactNo, address, doctorId, doctorName, date, time });
    await newBooking.save();
    return res.json({ success: true, message: "Booking created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};


export default booking;

