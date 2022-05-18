import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";

export default async function register(req, res) {
  try {
    const { name, email, password, posts } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    await connectMongo();
    const user = await User.create({ name, email, hash, posts });

    return res.json({ user });
  } catch (error) {
    return res.status(404).json({ error: true });
  }
}
