import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: false,
  },

  review: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: false,
  },
  reviewDate: {
    type: String,
    default: null,
    required: false,
  },
});

export default mongoose.model("Review", reviewSchema); //Users
