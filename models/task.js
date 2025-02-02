const mongoose = require("mongoose");
const { Decimal128 } = require("mongodb");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    project: {
      type: String,
      default: "",
    },
    percentComplete: {
      type: Decimal128,
      default: 0.05,
    },
    status: {
      type: String,
      enum: ["to-do", "in-progress", "completed"],
      default: "to-do",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
    // assignedTo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // References the "User" model
    // },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

module.exports = {
  schema: taskSchema,
  model: mongoose.model("Task", taskSchema),
};
