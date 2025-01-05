const express= require("express");
const { blogData, upload, fetchData, openBlog, showBlog, firstSlider, allData } = require("../controllers/blogController");
const router = express.Router();
const multer = require("multer")

router.post("/save-data", upload, blogData);
router.route("/fetch-data").get(fetchData)
router.route("/blog").get(openBlog)
router.route("/show-blog").get(showBlog)
router.route("/").get(firstSlider);
router.route("/all-data").get(allData);
module.exports = router;