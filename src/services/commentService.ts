import instance from '@/configs/axios.config';
import { IComment } from '@/interfaces';

export const getAllCommentPost = (postId: string) => {
  return instance.get(`comment/${postId}/post`);
};

export const commentPost = async (comment: IComment) => {
  return instance.post(`comment`, comment);
};
