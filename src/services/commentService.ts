import instance from '@/configs/axios.config';
import { IComment } from '@/interfaces';
import { toast } from 'react-toastify';

const getAllCommentPost = async (postId: string) => {
  try {
    const respon = await instance.get(`comment/${postId}/post`);
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

const commentPost = async (comment: IComment) => {
  try {
    const respon = await instance.post(`comment`, comment);
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

export { commentPost, getAllCommentPost };
