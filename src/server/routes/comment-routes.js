import { Router } from "express";
import { CommentModel, PostModel } from "../schemas.js";
import mongoose from "mongoose";
const commentRouter = Router();

const createComment = () => {
	return 
}

commentRouter.post("/api/comment", async (req, res) => {
	const data = req.body

	// create comment
	const newComment = new CommentModel({
		body: data.comment,
		createdAt: Date.now(),
		commentorID: data.userId,
		upvotes: [data.userId],
		downvotes: [],
		comments: [],
	})

	try {
		const addedComment = await newComment.save()
		const post = await PostModel.findByIdAndUpdate(data.postId, {
			$addToSet: {
				comments: addedComment,
			},
		}).exec()
		res.send(addedComment)
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
})

commentRouter.post("/api/reply", async (req, res) => {
	const data = req.body

	// create reply
	const newReply = new CommentModel({
		body: data.reply,
		createdAt: Date.now(),
		commentorID: data.userId,
		upvotes: [data.userId],
		downvotes: [],
		comments: []
	})

	try {
		const addedReply = await newReply.save()
		const comment = await CommentModel.findByIdAndUpdate(data.commentId, {
			$addToSet: {
				comments: addedReply,
			},
		}).exec()

		res.send(addedReply)
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
})

commentRouter.get("/api/:id/replies", async (req, res) => {
  const data = req.params;

  try {
    const comment = await CommentModel.findById(data.id)
      .populate("commentorID")
      .lean()
      .exec();
    res.send(comment);
  } catch (err) {
    res.sendStatus(500);
  }
});
export default commentRouter;