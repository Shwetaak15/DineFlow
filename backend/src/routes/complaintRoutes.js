const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  getMyComplaints,
  replyToComplaint,
} = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Student
router.post("/", authMiddleware, createComplaint);
router.get("/my", authMiddleware, getMyComplaints);

// Admin Only
router.get("/", authMiddleware, adminMiddleware, getComplaints);
router.put("/:id/reply", authMiddleware, adminMiddleware, replyToComplaint);

module.exports = router;