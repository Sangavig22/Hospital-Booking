import Profile from '../model/profileModel.js';

// Save or update profile by email
export const saveProfile = async (req, res, next) => {
	try {
		const { email, firstName, lastName, fullName, phone, address, bio, dateOfBirth, bloodType, medicalHistory } = req.body;
		if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

		const update = { firstName, lastName, fullName, phone, address, bio, dateOfBirth, bloodType, medicalHistory, updatedAt: new Date() };
		const opts = { upsert: true, new: true, setDefaultsOnInsert: true };
		const profile = await Profile.findOneAndUpdate({ email }, update, opts);
		return res.json({ success: true, data: profile, message: 'Profile saved.' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ success: false, message: 'Server error.' });
	}
};

export const getProfile = async (req, res, next) => {
	try {
		const email = req.query.email;
		if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });
		const profile = await Profile.findOne({ email });
		if (!profile) return res.json({ success: true, data: null });
		return res.json({ success: true, data: profile });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ success: false, message: 'Server error.' });
	}
};

export default saveProfile;
