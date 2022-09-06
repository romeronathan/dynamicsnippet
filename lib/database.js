import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import nextConnect from "next-connect";
const { MONGODB_URI, MONGODB_DB } = process.env;
export const connect = () => {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true},
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to MongoDB");
      }
    });
}
