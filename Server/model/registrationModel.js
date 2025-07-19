const mongoose = require("mongoose");

const regiSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number },
  Isadmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("Registration", regiSchema);
