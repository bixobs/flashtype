const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  wpm: Number,
  accuracy: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Result", resultSchema);
