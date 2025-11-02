import mongoose from 'mongoose';

const bookingSchema=new mongoose.Schema({
  // Link booking to user by email so we can fetch a user's bookings later
  email: { type: String, required: false },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
   date: { type: String, required: true },   
   time: { type: String, required: true },   
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },

})

const bookingModel = mongoose.model('Booking', bookingSchema);
export default bookingModel;
