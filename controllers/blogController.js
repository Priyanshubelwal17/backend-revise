const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            image: req.file ? req.file.filename : null,
            author: req.user.id
        });
        console.log(req.user);

        await blog.save();
        res.json(blog)
    } catch (err) {
        res.status(400).json({ message: "Error creating blog", error: err })
    }
}

exports.getAllBlogs = async (req, res) => {

    const blogs = await Blog.find().populate("author", "username email");
    res.json(blogs)
}

exports.getBlogById = async (req, res) => {
    console.log(req.params.id);
    const blog = await Blog.findById(req.params.id).populate("author", "username");
    console.log(blog);
    if (!blog) return res.status(404).json({ message: "Blog not found" })
    res.json(blog)
}

exports.updateBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) res.status(404).json({ message: "Blog not found" })
    if (blog.author.toString() !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized" })
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    if (req.file) blog.image = req.file.filename;

    await blog.save()
    res.json(blog)
}

exports.deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" })
    if (blog.author.toString() !== req.user.userId) {
        return res.status(403).json({ message: "UnAuthorized" })
    }

    await blog.remove();
    res.json({ message: "Blog deleted successfully" })
}

exports.toggleLike = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    console.log(blog);
    if (!blog) return res.status(404).json({ message: "Blog not found" })
    console.log(req.user);
    const userId = req.user.id;
    if (blog.likes.includes(userId)) {
        blog.likes = blog.likes.filter(id => id.toString() !== userId);

    } else {
        blog.likes.push(userId)
    }
    await blog.save()
    res.json(blog)
} 