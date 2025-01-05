// const mongoose = require("mongoose");

// const BlogSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true, // Ensure the title is mandatory
//   },
//   param: {
//     type: String,
//     required: true, // Ensure the title is mandatory
//   },
//   options: {
//     type: String,
//     enum: ["all", "regional", "domestic", "international"], // Limit options to predefined values
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   image: {
//     fieldname: { type: String, required: true },
//     originalname: { type: String, required: true },
//     encoding: { type: String, required: true },
//     mimetype: { type: String, required: true },
//     destination: { type: String, required: true },
//     filename: { type: String, required: true },
//     path: { type: String, required: true },
//     size: { type: Number, required: true },
//   },
// });

// const Blog = mongoose.model("blogs", BlogSchema);

// module.exports = Blog;


const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  fieldname: { type: String },
  originalname: { type: String },
  encoding: { type: String },
  mimetype: { type: String },
  destination: { type: String },
  filename: { type: String },
  path: { type: String },
  size: { type: Number },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  preview_text: { type: String, required: true },
  param: { type: String, required: true },
  options: { type: String, required: true },
  content: { type: String, required: true },
  author_name: { type: String, required: true },
  about_author: { type: String, required: true },
  author_image: { type: imageSchema, required: true },
  images: { type: [imageSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
