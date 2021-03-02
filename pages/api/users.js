import User from "models/User";
import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  const { method, body } = req;
  const { password, document } = body;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        if (!password || !document)
          throw new Error("Documento y contraseña son datos obligatorios");

        const [user] = await User.find({ document });

        if (!user)
          throw new Error("El documento no pertenece a un usuario registrado");

        if (user.password === password) {
          res
            .status(200)
            .json({ success: true, user: { id: user._id, name: user.name } });
        } else {
          throw new Error("Contraseña incorrecta");
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
