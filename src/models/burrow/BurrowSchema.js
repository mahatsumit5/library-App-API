import mongoose from "mongoose";

const burrowSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  returnedDate: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("Burrow", burrowSchema); //burrows
