export interface UserCreateBody {
  name: string;
  userName: string;
  email: string;
  password: string;
  avatar?: string;
  background?: string;
};

export interface UserLoginBody {
  email: string;
  password: string;
};

export interface UserUpdateBody {
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
  avatar?: string;
  background?: string;
};

export interface IResponseCreateService {
  user: {
    _id: string;
    name: string;
    userName: string;
    email: string;
    avatar: string;
    background: string;
  };
  message: string;
  OK: boolean;
};

export interface IResponseGetById {
  user: {
    _id: string;
    name: string;
    userName: string;
    email: string;
    avatar: string;
    background: string;
  }
};

export interface IParamsId {
  id: string; 
};