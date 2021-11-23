const express = require('express');

const apiRouter = express.Router();

const apiController = require("../controllers/apiController");

apiRouter.get('/posts',apiController.get_posts);

apiRouter.get('/posts/:id', apiController.get_post_details);

apiRouter.post('/posts/:id',apiController.post_comment);

module.exports=apiRouter;

