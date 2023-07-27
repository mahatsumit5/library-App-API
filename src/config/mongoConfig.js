import mongoose from "mongoose";

const connectMongoDB = async () => {
  const dbLink =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_CLIENT
      : "mongodb://127.0.0.1:27017/librarySystem";

  try {
    const con = await mongoose.connect(dbLink);
    con && console.log("mongo is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
