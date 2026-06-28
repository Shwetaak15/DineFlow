const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/roleMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Profile Route",
    user: req.user,
  });
});

router.get(
  "/admin",
  protect,
  adminOnly,
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

module.exports = router;