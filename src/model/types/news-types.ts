import { IParamsId } from "./user.types";

export interface NewsCreateBody { //OK
  title: string;
  text: string;
  banner?: string;
};

export interface IResponseMessageandOK { //OK
  message: string;
  OK: boolean;
};

export interface IResponseLikeNewsById { //OK
  message: string;
  OK: boolean;
  ok: boolean;
}

export interface IBodyCommentAdd { //OK
  comment: string;
}

export interface INewsDocument { //OK
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

export type NewsDocumentsResponse = INewsDocument & IResponseMessageandOK;

export type CombinedParamsForRemoveComment = INewsIdParams & CommentIdParams & IParamsId;