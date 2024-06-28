import { IUser } from './user';

export interface IPost {
  _id?: string;
  user_id?: string;
  user?: IUser;
  caption: string;
  media: Array<IMedia>;
  likes?: Array<string | IUser>;
  shares?: Array<string | IUser>;
  slug?: string;
  createdAt?: string | Date;
  totalComments?: number;
}

export interface IPostTimeLine {
  _id: string;
  user: IUser;
  caption: string;
  media: Array<IMedia>;
  likes: Array<string | IUser>;
  shares: Array<string | IUser>;
  slug: string;
  createdAt: string | Date;
  totalComments: number;
}

export interface IMedia {
  type: string;
  url: string;
  _id?: string;
}

export interface IComment {
  _id?: string;
  user_id: string;
  user: IUser;
  post_id: string;
  content: string;
  likes: Array<string>;
  replies: Array<IReplies>;
  createdAt: string | Date;
}

export interface ICreateComment {
  post_id: string;
  content: string;
}

export interface IReplies {
  user_id: string;
  content: string;
}
