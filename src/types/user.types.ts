export interface UserCreateBody {
  name: string;
  userName: string;
  email: string;
  password: string;
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