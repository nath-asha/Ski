const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    // Define blog schema
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
