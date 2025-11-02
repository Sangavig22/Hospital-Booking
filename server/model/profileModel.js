import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	firstName: { type: String },
	lastName: { type: String },
	fullName: { type: String },
	phone: { type: String },
	address: { type: String },
	bio: { type: String },
	dateOfBirth: { type: String },
	bloodType: { type: String },
	medicalHistory: { type: String },
	updatedAt: { type: Date, default: Date.now }
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
