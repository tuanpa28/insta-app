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

export const getPostTimeLine = ({
  pageParam,
  limit = 8,
}: {
  pageParam?: number;
  limit?: number;
}) => {
  return instance.get('post/timeline/results?_order=desc', {
    params: {
      page: pageParam,
      limit,
    },
  });
};

export const findPostListByUser = ({
  userId,
  pageParam,
}: {
  userId: string;
  pageParam?: number;
}) => {
  return instance.get(`post/${userId}/user?_order=desc`, {
    params: {
      page: pageParam,
    },
  });
};

export const uploadImage = (formData: FormData) => {
  return instance.post('upload/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const uploadVideo = (formData: FormData) => {
  return instance.post('upload/video', formData);
};

export const deletePost = (IdPost: string) => {
  return instance.delete(`post/${IdPost}`);
};
