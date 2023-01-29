const Blog = require("../models/blog");
const User = require("../models/user");

const getBlog = async (req, res) => {
  // if id is defined, return a single blog
  if (req.query.id != undefined) {
    try {
      const blog = await Blog.findById(req.query.id);
      return res.status(200).json({ blog });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
  // if page is not defined, set it to 1
  if (req.query.page == undefined) req.query.page = 1;
  // return 10 blogs per page
  try {
    const blogs = await Blog.find()
      .limit(10 * 1)
      .skip((req.query.page - 1) * 10);
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    if (
      req.body.title == undefined ||
      req.body.title == "" ||
      req.body.description == undefined ||
      req.body.description == ""
    )
      throw new Error("Please fill all the fields");
    // if id is valid of the user, create a blog
    const blog = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      author: req.id, // id of the user from the token
    });
    res.status(200).json({ message: "Blog created successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    // if any of the fields are empty, throw an error
    if (
      req.body.title == undefined ||
      req.body.title == "" ||
      req.body.description == undefined ||
      req.body.description == "" ||
      req.query.id == undefined ||
      req.query.id == ""
    )
      throw new Error("Please fill all the fields");

    const blogCheck = await Blog.findById(req.query.id);
    // if id is not valid, throw an error
    if (blogCheck == null) throw new Error("Blog not found");
    // if user is not the author of the blog, throw an error
    if (blogCheck.author != req.id)
      throw new Error("You are not the author of this blog");
    // if id is valid, update the blog
    const blog = await Blog.findByIdAndUpdate(req.query.id, {
      title: req.body.title,
      description: req.body.description,
    });
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    // if id is empty, throw an error
    if (req.query.id === undefined || req.query.id === "")
      throw new Error("Please provide a id");

    const blogCheck = await Blog.findById(req.query.id);
    // if id is not valid, throw an error
    if (blogCheck == null) throw new Error("Blog not found");
    // if user is not the author of the blog, throw an error
    if (blogCheck.author != req.id)
      throw new Error("You are not the author of this blog");
    // if id is valid, delete the blog
    const blog = await Blog.findByIdAndDelete(req.query.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
