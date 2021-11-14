import { model, Schema } from "mongoose";
import { ICat } from "../types/cat";

const catSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ICat>("Cat", catSchema);
