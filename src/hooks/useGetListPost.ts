'use client';

import { postService } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { saveListPost } from '@/store/slices/postSlice';
import { useEffect, useState } from 'react';

const useGetListPost = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.post.posts);

  useEffect(() => {
    setisLoading(true);
    (async () => {
      try {
        const response = await postService.getListPost();
        const posts = response?.data.data;
        dispatch(saveListPost(posts));
        setisLoading(false);
      } catch (error: any) {
        setisLoading(false);
        setError(error?.response?.data?.message);
      }
    })();
  }, [dispatch]);

  return { isLoading, error, data };
};

export default useGetListPost;
