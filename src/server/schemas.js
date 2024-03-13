import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  body: String,
  votes: Number,
  createdAt: Date,
  comments: [{
    body: String,
    createdAt: Date,
    commenterID: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  }]
})

const UserSchema = new Schema({
  displayName: String,
  username: String,
  email: String,
  password: String,
  role: String
})

export const PostModel = mongoose.model("Posts", PostSchema)
export const UserModel = mongoose.model("Users", UserSchema)

export default PostModel