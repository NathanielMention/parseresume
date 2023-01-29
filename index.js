const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const resumeRoutes = require("./routes/resumeRoutes");
const dotenv = require("dotenv");
dotenv.config();

const uri = `mongodb+srv://nathanielmention:${process.env.MONGODB_PASSWORD}@resumeparser.7g6dzmq.mongodb.net/?retryWrites=true&w=majority`;
//connect to db
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to mongodb");
    }
  }
);

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("public"));
app.use(fileUpload());
app.use(resumeRoutes);

app.listen(3000, console.log("app listening on 3000"));
