const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    purpose: { type: String, required: true },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", TripSchema);
