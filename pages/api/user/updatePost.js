import connectMongo from "../../../utils/connectMongo";
import { ObjectId } from "mongodb";
import User from "../../../models/UserModel";
import { getSession } from "next-auth/react";

export default async function updatePost(req, res) {
  const session = await getSession({ req });
  try {
    const { postId, date, title, body } = req.body;
    await connectMongo();
    const user = await User.findOneAndUpdate(
      { "posts._id": postId },
      {
        $set: {
          "posts.$": {
            _id: postId,
            author: session.user.name,
            date: date,
            title: title,
            body: body,
          },
        },
      }
    );
    return res.json({ user });
  } catch (error) {
    return res.status(404).json({ error: true });
  }
}
