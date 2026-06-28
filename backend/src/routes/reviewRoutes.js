const express = require("express");
const router = express.Router();

const {
  createReview,
  getMyReviews,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Student
router.post("/", authMiddleware, createReview);
router.get("/my", authMiddleware, getMyReviews);

// Admin Only
router.get("/", authMiddleware, adminMiddleware, getReviews);
router.delete("/:id", authMiddleware, adminMiddleware, deleteReview);

module.exports = router;