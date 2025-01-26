const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true, // No duplicate usernames
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // No duplicate email addresses
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["user"], // Could also be ['user', 'admin']
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

module.exports = mongoose.model("User", userSchema);
