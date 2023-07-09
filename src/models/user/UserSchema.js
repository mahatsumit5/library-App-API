import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    default: "Student",
  },
  fName: {
    type: String,
    required: true,
  },

  lName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    index: 1,
  },

  password: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    default: "",
  },
  profile: {
    type: String,
    required: false,
    default: "",
  },
});

export default mongoose.model("User", userSchema); //Users
