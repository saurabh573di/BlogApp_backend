
// mongodb://localhost:27017 
// mongodb://localhost:27017/user-portal  

import mongoose from "mongoose";
// improt the evn var from inde x.js
import { MONGODB_URL } from "./index.js";

const connectDB = async function () {
  console.log("MONGODB_URL: ", MONGODB_URL);
  let client = await mongoose.connect(MONGODB_URL);
  console.log("database connected to: ", client.connection.host);
  // await mongoose.connect(process.env.MONGODB_URL);
  //   await mongoose.connect("mongodb://127.0.0.1:27017/user-portal");
  //   await mongoose.connect("mongodb://username:password/user-portal");
  console.log("Database connected");
};

export default connectDB;