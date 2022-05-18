import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  posts: { type: Array, required: true },
});

// Prevents a new model from being created each time
const User = models.User || model("User", userSchema);

export default User;
