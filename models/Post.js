const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create model
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("notes", postSchema);
