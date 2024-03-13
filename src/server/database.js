import mongoose from "mongoose";

const db_url = "mongodb+srv://josiah:josiahmari1@edurevs.4cnhyvi.mongodb.net/prof2pick?retryWrites=true&w=majority&appName=EduRevs"

const connectDB = () => {
  mongoose.connect(db_url,
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // }
  ).then(() => {
    console.log("Connected to database.")
  }).catch((err) => {
    console.log("Failed to connect to database.")
  })
}

export default connectDB