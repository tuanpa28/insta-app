import instance from '@/configs/axios.config';
import { ICreateComment } from '@/interfaces';

export const getAllCommentPost = (postId: string) => {
  return instance.get(`comment/${postId}/post`);
};

export const createCommentPost = async (comment: ICreateComment) => {
  return instance.post(`comment`, comment);
};
