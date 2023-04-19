// Controller
import Blogs from "../models/blog";

//GET Blogs
export async function getBlogs(req, res) {
  try {
    const blogs = await Blogs.find({});
    if (!blogs) {
      res.status(404).json({ error: "Data not Found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ error: "Error while fetching Data",error });
  }
}
//GET SINGLE USER
export async function getBlog(req, res) {
  try {
    const { blogId } = req.query;
    const blog = await Blogs.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "blog not Found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ error: "Error while fetching Data" });
  }
}

//POST - CREATE USER
export async function createBlog(req, res) {
  try {
    const formData = req.body;
    if (!formData) {
      return res.json(404).json({ error: "Form DATa not provided.." });
    }

    const blog = await Blogs.create(formData);
    return res.status(200).json({ blog });
  } catch (error) {
    res.status(404).json({ error });
  }
}

//PUT -update user
export async function updateUser(req, res) {
  try {
    const { blogId } = req.query;
    const formData = req.body;
    if (blogId && formData) {
      const blog = await Blogs.findByIdAndUpdate(blogId, formData);
      return res.status(200).json({ status: "success", blog });
    }
    return res.status(404).json({ error: "blog not selected" });
  } catch (error) {
    res.status(404).json({ error });
  }
}
// -DELETe user
export async function deleteUser(req, res) {
  try {
    const { blogId } = req.query;
    if (!blogId) {
      return res.status(404).json({ error: "user not found" });
    }
    await Blogs.findByIdAndDelete(blogId);
    return res.status(200).json({
      status: "success",
      message: "successfully deleted",
      deleted: blogId,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
}
