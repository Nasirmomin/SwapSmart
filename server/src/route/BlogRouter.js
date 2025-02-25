import express from 'express';
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controller/Blogs.js';

const Blogrouter = express.Router();

Blogrouter.get('/', getAllBlogs);
Blogrouter.get('/:id', getBlogById);
Blogrouter.post('/', createBlog);
Blogrouter.put('/:id', updateBlog);
Blogrouter.delete('/:id', deleteBlog);

export default  Blogrouter;