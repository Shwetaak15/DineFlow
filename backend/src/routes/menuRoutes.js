const express = require("express");
const router = express.Router();

const {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Student + Admin
router.get("/", authMiddleware, getMenus);

// Admin Only
router.post("/", authMiddleware, adminMiddleware, createMenu);
router.put("/:id", authMiddleware, adminMiddleware, updateMenu);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMenu);

module.exports = router;