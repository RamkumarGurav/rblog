import mongoose from "mongoose";

const mongodb_compass="mongodb+srv://raamthecoder:1js15ec071@cluster0.vemvalq.mongodb.net/test"

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb+srv://raamthecoder:1js15ec071@cluster0.vemvalq.mongodb.net/rblog?retryWrites=true&w=majority"
    );

    if (connection.readyState == 1) {
      console.log("Database Connected");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
