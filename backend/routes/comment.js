
const express = require('express');

const commentController = require('../controllers/comment');

const router = express.Router();

router.post('/:blogId', commentController.createComment);
router.get('/:blogId',commentController.fetchComments);
router.delete('/:id',commentController.deleteComment);


module.exports=router;