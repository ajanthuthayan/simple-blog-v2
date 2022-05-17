import connectMongo from "../../utils/connectMongo";
import User from "../../models/userModel";
import bcrypt from "bcrypt";

export default async function createUserHandler(req, res) {
  try {
    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    await connectMongo();
    const user = await User.create({ name, email, hash });

    return res.json({ user });
  } catch (error) {
    return res.status(404).json({ error: true });
  }
}
