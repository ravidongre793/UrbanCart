import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";
import { sendOtpEmail } from "../emailVerify/sendOtpMail.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        await verifyEmail(token, email);
        newUser.token = token;
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully. Please verify your email.",
            token
        });

    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null
        const token = tokenFromHeader || req.query.token || req.body.token

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Verification token not provided"
            })
        }

        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(400).json({
                    success: false,
                    message: "The registration token has expired"
                })
            }
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            })
        }


        const user = await User.findById(decoded.id);  // ✅ FIX 5: Moved out of catch block
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email already verified"
            });
        }

        user.token = null;
        user.isVerified = true;   // ✅ FIX 6: was "use.isVerified" (typo)
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const reVerify = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // if (user.isVerified) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Email already verified"
        //     });
        // }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        await verifyEmail(token, email);
        user.token = token;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Verification email sent successfully",
            token: user.token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        if (!existingUser.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify your account before logging in"
            });
        }
        // generate token
        const accessToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '10d' });
        const refreshToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        existingUser.isLoggedIn = true;
        await existingUser.save();
        

        // Check for existing session and delete it
        const existingSession = await Session.findOne({ userId: existingUser._id });
        if (existingSession) {
            await Session.deleteOne({ userId: existingUser._id });
        }
        

        // Create new session
        await Session.create({ userId: existingUser._id });
        return res.status(200).json({
            success: true,
            message: `Login successful ${existingUser.firstName}`,
            userName: existingUser.firstName,
            role: existingUser.role,
            accessToken,
            refreshToken
        });

    }catch(error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const logout = async (req, res) => {
    try{
        const userId = req.user._id;
        await Session.deleteMany({ userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false });
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        // Send OTP to user's email
        await sendOtpEmail(otp, email);
        return res.status(200).json({
            success: true,
            message: "OTP sent to email successfully"
        });
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const email = req.params.email;
        if(!otp) {
            return res.status(400).json({
                success: false,
                message: "OTP is required"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        if (user.otp !== otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP is not generated or already verified"
            });
        }
        if(user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });
        }
        if(otp != user.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        }); 
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
};

export const changePassword = async (req, res) => {
    try {
        const {newPassword,confirmPassword} = req.body;
        const {email} = req.params;
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    }catch (error){
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
};

export const allUser = async (_, res) => {
    try {
        const user = await User.find();
        return res.status(200).json({
            success: true,
            users: user
        }); 
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
};

export const getUserById = async (req, res) => {
    try {
        const {userId} = req.params.id;
        const user = await User.findById(userId).select("-password -otp -otpExpiry -token");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    }catch (error) { 
        return res.statsus(500).json({
            success: false,
            message: "server error"
        });
    }
};

 
