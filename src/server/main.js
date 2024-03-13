import express from "express";
import ViteExpress from "vite-express";
import db, { db_url } from "./database.js";
import cors from "cors"
import mongoose from "mongoose";
import PostModel, { UserModel } from "./schemas.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config"

const PORT = 3000

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

mongoose.connect(db_url)

app.get("/api/posts", (req, res) => {
  PostModel
  .find()
  .populate("userID")
  .then((posts) => {
    console.log(posts)
    res.json(posts)
  }).catch((err) => {
    res.json(err)
  })
})

app.get("/api/users", (req, res) => {
  UserModel.find()
  .then((users) => {
    res.json(users)
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
    res.send("")
  } catch {
    console.log(err)
    res.send("")
  }
})

app.post("/login", (req, res) => {
  UserModel.findOne({username: req.body.username})
  .then((user) => {
    const uid = user._id
    const username = user.username
    const role = user.role
    if (user.password === req.body.password) {
      const token = jwt.sign({
        uid, username, role
      }, process.env.SECRET_KEY)

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: true
      })

      res.send("")
    } else {
      console.log("Nothing")
    }
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get("/api/currentUser", (req, res) => {
  const token = req.cookies.token
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY)
    req.user = user
    res.send(user)
  } catch(err) {
    res.clearCookie("token")
  }
})

app.post("/create", async (req, res) => {
  const token = req.cookies.token
  const user = jwt.verify(token, process.env.SECRET_KEY)

  const post = new PostModel({
    userID: user.uid,
    title: req.body.title,
    body: req.body.body,
    votes: 0,
    createdAt: Date.now(),
    comments: []
  })

  try {
    await post.save()
    res.send("Success.")
  } catch (err) {
    console.log(err)
  }
})

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000..."),
);