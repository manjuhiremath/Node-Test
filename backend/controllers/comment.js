
const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
    try {
        const { comment,blogId } = req.body;
        if (!comment || !blogId) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        await Comment.create({ comment,blogId   });
        const Blogs = await Comment.findAll();
        res.send(Blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

  exports.fetchComments = async (req, res) => {
    try {
        const { blogId } = req.params;  // Get blogId from URL parameters

        // Fetch comments associated with the specific blogId
        const comments = await Comment.findAll({
            where: {
                blogId: blogId  // Find comments where blogId matches
            }
        });

        // If no comments are found, send a message
        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this blog.' });
        }

        // Send the fetched comments in the response
        res.status(200).send(comments);
    } catch (err) {
        // Send error response if something goes wrong
        res.status(500).json({ error: err.message });
    }
};
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        await comment.destroy();
        const Comments = await Comment.findAll();
        res.send(Comments);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete Comment",
            error: err.message,
        });
    }
};