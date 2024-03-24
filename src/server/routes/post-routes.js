import { Router } from "express";
import { PostModel } from "../schemas.js";
import mongoose from "mongoose";
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

postRouter.get("/api/getvotes/:id", async (req, res) => {
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

postRouter.put("/api/posts/updateupvote", async (req, res) => {
	const data = req.body
	let updateValue = {}

	try {
		// check if adding an upvote
		switch(data.count) {
			case 1:
				// user is upvoting
				updateValue = {
					$addToSet: {
						upvotes: data.userID,
					},
					$pull: {
						downvotes: data.userID,
					}
				}
				break;
			case 0:
				// user is resetting upvote/downvote
				updateValue = {
					$pull: {
						upvotes: data.userID,
						downvotes: data.userID,
					}
				}
				break;
			case -1:
				// user is downvoting
				updateValue = {
					$addToSet: {
						downvotes: data.userID,
					},
					$pull: {
						upvotes: data.userID,
					}
				}
				break;
		}

		const post = await PostModel.findOneAndUpdate({
			_id: data.postID,
		}, updateValue).exec()

		console.log(post)
		res.sendStatus(200)
	} catch (err) {
		console.error(err)
	}
})

export default postRouter;
