import Blog from '../models/Blogs.js';

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blogs' });
    }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blog' });
    }
};

// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
};

// Update blog by ID
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const updatedBlog = await blog.update(req.body);
        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating blog', error: error.message });
    }
};

// Delete blog by ID
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        await blog.destroy();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting blog' });
    }
};