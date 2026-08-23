import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000
    },

    status: {
      type: String,
      enum: [
        "pending",
        "in-progress",
        "completed"
      ],
      default: "pending"
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high"
      ],
      default: "medium"
    },

    dueDate: {
      type: Date
    },

    attachment: {
      fileName: {
        type: String
      },

      fileUrl: {
        type: String
      },

      fileType: {
        type: String
      },

      fileSize: {
        type: Number
      }
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model(
  "Task",
  taskSchema
);

export default Task;