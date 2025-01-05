const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require("mongoose");
dotenv.config({path:"./config.env"});
const loginRoute = require("./routes/loginRoutes")
const blogRoute = require("./routes/blogRoute")


const port = process.env.PORT;
const mongodbUrl = process.env.MONGODB_URL;

app.use(express.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors());
app.use("/" , loginRoute)
app.use("/" , blogRoute)



const mongoConnect = async()=>{
   await mongoose.connect(mongodbUrl);
   console.log("Mongodb is connected")
}
mongoConnect();



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
