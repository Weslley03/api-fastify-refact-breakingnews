import { IParamsId } from "./user.types";

export interface NewsCreateBody {
  title: string;
  text: string;
  banner?: string;
};

export interface IResponseCreateService {
  message: string;
  OK: boolean;
};

export interface IComment {
  commentId: string;
  userId: string;
  comment: string;
  createdAt: any;
}

export interface INewsDocument {
  _id: string;
  title: string;
  text: string;
  banner: string;
  likes: string | number; 
  comments: {
    commentId: string,
    userId: string,
    comment: string,
    createdAt: any,
  };
  user: {
    username: string;
    avatar: string;
  };
};

export interface IUpdateValidation {
  _id: string;
  user: string;
};

export interface IMyNews {
  _id: string;
  title: string;
  text: string;
  banner: string;
  likes: number;
  comments: string;
  user: {
    username: string;
    avatar: string;
  };
};

export interface PaginationQuery {
  limit?: string;
  offset?: string;
};

export interface TitleParams {
  title: string;
};

export interface INewsIdParams {
  idNews: string;
};

export interface CommentIdParams {
  commentId: string;
};

export interface IUpdateNewsBody {
  idNews: IParamsId;
  title: string;
  text: string;
  banner: string;
}

export interface NewsUpdateBody {
  title?: string;
  text?: string;
  banner?: string;
};

export type CombinedParamsForRemoveComment = INewsIdParams & CommentIdParams & IParamsId;
