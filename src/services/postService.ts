import instance from '@/configs/axios.config';
import { IPost } from '@/interfaces';
import { toast } from 'react-toastify';

const getPostsUser = async (userId: string) => {
  try {
    const respon = await instance.get(`post/${userId}/user`);
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

const likePost = async (postId: string) => {
  try {
    const respon = await instance.put(`post/${postId}/like`);
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

const createPost = async (post: IPost) => {
  try {
    const respon = await instance.post('post', post);
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

const getListPost = async () => {
  try {
    const respon = await instance.get('post');
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

const getPostTimeLine = async () => {
  try {
    const respon = await instance.get('post/timeline/results?_order=desc');
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

const uploadImage = async (formData: FormData) => {
  try {
    const respon = await instance.post('upload/images', formData);
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

const uploadVideo = async (formData: FormData) => {
  try {
    const respon = await instance.post('upload/video', formData);
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

const deletePost = async (IdPost: string) => {
  try {
    return await instance.delete(`post/${IdPost}`);
  } catch (error: any) {
    toast.error(error?.message);
  }
};

export {
  createPost,
  deletePost,
  getListPost,
  getPostTimeLine,
  getPostsUser,
  likePost,
  uploadImage,
  uploadVideo,
};
