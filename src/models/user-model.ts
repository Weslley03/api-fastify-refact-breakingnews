import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt"

export interface IUser extends Document {
  _id: string;
  name: string;
  userName: string;
  email: string;
  password: number;
  avatar: string;
  background: string;
};

const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  background: { type: String, required: true },
});

UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10)
  next();
});

export const User = model<IUser>('User', UserSchema);