// 'use client';

// import { postService } from '@/services';
// import { useAppDispatch, useAppSelector } from '@/store/hook';
// import { savePostsTimeLine } from '@/store/slices/postSlice';
// import { useEffect, useState } from 'react';

// const useGetPostTimeLine = () => {
//   const [isLoading, setisLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const dispatch = useAppDispatch();

//   const data = useAppSelector((state) => state.post.postsTimeLine);

//   useEffect(() => {
//     setisLoading(true);
//     (async () => {
//       try {
//         const response = await postService.getPostTimeLine();

//         const posts = response?.data;
//         dispatch(savePostsTimeLine(posts));
//         setisLoading(false);
//       } catch (error: any) {
//         setisLoading(false);
//         setError(error?.response?.data?.message);
//       }
//     })();
//   }, [dispatch]);

//   return { isLoading, error, data };
// };

// export default useGetPostTimeLine;
