import nodemailer from "nodemailer";
import 'dotenv/config';

export const sendOtpEmail = async (otp, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailConfigurations = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            html: `<p>Hi! There, Your Password reset otp is ${otp}</p>`
        };

        const info = await transporter.sendMail(mailConfigurations);
        console.log('otp Sent Successfully', info);
    } catch (error) {
        console.error('otp failed to send:', error);
    }
};
