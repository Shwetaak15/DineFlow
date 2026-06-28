const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Review = require("../models/Review");
const Menu = require("../models/Menu");

const getDashboardStats = async (req, res) => {
  try {
    const students = await User.countDocuments({
      role: "student",
    });

    const complaints = await Complaint.countDocuments();

    const reviews = await Review.countDocuments();

    const meals = await Menu.countDocuments();

    res.status(200).json({
      students,
      complaints,
      reviews,
      meals,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};