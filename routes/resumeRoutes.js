const express = require("express");
const Resume = require("../model/resumeModel");
const pdfparse = require("pdf-parse");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("resume.ejs");
});

module.exports = router;
