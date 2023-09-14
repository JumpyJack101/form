const mongoose = require("mongoose");
const Schema = mongoose.Schema

const pushSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    register: {
      type: String,
      required: true
    }
  }, {timestamps: true});
  
  
  const pushed = mongoose.model("pushed", pushSchema);
  module.exports = pushed;
  