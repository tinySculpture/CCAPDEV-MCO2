import express from "express";
import ViteExpress from "vite-express";
import cors from "cors"

import connectDB from "./database.js";
import PostModel from "./models/schemas.js";

const PORT = 3000

const app = express();

app.use(express.json())
app.use(cors())

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000..."),
);

app.get("/api/posts", async (req, res) => {
  const posts = await PostModel.find()

  res.json(posts)
})

connectDB()