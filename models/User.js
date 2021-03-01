import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  document: {
    type: Schema.Types.Number,
    required: true,
  },
  password: {
    type: Schema.Types.Number,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
