const mongoose = require("mongoose");
const schema = mongoose.Schema;

//db schema
const resumeSchema = new schema({
  title: {
    type: String,
  },
  textContent: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create model
const Resume = mongoose.model("book", resumeSchema);

module.exports = Resume;
