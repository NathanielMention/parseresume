const express = require("express");
const Resume = require("../model/resumeModel");
const pdfParse = require("pdf-parse");
const router = express.Router();

//end point for search
router.get("/search", (req, res) => {
  let data = [];

  // Retrieve PDF from MongoDB
  Resume.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.error(err));
});

//end point for upload data
router.post("/extract-text", (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    res.status(400);
    res.end;
  }
  //parse data from front end
  pdfParse(req.files.pdfFile).then((result) => {
    //new instance of resume to save to db
    const resume = new Resume({
      text: {
        type: result.text,
        required: false,
      },
    });
    resume.save();
    res.send("resume uploaded");
  });
});

module.exports = router;
