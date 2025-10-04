import messageModel from "../model/messageModel.js";
const message = async (req, res, next) => {
    console.log(req.body);
    const { fullName, emailAddress, phoneNumber, inquiryType, message } = req.body;


    // Validate input
    if (!fullName || !emailAddress || !phoneNumber || !inquiryType || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Phone number must be all digits (0-9)
    if (!/^[0-9]+$/.test(phoneNumber)) {
        return res.status(400).json({ success: false, message: "Phone number must contain only digits (0-9)." });
    }

    try {
        // Save message
        const newMessage = new messageModel({ fullName, emailAddress, phoneNumber, inquiryType, message });
        await newMessage.save();
        return res.json({ success: true, message: "Message sent successfully." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server error." });
    }
};

export default message;