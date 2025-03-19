require("dotenv").config();
const transporter = require("../config/nodemailer");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Debugging logs
    console.log("📩 Checking Receiver Email:", process.env.RECEIVER_EMAIL);
    console.log("📨 Received Message From:", email);

    if (!process.env.RECEIVER_EMAIL) {
      console.error("🚨 Error: Recipient email is not configured.");
      return res.status(500).json({ error: "Recipient email not configured." });
    }

    if (!name || !email || !subject || !message) {
      console.error("🚨 Error: Missing required fields.");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Email message options
    const mailOptions = {
      from: process.env.EMAIL, // Use your configured email
      to: process.env.RECEIVER_EMAIL, // Your email
      subject: `New Contact Message: ${subject}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    console.log("📤 Sending Email:", mailOptions);

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent Successfully!");
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("🚨 Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error. Try again later!" });
  }
};
