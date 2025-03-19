const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// console.log("✅ Server Loaded:");
// console.log("PORT:", process.env.PORT);
// console.log("EMAIL:", process.env.EMAIL);
// console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);
// console.log("RECEIVER_EMAIL:", process.env.RECEIVER_EMAIL);

const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Allow CORS from frontend running on localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",  // This allows your frontend at port 3000 to communicate with the backend at port 3001
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allow methods your API will accept
  allowedHeaders: ["Content-Type", "Authorization"],  // Allow specific headers if needed
};

// Middleware
app.use(cors(corsOptions));  // Apply CORS with custom options
app.use(bodyParser.json());

// Routes
app.use("/api", contactRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;  // Ensure your backend runs on port 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
