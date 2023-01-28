const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");
const resumeRoutes = require("./routes/resumeRoutes");
const fs = require("fs");
const path = require("path");
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
//set up path for ejs template
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", express.static("public"));
app.use(fileUpload());
app.use(resumeRoutes);

/*const pdfSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
});
const PDF = mongoose.model("PDF", pdfSchema);

//end point for upload data
app.post("/extract-text", (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    res.status(400);
    res.end;
  }
  const pdf = new PDF({
    data: fs.readFileSync("path/to/document.pdf"),
  });
  pdf
    .save()
    .then((pdf) => console.log(pdf))
    .catch((err) => console.error(err));

  // Retrieve PDF from MongoDB
  PDF.findById("<id>")
    .then((pdf) => {
      const data = pdf.data;
      fs.writeFileSync("path/to/document.pdf", data);
    })
    .catch((err) => console.error(err));
  //parse data from front end
  pdfParse(req.files.pdfFile).then((result) => {
    res.send(result.text);
  });
});
*/
app.listen(3000, console.log("app listening on 3000"));

/*// Store PDF in MongoDB
const pdfSchema = new mongoose.Schema({
    data: {
      type: Buffer,
      required: true,
    },
  });
  const PDF = mongoose.model("PDF", pdfSchema);
  
  const pdf = new PDF({
    data: fs.readFileSync("path/to/document.pdf"),
  });
  pdf
    .save()
    .then((pdf) => console.log(pdf))
    .catch((err) => console.error(err));
  
  // Retrieve PDF from MongoDB
  PDF.findById("<id>")
    .then((pdf) => {
      const data = pdf.data;
      fs.writeFileSync("path/to/document.pdf", data);
    })
    .catch((err) => console.error(err));
  */
