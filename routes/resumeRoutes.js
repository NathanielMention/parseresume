const express = require("express");
const Resume = require("../model/resumeModel");
const pdfParse = require("pdf-parse");
const router = express.Router();

//end point for search
router.get("/"),
  (req, res) => {
    // Retrieve PDF from MongoDB
    const data = req.data;
    Resume.find()
      .then((result) => {
        console.log(result);
        res.send(result.text);
      })
      .catch((err) => console.error(err));
  };

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
