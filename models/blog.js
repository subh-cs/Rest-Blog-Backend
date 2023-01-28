const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blogs", blogSchema);
