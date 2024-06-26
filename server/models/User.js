const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  },
  role: { type: String, default: "user" },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
