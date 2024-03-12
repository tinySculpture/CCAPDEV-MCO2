import mongoose from "mongoose";

export const db_url = "mongodb+srv://josiah:josiahmari1@edurevs.4cnhyvi.mongodb.net/"


const connectDB = () => {
  mongoose.set("strictQuery", true)
  mongoose.connect(db_url, {}).then(() => {
    console.log("Connected to database.")
  }).catch((err) => {
    console.log("Failed to connect to database.")
  })
}

export default connectDB