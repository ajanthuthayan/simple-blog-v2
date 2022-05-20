import connectMongo from "../../../utils/connectMongo";
import { ObjectId } from "mongodb";
import User from "../../../models/UserModel";
import { getSession } from "next-auth/react";

export default async function deletePost(req, res) {
  const session = await getSession({ req });
  const { postid } = req.body;

  try {
    await connectMongo();
    const user = await User.findById({ _id: ObjectId(session.id) }).updateOne(
      {
        _id: ObjectId(session.id),
      },
      {
        $pull: {
          posts: {
            _id: ObjectId(postid),
          },
        },
      }
    );
    return res.json({ user });
  } catch (error) {
    return res.status(404).json({ error: true });
  }
}
