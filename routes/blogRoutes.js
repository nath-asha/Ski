const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');


router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific blog
router.get('/:id', getBlog, (req, res) => {
    res.json(res.blog);
});

// Create a new blog
router.post('/', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        // Any other fields you want to include
    });

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a blog
router.patch('/:id', getBlog, async (req, res) => {
    if (req.body.title != null) {
        res.blog.title = req.body.title;
    }
    if (req.body.content != null) {
        res.blog.content = req.body.content;
    }
    // Continue updating other fields as needed

    try {
        const updatedBlog = await res.blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a blog
router.delete('/:id', getBlog, async (req, res) => {
    try {
        await res.blog.remove();
        res.json({ message: 'Deleted blog' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getBlog(req, res, next) {
    let blog;
    try {
        blog = await Blog.findById(req.params.id);
        if (blog == null) {
            return res.status(404).json({ message: 'Cannot find blog' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.blog = blog;
    next();
}

module.exports = router;
