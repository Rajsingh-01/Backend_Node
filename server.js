const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// console.log(" Server Loaded:");
// console.log("PORT:", process.env.PORT);
// console.log("EMAIL:", process.env.EMAIL);
// console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);
// console.log("RECEIVER_EMAIL:", process.env.RECEIVER_EMAIL);

const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = [
  "http://localhost:3000", // For local testing
  "https://rajsite01.netlify.app", // ✅ Your Netlify domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use("/api", contactRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
