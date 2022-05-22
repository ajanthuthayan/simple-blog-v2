// /api/user/updatePost
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/UserModel";
import { getSession } from "next-auth/react";

export default async function updatePost(req, res) {
  const session = await getSession({ req });
  try {
    const { postId, title, body } = req.body;
    await connectMongo();
    const user = await User.findOneAndUpdate(
      { "posts._id": postId },
      {
        $set: {
          "posts.$.title": title,
          "posts.$.body": body,
        },
      }
    );
    return res.json({ user });
  } catch (error) {
    return res.status(404).json({ error: true });
  }
}
