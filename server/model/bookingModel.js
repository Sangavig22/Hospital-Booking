import mongoose from 'mongoose';

const bookingSchema=new mongoose.Schema({
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
