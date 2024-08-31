import { User } from "../models/user-model";
import { IResponseCreateService, UserUpdateBody } from "../types/user.types";
import jwt from 'jsonwebtoken';

export const statusFailed = (messageError: string) => {
  return {
    user: {
      _id: '',
      name: '',
      userName: '',
      email: '',
      avatar: '',
      background: '',
    },
    message: messageError,
    OK: false
  };
};

export async function generateToken(userId: string): Promise<string | undefined>{
  try{
    const SECRET_JWT = process.env.SECRET_JWT;
    if(!SECRET_JWT) throw new Error('SECRET_KEY is not defined in the environment variables');
    return jwt.sign({userId: userId}, SECRET_JWT, {expiresIn: 86400})
  }catch(err){
    console.error('houve um erro na execução da função generateToken', err);
    return undefined;
  };
};

export async function createUserService(bodyData: object): Promise<IResponseCreateService | undefined> {
  try{
    const user = await User.create(bodyData);
    if (!user) return statusFailed('could not create user');

    return {
      user: {
        _id: user._id.toString(),
        name: user.name,
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        background: user.background
      },
      message: 'CADASTRO OK',
      OK: true
    };
  }catch(err){
    console.error(`there was an error in the application service: ${err}`);
    return undefined;
  };
};

export async function GetByIdService(userID: string | undefined) {
  try{
    return User.findById(userID);
  }catch(err){
    console.error(`there was an error in the application service: ${err}`);
    return undefined;
  };
};

export async function updateUserService(userID: string, userForUpdate: UserUpdateBody):Promise<IResponseCreateService | undefined> {
  try{
    const user = await User.findByIdAndUpdate(userID, userForUpdate, { new: true }).exec();
    if (!user) return statusFailed('could not update user');

    return {
      user: {
        _id: user._id.toString(),
        name: user.name,
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        background: user.background
      },
      message: 'UPDATE OK',
      OK: true
    }
  }catch(err){
    console.error(`there was an error in the application service: ${err}`);
    return undefined;
  }
};

export async function findAllUserService() {
  try{
    return User.find().select('_id name userName email');
  }catch(err){
    console.error(`there was an error in the application service: ${err}`);
  };
};

export async function deleteUserService(userID: string) {
  try{
    return User.findByIdAndDelete(userID);
  }catch(err){
    console.error(`there was an error in the application service: ${err}`);
  };
};


