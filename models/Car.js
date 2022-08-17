const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    car_name: {
      type: String,
      required: "car name is required!",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("carSchema", carSchema);
