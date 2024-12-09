const path = require('path');

const express = require('express');

const blogController = require('../controllers/blog');

const router = express.Router();

router.post('/', blogController.createBlog);
router.get('/',blogController.fetchBlogs);


module.exports= router;