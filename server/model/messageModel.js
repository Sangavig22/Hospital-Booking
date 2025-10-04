import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber:{type:Number ,required:true},
    inquiryType:{type:String,required:true},
    message: { type: String, required: true }
   
});

const messageModel = mongoose.model('message', messageSchema);

export default messageModel;