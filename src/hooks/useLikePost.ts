// 'use client';

// import { IPost } from '@/interfaces';
// import { postService } from '@/services';
// import { useAppSelector } from '@/store/hook';
// import { useState } from 'react';
// import { toast } from 'react-toastify';

// const useLikePost = (post: IPost) => {
//   const [isLoading, setisLoading] = useState(false);
//   const authUser = useAppSelector((state) => state.user.currentUser.values);
//   const [likes, setLikes] = useState(post?.likes?.length || 0);
//   const [isLiked, setIsLiked] = useState(post?.likes?.includes(authUser?._id));

//   const handleLikePost = async () => {
//     if (isLoading) return;
//     if (!authUser) return toast.error('Bạn phải đăng nhập để thích bài viết!');
//     setisLoading(true);

//     try {
//       await postService.likePost(post?._id as string);

//       setIsLiked(!isLiked);
//       isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
//     } catch (error: any) {
//       toast.error(error?.message);
//     } finally {
//       setisLoading(false);
//     }
//   };

//   return { isLoading, isLiked, likes, handleLikePost };
// };

// export default useLikePost;
