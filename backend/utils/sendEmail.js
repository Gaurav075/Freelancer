import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // Your email from .env
    pass: process.env.EMAIL_PASS,   // App password from .env
  },
});

// ✅ Send Email Utility Function
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;
