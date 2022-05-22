// /api/user/createPost
import connectMongo from "../../../utils/connectMongo";
import { ObjectId } from "mongodb";
import User from "../../../models/UserModel";
import { getSession } from "next-auth/react";

export default async function createPost(req, res) {
  const session = await getSession({ req });
  try {
    const { author, date, title, body } = req.body;
    await connectMongo();
    const user = await User.findByIdAndUpdate(
      { _id: ObjectId(session.id) },
      {
        $push: {
          posts: {
            author: author,
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
