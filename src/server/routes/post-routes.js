import { Router } from "express";
import { PostModel } from "../schemas.js";
const postRouter = Router();

postRouter.get("/api/posts", async (req, res) => {
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

export default postRouter;
