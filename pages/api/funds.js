import dbConnect from "utils/dbConnect";
import Fund from "models/Fund";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const fund = await Fund.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!fund) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: fund });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
