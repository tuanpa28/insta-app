import { IUser } from './user';

export interface IPost {
  _id?: string;
  user_id?: any;
  caption: string;
  media: Array<IMedia>;
  likes?: Array<any>;
  shares?: Array<any>;
  slug?: string;
  createdAt?: string;
}

export interface IMedia {
  type: string;
  url: string;
}

export interface IComment {
  post_id: string;
  content: string;
}
