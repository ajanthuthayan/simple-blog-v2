import connectMongo from "../../utils/connectMongo";
import User from "../../models/userModel";
import bcrypt from "bcrypt";

export default async function findUserHandler(req, res) {
  try {
    const { name, email, password } = req.body;

    await connectMongo();
    const user = await User.findOne({ email });

    if (user !== null) {
      const userMatched = bcrypt.compareSync(password, user.hash);
      if (userMatched) {
        return res.json({ user });
      } else {
        return res.status(404).json({ error: true });
      }
    } else {
      return res.status(404).json({ error: true });
    }
  } catch (error) {
    return res.status(404).json({ error: true });
  }
}
