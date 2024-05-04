const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  type: { type: String, required: true },
  isChipped: Boolean,
  age: { type: Number, required: true },
  description: String,
  lastExaminatedAt: Number,
  isAdopted: Boolean,
  adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
