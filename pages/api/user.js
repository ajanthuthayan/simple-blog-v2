import connectMongo from "../../utils/connectMongo";
import User from "../../models/userModel";

export default async function userHandler(req, res) {
  try {
    const { name, email, password } = req.body;

    await connectMongo();
    const user = await User.create({ name, email, password });

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
