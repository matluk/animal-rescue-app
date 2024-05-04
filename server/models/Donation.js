const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: String,
  value: { type: Number, required: true },
  category: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
