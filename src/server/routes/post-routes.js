import { Router } from "express";
import { CommentModel, PostModel } from "../schemas.js";
import mongoose from "mongoose";
const postRouter = Router();

postRouter.get("/api/posts/", async (req, res) => {
  try {
    const posts = await PostModel.find({})
      .populate("userID")
      .sort("-createdAt")
      .lean()
      .exec();
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

postRouter.get("/api/post/:id", async (req, res) => {
  const data = req.params;

  try {
    const post = await PostModel.findById(data.id)
      .populate("userID")
      .lean()
      .exec();
    res.send(post);
  } catch (err) {
    res.send(500);
  }
});

postRouter.get("/api/post/:id/getvotes", async (req, res) => {
  const data = req.params;

  try {
    const votes = await PostModel.aggregate()
      .match({
        _id: new mongoose.Types.ObjectId(data.id),
      })
      .project({
        userID: "$userID",
        upvotes: "$upvotes",
        downvotes: "$downvotes",
        totalVotes: {
          $subtract: [
            {
              $size: "$upvotes",
            },
            {
              $size: "$downvotes",
            },
          ],
        },
      })
      .exec();

    res.send(votes);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

postRouter.get("/api/post/:username/:postId", async (req, res) => {
  const params = req.params;

  try {
    const post = await PostModel.find({
      _id: params.postId,
    })
      .populate({
        path: "userID",
        match: {
          username: params.username,
        },
        select: "-password",
      })
      .populate({
        path: "comments",
      })
      .lean()
      .exec();

    res.send(post);
  } catch (err) {}
});

postRouter.put("/api/posts/updatevote", async (req, res) => {
  const data = req.body;
  let updateValue = {};

  try {
    // check if adding an upvote
    switch (data.count) {
      case 1:
        // user is upvoting
        updateValue = {
          $addToSet: {
            upvotes: data.userID,
          },
          $pull: {
            downvotes: data.userID,
          },
        };
        break;
      case 0:
        // user is resetting upvote/downvote
        updateValue = {
          $pull: {
            upvotes: data.userID,
            downvotes: data.userID,
          },
        };
        break;
      case -1:
        // user is downvoting
        updateValue = {
          $addToSet: {
            downvotes: data.userID,
          },
          $pull: {
            upvotes: data.userID,
          },
        };
        break;
    }

    const post = await PostModel.findOneAndUpdate(
      {
        _id: data.postID,
      },
      updateValue,
      {
        returnDocument: "after",
      }
    ).exec();

    res.send(
      JSON.stringify({
        votes: post.upvotes.length - post.downvotes.length,
      })
    );
  } catch (err) {
    console.error(err);
  }
});

export default postRouter;
