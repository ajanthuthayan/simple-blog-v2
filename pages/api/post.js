import connectMongo from "../../utils/connectMongo";
import Post from "../../models/postModel";

export default async function postHandler(req, res) {
  try {
    const { author, date, title, body } = req.body;

    await connectMongo();
    const post = await Post.create({ author, date, title, body });

    return res.json({ post });
  } catch (error) {
    return res.status(404).json({ error: true });
  }
}
