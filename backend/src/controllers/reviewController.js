const Review = require("../models/Review");

// Student creates review
const createReview = async (req, res) => {
  try {
    const { day, rating, comment } = req.body;

    if (!day || !rating) {
      return res.status(400).json({
        message: "Day and Rating are required",
      });
    }

    const review = await Review.create({
      student: req.user.id,
      day,
      rating: Number(rating),
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// Student gets own reviews
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Admin gets all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Admin deletes review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.json({
      message: "Review deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createReview,
  getMyReviews,
  getReviews,
  deleteReview,
};