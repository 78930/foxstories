// routes/blogRoutes.js
import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// GET /api/blogs  -> list all blogs
router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

// GET /api/blogs/:id  -> get single blog
router.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

// POST /api/blogs  -> create blog
router.post('/', async (req, res, next) => {
  try {
    const { title, body, author } = req.body;
    const blog = await Blog.create({ title, body, author });
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
});

// PUT /api/blogs/:id  -> update blog
router.put('/:id', async (req, res, next) => {
  try {
    const { title, body, author } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, body, author },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/blogs/:id  -> delete blog
router.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
