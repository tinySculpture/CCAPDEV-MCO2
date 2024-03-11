import express from "express";
import mongoose from "mongoose";
import ViteExpress from "vite-express";

const PORT = 3000

const app = express();

ViteExpress.listen(app, PORT, () =>
console.log("Server is listening on port 3000..."),
);

const mongoose = mongoose();

mongoose.connect("mongodb+srv://josiah:josiahmari1@edurevs.4cnhyvi.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})