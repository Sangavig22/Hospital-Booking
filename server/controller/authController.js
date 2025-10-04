import RegisterModel from "../model/registerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const register = async (req, res, next) => {
    console.log(req.body);
    const { fullName, email, password, confirmPassword } = req.body;

    // Validate input
    if (!fullName || !email || !password || !confirmPassword) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    try {
        // Check if user already exists
        const existingUser = await RegisterModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered." });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Save user
        const user = new RegisterModel({ fullName, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({ success: true, message: "User registered successfully" }); 

    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Server error." });
    }
};

// Login controller
 const login = async (req, res, next) => {
    
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
        // Find user
        const user = await RegisterModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'? 'none':'strict',
            maxAge:7*24*60*60*1000
        });


        return res.json({ success: true, message: "User logged in successfully" });
    } catch (err) {
        return res.json({ success: false, message: "Server error." });
    }
};
 const logout = async(req, res) => {
   try{

    res.clearCookie('token',{
           httpOnly:true,
           secure:process.env.NODE_ENV==='production',
           sameSite:process.env.NODE_ENV==='production'? 'none':'strict',
       });
       return res.json({ success: true, message: "User logged out successfully" });
   } catch (err) {
       return res.json({ success: false, message: "Server error." });
   }

};

export {
  register,
  login,
  logout
};
