const express = require("express");
const router = express.Router();
// const contactController = require("../controller/contactController"); // Ensure this path is correct
const contactController =require("../controller/contactControllers")
router.post("/contact", contactController.sendMessage);

module.exports = router;
