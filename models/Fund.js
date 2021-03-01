import mongoose, { Schema } from "mongoose";

const FundSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Schema.Types.Number,
    required: true,
  },
});

export default mongoose.models.Fund || mongoose.model("Fund", FundSchema);
