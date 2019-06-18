const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');


const routes = express.Router();
const upload = multer(uploadConfig);

// Post
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image') ,PostController.store);

//Like
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes