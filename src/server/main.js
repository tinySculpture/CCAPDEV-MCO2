import express from "express";
import ViteExpress from "vite-express";
import db, { db_url } from "./database.js";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";

import userRouter from "./routes/user-routes.js";
import postRouter from "./routes/post-routes.js";
import commentRouter from "./routes/comment-routes.js";


const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

mongoose.connect(db_url);

app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)

// const getCurrentUser = (req) => {
//   const token = req.cookies.token;
//   const currentUser = jwt.verify(token, process.env.SECRET_KEY);
//   return currentUser;
// };

// app.get("/api/user", (req, res) => {
//   const currentUser = getCurrentUser(req);

//   UserModel.findOne({ username: req.query.username })
//     .then((user) => {
//       PostModel.find({
//         userID: {
//           _id: user._id,
//         },
//       })
//         .populate("userID")
//         .then((posts) => {
//           res.send(
//             JSON.stringify({
//               posts,
//               user,
//               currentUser,
//             })
//           );
//         })
//         .catch((err) => {
//           res.json(err);
//         });
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// app.get("/api/users", (req, res) => {
//   UserModel.find().then((users) => {
//     res.json(users);
//   });
// });

// app.get("/api/currentUser", (req, res) => {
//   const token = req.cookies.token;
//   try {
//     const user = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = user;
//     res.send(user);
//   } catch (err) {
//     res.clearCookie("token");
//   }
// });

// app.post("/create", async (req, res) => {
//   const currentUser = getCurrentUser(req);

//   const post = new PostModel({
//     userID: currentUser.uid,
//     title: req.body.title,
//     body: req.body.body,
//     votes: [currentUser],
//     createdAt: Date.now(),
//     comments: [],
//   });

//   try {
//     await post.save();
//     res.send("Success.");
//   } catch (err) {
//     console.log(err);
//   }
// });

// /* Delete Post */
// app.delete("/post", async (req, res) => {
//   const currentUser = getCurrentUser(req);

//   UserModel.findOne({ username: req.query.username })
//     .then((user) => {
//       PostModel.findOne({
//         userID: {
//           _id: user._id,
//         },
//         title: req.query.title.split("_").join(" "),
//       })
//         .then((post) => {
//           PostModel.findByIdAndDelete(post._id)
//             .then((del) => {
//               res.send("Deleted successfully.");
//             })
//             .catch((err) => {
//               res.json(err);
//             });
//         })
//         .catch((err) => {
//           res.json(err);
//         });
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// /* Update Post */
// app.post("/edit", async (req, res) => {
//   const postId = req.query.id;

//   const result = await PostModel.findOneAndUpdate(
//     { _id: postId },
//     {
//       title: req.body.title,
//       body: req.body.body,
//     }
//   );
// });

// app.get("/editpost", (req, res) => {
//   const postId = req.query.id;

//   console.log(postId);
//   PostModel.findOne({ _id: postId })
//     .then((post) => {
//       res.send(post);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/post", async (req, res) => {
//   const currentUser = getCurrentUser(req);
//   console.log(req.body);
//   // const realTitle = req.body.title
//   console.log(req.query);

//   await UserModel.findOne({ username: req.query.username })
//     .then((user) => {
//       PostModel.findOne({
//         title: req.query.title,
//       }).then((post) => console.log(post));

//       PostModel.findOne({
//         userID: {
//           _id: user._id,
//         },
//         title: title,
//       })
//         .populate("userID")
//         .then((post) => {
//           res.send(
//             JSON.stringify({
//               post,
//               currentUser,
//             })
//           );
//         })
//         .catch((err) => {
//           res.json(err);
//         });
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// app.get("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.send("Logged out");
// });

// /* Comment */
// app.post("/comment", async (req, res) => {
//   const currentUser = getCurrentUser(req);
//   const postId = req.query.postId;

//   try {
//     const post = await PostModel.findOne({ _id: postId });
//     if (!post) {
//       return res.status(404).json({ message: "Post not found." });
//     }

//     const comment = new CommentModel({
//       content: req.query.body,
//       createdAt: Date.now(),
//       commentorID: currentUser.uid,
//       votes: 0,
//     });

//     post.comments.push(comment);
//     await post.save();

//     res.json({ message: "Comment added successfully.", comment });
//   } catch (err) {
//     console.log(err);
//   }
// });

// /* Update Comment */
// app.put("/api/posts/:postId/comments/:commentId", async (req, res) => {
//   const { postId, commentId } = req.params;
//   const { content } = req.body;

//   try {
//     const post = await PostModel.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found." });
//     }

//     const comment = post.comments.id(commentId);
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found." });
//     }

//     comment.content = content;
//     await comment.save();

//     res.json({ message: "Comment updated successfully.", comment });
//   } catch (err) {
//     console.log(err);
//   }
// });

// /* Delete Comment */
// app.delete("/api/posts/:postId/comments/:commentId", async (req, res) => {
//   const { postId, commentId } = req.params;

//   try {
//     const post = await PostModel.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found." });
//     }

//     const comment = post.comments.id(commentId);
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found." });
//     }

//     comment.remove();
//     await post.save();

//     res.json({ message: "Comment deleted successfully." });
//   } catch (err) {
//     console.log(err);
//   }
// });

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000...")
);
