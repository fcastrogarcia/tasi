import dbConnect from "utils/dbConnect";
import Fund from "models/Fund";

export default async function handler(req, res) {
  const {
    query: { id: user },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const fund = await Fund.findOne({ user });

        if (!fund) {
          return res.status(400).json({ success: false });
        }

        const nextAmount = fund.amount + req.body.amount;

        if (nextAmount <= 0) {
          return res
            .status(400)
            .json({ success: false, message: "Insuficcient funds" });
        }

        fund.amount = nextAmount;
        const nextFund = await fund.save();

        res.status(200).json({ success: true, data: nextFund });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
