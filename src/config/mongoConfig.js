import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_CLIENT);
    con && console.log("mongo is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
