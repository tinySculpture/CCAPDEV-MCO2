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

const getCurrentUser = (req) => {
  const token = req.cookies.token
  const currentUser = jwt.verify(token, process.env.SECRET_KEY)
  return currentUser
}

app.get("/api/posts", (req, res) => {
  const currentUser = getCurrentUser(req)

  PostModel.find({})
  .populate("userID")
  .then((posts) => {
    res.send(JSON.stringify({
      posts, currentUser
    }))
  }).catch((err) => {
    res.json(err)
  })
})

app.get("/api/user", (req, res) => {
  const currentUser = getCurrentUser(req)

  UserModel.findOne({username: req.query.username})
  .then((user) => {
    
    PostModel.find({
      userID: {
        _id: user._id
      }
    })
    .populate("userID")
    .then((posts) => {
      res.send(JSON.stringify({
        posts, user, currentUser,
      }))
    }).catch((err) => {
      res.json(err)
    })
  })
  .catch((err) => {
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

      res.send("Token sent")
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
  const currentUser = getCurrentUser(req)

  const post = new PostModel({
    userID: currentUser.uid,
    title: req.body.title,
    body: req.body.body,
    votes: [currentUser],
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

/* Delete Post */ 
app.delete("/api/posts/:_id", async (req, res) => {
  const postId = req.params._id;

  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found." });
    }
    res.json({ message: "Post deleted successfully.", deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post." });
  }
})

/* Update Post */
app.put("/api/posts/:_id", async (req, res) => {
  const postId = req.params._id;

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }
    res.json({ message: "Post updated successfully.", updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating post." });
  }
})

app.get("/post", (req, res) => {
  const currentUser = getCurrentUser(req)

  UserModel.findOne({username: req.query.username})
  .then((user) => {
    PostModel.findOne({
      userID: {
        _id: user._id
      },
      title: req.query.title.split('_').join(' ')
    })
    .populate("userID")
    .then((post) => {
      res.send(JSON.stringify({
        post, currentUser
      }))
    }).catch((err) => {
      res.json(err)
    })
  })
  .catch((err) => {
    res.json(err)
  })
})

app.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.send("Logged out")
})

// app.post("/updateVote", (req, res) => {
//   if (req.body.isUpvoted) {
//     PostModel.update({
//       _id: req.body._id
//     }, {
//       $push: {
//         votes: req.body.currentUserID
//       }
//     }, done)
//   } else if (req.body.isDownvoted) {
//     PostModel.update({
//       _id: req.body._id
//     }, {
//       $pull: {
//         votes: req.body.currentUserID
//       }
//     }, done)
//   }
// })

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000..."),
);