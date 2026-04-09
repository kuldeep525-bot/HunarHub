import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    skills: [
      {
        type: String,
        enum: [
          "electrician",
          "plumber",
          "carpenter",
          "painter",
          "mechanic",
          "cleaner",
        ],
      },
    ],
    area: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 50,
    },
    ratePerDay: {
      type: Number,
      required: true,
      default: 500,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0, //  0 se kam nahi
      max: 5, //  5 se zyada nahi
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500, //  bio limit
    },
  },
  { timestamps: true },
);

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;
