const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  getStudents,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);
router.get(
  "/students",
  protect,
  adminMiddleware,
  getStudents
);

module.exports = router;