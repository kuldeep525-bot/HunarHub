import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log("DB NOT CONNECTED", error);
    process.exit(1);
  }
};

export default connectDb;
