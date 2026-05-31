const express = require("express");

const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * Public Routes
 */
router.get("/", getBlogs);
router.get("/:id", getBlog);

/**
 * Protected Routes
 */
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;