import { Types, Schema, model, Document } from "mongoose";

export interface INews extends Document {
  _id: string;
  title: string;
  text: string;
  banner: string;
  createAt: string;
  user: string;
  likes: string;
  comments: string;
};

const NewsSchema = new Schema({
  title: { type: String, required: true, unique: true },
  text: { type: String, required: true, unique: true },
  banner: { type: String, required: true },
  createAt: { type: Date, default: Date.now() },
  user: { type: Types.ObjectId,ref: "User", required: true },
  likes: { type: Array, required: true },
  comments: { type: Array, required: true },
});

export const News = model<INews>('News',NewsSchema);