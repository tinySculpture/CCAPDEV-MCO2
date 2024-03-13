import {mongoose, Schema} from "mongoose"

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [{
    body: String,
    date: Date,
  }]
}, {collection: "posts"})

const PostModel = mongoose.model("Post", PostSchema, "posts")

export default PostModel