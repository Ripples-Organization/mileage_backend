const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "firstName is required!",
    },
    lastName: {
      type: String,
      required: "lastName is required!",
    },
    email: {
      type: String,
      required: "Email is required!",
    },
    password: {
      type: String,
      required: "Password is required!",
    },
    phoneNumber: {
      type: String,
      required: "Phone number is required",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

/*
 firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
*/
