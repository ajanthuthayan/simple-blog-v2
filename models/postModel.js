import mongoose, { Schema, model, models } from "mongoose";

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

// Prevents a new model from being created each time
const Post = models.Post || model("Post", postSchema);

export default Post;
