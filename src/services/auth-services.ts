import { IUser, User } from "../models/user-model"
import bcrypt from "bcrypt";
import { statusFailed } from "./user-services";

export async function loginUserService(email: string, password: string){
  try{
    const user = await User.findOne({ email: email }).select('+password') as IUser | null;
    if (!user) return statusFailed('user not fould');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if(!passwordIsValid) return statusFailed('incorrect username or password');

    return {
      user: {
        _id: user._id.toString(),
        name: user.name,
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        background: user.background
      },
      message: 'LOGIN OK',
      OK: true
    };
  }catch(err){
    console.error('there was an error in the application service: ', err)
    return undefined
  };
};