import express from "express";
import ViteExpress from "vite-express";
import path from "path";
import { fileURLToPath } from 'url';

import connectDB from "./database.js";

const PORT = 3000
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "dist")))

const test = {
  name: "test",
  price: 120,
}

const router = express.Router()
app.use("/api/posts", router.get("/api/posts", (req, res) => {
  res.send(test)
}))

connectDB()

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000..."),
);