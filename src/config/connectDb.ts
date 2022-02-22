import mongoose from "mongoose";
require("dotenv").config();




const uri =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@cluster-renter.wtjjt.mongodb.net/renterApp?retryWrites=true&w=majority";

export const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("database is connected successfully...");
  } catch (err: any) {
    console.log("connection error occurred. ensure you are connected to db...");
  } 
};
