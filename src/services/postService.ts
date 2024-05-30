import instance from '@/configs/axios.config';
import { IPost } from '@/interfaces';

export const getPostsUser = (userId: string) => {
  return instance.get(`post/${userId}/user`);
};

export const likePost = (postId: string) => {
  return instance.put(`post/${postId}/like`);
};

export const createPost = (post: IPost) => {
  return instance.post('post', post);
};

export const getListPost = () => {
  return instance.get('post');
};

export const getPostTimeLine = () => {
  return instance.get('post/timeline/results?_order=desc');
};

export const uploadImage = (formData: FormData) => {
  return instance.post('upload/images', formData);
};

export const uploadVideo = (formData: FormData) => {
  return instance.post('upload/video', formData);
};

export const deletePost = (IdPost: string) => {
  return instance.delete(`post/${IdPost}`);
};
