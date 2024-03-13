import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  displayName: String,
  username: String,
  email: String,
  password: String,
  role: String
})
export const UserModel = mongoose.model("Users", UserSchema)

const CommentSchema = new Schema({
  body: String,
  createdAt: Date,
  commentorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel
  }
})
export const CommentModel = mongoose.model("Comments", CommentSchema)

const PostSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
  },
  title: String,
  body: String,
  votes: Number,
  createdAt: Date,
  comments: [{
    commentID: {
      type: Schema.Types.ObjectId,
      ref: CommentModel
    }
  }]
})
export const PostModel = mongoose.model("Posts", PostSchema)

export default PostModel