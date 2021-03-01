import User from "models/User";
import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  // firmar el token
  // devolver el usuario con el token

  const { password, document } = body;

  switch (method) {
    case "POST":
      try {
        const [user = {}] = await User.find({ document });

        if (user.password === password) {
          res.status(200).json({ success: true, data: user });
        } else {
          throw new Error("Password does not match");
        }
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
