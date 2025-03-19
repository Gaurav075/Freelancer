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

/**
 * ✅ Send Email Utility Function
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML email body
 */
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"Freelancer Hub" <${process.env.EMAIL_USER}>`, // Sender name
      to,
      subject,
      text: "Please enable HTML to view this email.", // Plain text fallback
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Failed to send email. Please try again later.");
  }
};

export default sendEmail;
