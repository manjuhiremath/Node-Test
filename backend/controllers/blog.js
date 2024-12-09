const Blog = require('../models/blog');


exports.createBlog = async (req, res) => {
    try {
        const { title, author, content } = req.body;
        if (!title || !author || !content) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        await Blog.create({ title, author, content  });
        const Blogs = await Blog.findAll();
        res.send(Blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

exports.fetchBlogs = async (req, res) => {
    try {
        const Blogs = await Blog.findAll();
        res.send(Blogs); 
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

// exports.fetchOne = async(req,res)=>{
//   try{
//     const id = req.params.id;
//     const Blog = await Blog.findByPk(id);
//     res.send(Blog);
//   }catch(err){
//     console.log(err)
//   }
// }

// exports.deleteBlog = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const Blog = await Blog.findByPk(id);
//         if (!Blog) {
//             return res.status(404).json({ success: false, message: "Blog not found" });
//         }
//         await Blog.destroy();
//         const Blogs = await Blog.findAll();
//         res.send(Blogs);
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete Blog",
//             error: err.message,
//         });
//     }
// };

// exports.updateBlog = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const {title, author, content  } = req.body;
//         const Blog = await Blog.findByPk(id);
//         if (!Blog) {
//             return res.status(404).json({ success: false, message: "Blog not found" });
//         }
//         await Blog.update({ title, author, content  });

//         const Blogs = await Blog.findAll();
//         res.send(Blogs);
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to update Blog",
//             error: err.message,
//         });
//     }
// };
