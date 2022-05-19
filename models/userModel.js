import { ObjectId } from "mongodb";
import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  posts: [PostSchema],
});

// Prevents a new model from being created each time
const User = models.user || model("user", UserSchema);

export default User;
