'use client';

import { IPost } from '@/interfaces';
import { postService } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { savePostsTimeLine } from '@/store/slices/postSlice';
import { useCallback, useState } from 'react';

const useCreatePost = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.post.postsTimeLine);

  const crearePost = useCallback(
    async (post: IPost) => {
      setisLoading(true);
      try {
        const response = await postService.createPost(post);
        const newPost = response?.data;

        dispatch(savePostsTimeLine([newPost, ...data]));
        setisLoading(false);
      } catch (error: any) {
        setisLoading(false);
        setError(error?.response?.data?.message);
      }
    },
    [dispatch, data],
  );

  return { isLoading, error, crearePost };
};

export default useCreatePost;
