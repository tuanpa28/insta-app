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
}

export interface IMedia {
  type: string;
  url: string;
  _id?: string;
}

export interface IComment {
  post_id: string;
  content: string;
}
