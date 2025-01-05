const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const blogSchema = require("../models/blogSchema");

function formatText(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}
const blogData = async (req, res) => {
  const date = new Date();
  // const [date, time] = new Date().toISOString().split("T");
  console.log(date);
  try {
    const { title, options, content, author_name, about_author } = req.body;
    const words = content.split(" "); // Split the text into words
     const preview_text = words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");
    const images = req.files["images"]; // Array of images
    const author_image = req.files["author_image"] ? req.files["author_image"][0] : null; // Single author image

    // Check if required fields are provided
    if (!title || !options || !content || !author_name || !about_author || !images) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Format title for SEO
    const param = title.toLowerCase().replace(/\s+/g, "-");

    // Prepare the new blog object
    const newBlog = new blogSchema({
      title: title,
      date: date,
      options: options,
      content: content,
      param: param,
      preview_text: preview_text,
      images: images.map((file) => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        destination: file.destination,
        filename: file.filename,
        path: file.path,
        size: file.size,
      })),
      author_name: author_name,
      about_author: about_author,
      author_image: author_image
        ? {
            fieldname: author_image.fieldname,
            originalname: author_image.originalname,
            encoding: author_image.encoding,
            mimetype: author_image.mimetype,
            destination: author_image.destination,
            filename: author_image.filename,
            path: author_image.path,
            size: author_image.size,
          }
        : null,
    });

    await newBlog.save();
    res.status(200).send("Blog submitted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error." });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.IMG_UPLOAD); // Adjust folder path as needed
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).fields([
  { name: "images", maxCount: 5 }, // Multiple images (limit to 5)
  { name: "author_image", maxCount: 1 }, // Single image for author
]);

const fetchData = async (req, res) => {
  try {
    const { option } = req.query;
    let data;
    if(option == "all"){

       data = await blogSchema.find().sort({ createdAt: -1 }).limit(6);
    }
    else{

       data = await blogSchema.find({ options: option }).sort({ createdAt: -1 }).limit(6);
    }
    console.log(data);
    if (data) {
      res.status(200).send(data);
    } else {
      console.log("No data found on this tag");
      res.status(400).send("No data found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};


const openBlog = async(req,res)=>{
  const {title} = req.query;
  console.log("tatooooos:   "+title)
  const blog = await blogSchema.find({title:title});

  if(blog != []){
    console.log("From mongodb ----->" + blog)
    res.status(200).send(blog);
  }else{
    res.status(404).send("No doata Found")
  }
}

const showBlog = async(req,res)=>{
  
  const {id} = req.query;
  const blog = await blogSchema.findById(id);
  console.log("showBlog ---> " + blog)
  if(blog != []){
    console.log("From mongodb ----->" + blog)
    res.status(200).send(blog);
  }else{
    res.status(404).send("No doata Found")
  }
}

const firstSlider = async(req,res)=>{
  try{
    const slides = await blogSchema.find().sort({createdAt:-1}).limit(5);
res.status(200).send(slides);
  }catch(err){
    res.status(400).send(err)
  }
}



const allData = async (req, res) => {
  try {
    const { option } = req.query;
    let data;
    if(option == "all"){

       data = await blogSchema.find().sort({ createdAt: -1 })
    }
    else{

       data = await blogSchema.find({ options: option }).sort({ createdAt: -1 })
    }
    console.log(data);
    if (data) {
      res.status(200).send(data);
    } else {
      console.log("No data found on this tag");
      res.status(400).send("No data found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { blogData, upload, fetchData, openBlog, showBlog, firstSlider , allData
};
