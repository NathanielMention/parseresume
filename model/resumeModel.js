const mongoose = require("mongoose");
const schema = mongoose.Schema;

//db schema
const resumeSchema = new schema({
  title: {
    type: String,
    required: false,
  },
  textContent: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create model
const Resume = mongoose.model("resume", resumeSchema);

module.exports = Resume;
