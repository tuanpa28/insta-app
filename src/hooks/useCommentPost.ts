'use client';

import { commentService } from '@/services';
import { useAppSelector } from '@/store/hook';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useCommentPost = () => {
  const [isLoading, setisLoading] = useState(false);
  const authUser = useAppSelector((state) => state.user.currentUser.values);

  const handleCommentPost = async (post_id: string, content: string) => {
    if (isLoading) return;
    if (!authUser) return toast.error('Bạn phải đăng nhập để bình luận bài viết!');
    setisLoading(true);

    try {
      const comment = { post_id, content };
      const response = await commentService.commentPost(comment);

      return response?.data;
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setisLoading(false);
    }
  };

  return { isLoading, handleCommentPost };
};

export default useCommentPost;
