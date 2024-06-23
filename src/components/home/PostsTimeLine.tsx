'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { LoadingIcon } from '@/components/Icons';
import PostItem from '@/components/PostItem';
import { IPostTimeLine } from '@/interfaces';
import { getPostTimeLine } from '@/services/postService';
import { useStore } from '@/store';

export const PostsTimeLine = () => {
  const [isSound, setIsSound] = useState<boolean>(false);
  const [state] = useStore();
  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: true,
  });

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['posts-time-line', { currentUser: state.user?.username }],
    queryFn: getPostTimeLine,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.currentPage;
      const totalPage = lastPage.data.totalPage;
      const nextPage = currentPage + 1 <= totalPage ? currentPage + 1 : undefined;
      return nextPage;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const handleToggleSound = () => {
    setIsSound(!isSound);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'pending') {
    return (
      <div className='h-14 mt-6 flex items-center justify-center'>
        <LoadingIcon className='w-8 h-8 animate-spinner' />
      </div>
    );
  }

  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className='flex flex-col items-center justify-start max-w-full w-[470px]'>
        {data?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.data.data.map((post: IPostTimeLine, index: number) => {
              if (page.data.data.length === index + 1) {
                return (
                  <PostItem
                    key={index}
                    ref={ref}
                    post={post}
                    isSound={isSound}
                    onToggleSound={handleToggleSound}
                  />
                );
              }
              return (
                <PostItem
                  key={index}
                  post={post}
                  isSound={isSound}
                  onToggleSound={handleToggleSound}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
      {isFetchingNextPage && (
        <div className='h-14 mt-6 flex items-center justify-center'>
          <LoadingIcon className='w-8 h-8 animate-spinner' />
        </div>
      )}
      {!hasNextPage && !isFetchingNextPage && (
        <div className='flex flex-col items-center justify-center w-full py-6 px-3'>
          <div className='w-24 h-24 mb-4'>
            <Image
              src={'/icons/illo-confirm-refresh-light.png'}
              width={96}
              height={96}
              className='object-fill aspect-[96/96]'
              alt=''
            />
          </div>
          <p className='text-xl font-medium text-[rgb(0,0,0)] dark:text-[rgb(245,245,245)]'>
            You&apos;ve seen all new posts
          </p>
        </div>
      )}
    </>
  );
};
