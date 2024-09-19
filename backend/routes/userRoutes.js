const express = require("express");
const router = express.Router();
const { uploadUsers, getUsers } = require("../controllers/userController");
const upload = require("../middlewares/uploadMiddleware");

// User routes

// Upload users via CSV
router.post("/upload", upload.single("file"), uploadUsers);

// Fetch all users
router.get("/", getUsers);

module.exports = router;
