import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  displayName: String,
  username: String,
  email: String,
  password: String,
  role: String
})
export const UserModel = mongoose.model("Users", UserSchema, "Users")

const CommentSchema = new Schema({
  body: String,
  createdAt: Date,
  commentorID: {
    type: Schema.Types.ObjectId,
    ref: UserModel
  }
})
export const CommentModel = mongoose.model("Comments", CommentSchema, "Comments")

const PostSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
  },
  title: String,
  body: String,
  votes: [{
    voter: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
    }
  }],
  createdAt: Date,
  comments: [{
    commentID: {
      type: Schema.Types.ObjectId,
      ref: CommentModel
    }
  }]
})
const PostModel = mongoose.model("Posts", PostSchema, "Posts")

export default PostModel