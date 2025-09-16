const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
    console.log(req.body)
    const comment = new Comment({
        content: req.body.content,
        blog: req.params.blogId,
        author: req.user.id
    });

    await comment.save();
    res.json(comment)
}

exports.getComments = async (res, req) => {
    const comments = await Comment.find({ blog: req.params.blogId }).populate("author", "username");
    res.json(comments)
}