import express from "express";
import ViteExpress from "vite-express";
import db, { db_url } from "./database.js";
import cors from "cors"
import mongoose from "mongoose";
import PostModel, { UserModel } from "./schemas.js";

const PORT = 3000

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect(db_url)

app.get("/api/posts", async (req, res) => {
  PostModel
  .find()
  .then((posts) => {
    res.json(posts)
  }).catch((err) => {
    res.json(err)
  })
})

app.post("/signup", async (req, res) => {
  const data = new UserModel({
    displayName: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: "user"
  })

  try {
    await data.save()
  } catch {
    console.log(err)
  }
})

app.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({username: req.body.username})

    if (user.password === req.body.password) {
      
    }
  } catch {

  }
})

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000..."),
);