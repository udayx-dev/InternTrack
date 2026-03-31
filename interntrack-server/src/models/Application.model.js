const mongoose = require("mongoose");

const STATUS_ENUM = ["Applied", "OA", "Interview", "Offer", "Rejected"];

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // every query filters by userId
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name too long"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
      maxlength: [100, "Role name too long"],
    },
    status: {
      type: String,
      enum: {
        values: STATUS_ENUM,
        message: "{VALUE} is not a valid status",
      },
      default: "Applied",
      index: true,
    },
    deadline: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, "Notes cannot exceed 2000 characters"],
      default: "",
    },
    hrName: {
      type: String,
      trim: true,
      maxlength: [100, "HR name too long"],
      default: "",
    },
    hrEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    jobLink: {
      type: String,
      trim: true,
      default: "",
    },
    tags: {
      type: [{ type: String, trim: true, lowercase: true }],
      default: [],
    },
    salary: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

// Compound index: all queries are scoped to a user
applicationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Application", applicationSchema);
