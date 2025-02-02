const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true, // No duplicate usernames
    },
    photo: {
      type: String,
    },
    profileUrl: {
      type: String,
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
