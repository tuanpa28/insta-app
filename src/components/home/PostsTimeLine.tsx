'use client';

import { useState } from 'react';

import PostItem from '@/components/PostItem';
import { getPostTimeLine } from '@/services/postService';
import { useQuery } from '@tanstack/react-query';

export const PostsTimeLine = () => {
  const [volume, setVolume] = useState<boolean>(false);

  // const [data, setData] = useState<IPostTimeLine[]>([]);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState<boolean>(true);
  // const [isLoading, setIsLoading] = useState(false);
  // const { ref, inView } = useInView({
  //   threshold: 0,
  // });

  const { data } = useQuery({
    queryKey: ['posts-time-line'],
    queryFn: getPostTimeLine,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
  // const { isLoading, error, data: posts } = useGetPostTimeLine();

  // if (error) return JSON.stringify(error);

  const toggleVolume = () => setVolume(!volume);

  // const fetchData = useCallback(() => {
  //   setIsLoading(true);
  //   (async () => {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 3000));

  //       setData((prevData) => [...prevData, ...dataFake]);

  //       if (page >= 4) {
  //         setHasMore(false);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [page]);

  // useEffect(() => {
  //   if (inView && hasMore && !isLoading) {
  //     fetchData();
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // }, [inView, hasMore, isLoading, fetchData]);

  return (
    <>
      <div className='flex flex-col items-center justify-start max-w-full w-[470px]'>
        {data?.data?.data?.map((post: any, i: number) => {
          return <PostItem key={i} post={post} isVolume={volume} onToggleVolume={toggleVolume} />;
        })}
      </div>
      {/* {hasMore && (
        <div ref={ref} className='h-14 mt-6 flex items-center justify-center'>
          <LoadingIcon className='w-8 h-8 animate-spinner' />
        </div>
      )} */}
    </>
  );
};
