const express = require("express");
const Resume = require("../model/resumeModel");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Config for multer
// const upload = multer({ dest: "public/files "})
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//filter files to only allow pdf uploads
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "pdf" ||
    file.mimetype.split("/")[1] === "docx"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Not a document File"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//end point for upload data
router.post("/extract-text", (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    res.status(400);
    res.end;
  }
  //parse data from front end
  pdfParse(req.files.pdfFile).then((result) => {
    res.send(result.text);
  });
});

// router.post("/resume", upload.single("file"), async (req, res) => {
//   console.log(req.files);
//   pdfparse(req.files.file.data).then((data) => {
//     console.log(data);
//     //create instance of model
//     const resume = new Resume({
//       title: req.files.file.name,
//       textContent: data.text,
//     });
//     //save our model to database
//     resume
//       .save()
//       .then((cho) => {
//         console.log(cho);
//         res.status(200).json({
//           message: "resume uploaded successfully",
//           uploadedResume: {
//             name: cho.title,
//             text: cho.textContent,
//             _id: cho._id,
//           },
//         });
//       })
//       .catch((e) => {
//         // console.log(e)
//         res.status(500).json({
//           error: e,
//         });
//       });
//   });
// });

module.exports = router;
