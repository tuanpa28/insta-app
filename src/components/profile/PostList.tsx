'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { HeartIcon, MessageCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Error from '@/app/error';
import { LoadingIcon } from '@/components/Icons';
import { TypeMedia } from '@/constants/enum';
import { IPost } from '@/interfaces';
import { findPostListByUser } from '@/services/postService';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type PostListProps = {
  userId: string;
};

export const PostList = ({ userId }: PostListProps) => {
  const { refresh } = useRouter();
  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['post-list-profile', { user: userId }],
    queryFn: ({ pageParam }) => findPostListByUser({ userId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.currentPage;
      const totalPage = lastPage.data.totalPage;
      const nextPage = currentPage + 1 <= totalPage ? currentPage + 1 : undefined;
      return nextPage;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

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
    return <Error reset={refresh} error={error} />;
  }

  return (
    <>
      <div className='flex flex-row flex-wrap w-full'>
        {data.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.data.data.map((post: IPost, index: number) => {
              if (page.data.data.length === index + 1) {
                return (
                  <div
                    key={index}
                    className='relative h-[300px] w-1/3 mb-1 px-0.5 overflow-hidden cursor-pointer group'
                  >
                    <Link
                      href={`${post.user?.username}`}
                      className='w-full block h-full bg-stone-300'
                    >
                      {post?.media[0].type === TypeMedia.Image ? (
                        <Image
                          width={400}
                          height={400}
                          className='block w-full h-full object-cover'
                          src={post?.media[0].url}
                          alt=''
                        />
                      ) : (
                        <video
                          muted
                          playsInline
                          className='w-full h-full object-contain overflow-clip bg-stone-300'
                        >
                          <source src={post?.media[0].url} type='video/mp4' />
                        </video>
                      )}
                    </Link>
                    <div className='hidden group-hover:flex transition-all mx-0.5 items-center justify-center gap-12 absolute inset-0 bg-[rgba(0,0,0,0.3)]'>
                      <div className='flex items-center justify-center gap-2'>
                        <HeartIcon width={24} height={24} className='text-[#fff]' />
                        <span className='font-bold text-[#fff] text-lg'>{post.likes?.length}</span>
                      </div>
                      <div className='flex items-center justify-center gap-2'>
                        <MessageCircleIcon width={24} height={24} className='text-[#fff]' />
                        <span className='font-bold text-[#fff] text-lg'>{post?.totalComments}</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className='relative flex items-center justify-center h-full max-h-[300px] w-1/3 mb-1 px-0.5 overflow-hidden cursor-pointer group'
                >
                  <Link
                    href={`${post.user?.username}`}
                    className='w-full block h-full bg-stone-300'
                  >
                    {post?.media[0].type === TypeMedia.Image ? (
                      <Image
                        width={400}
                        height={400}
                        className='block w-full h-full object-cover'
                        src={post?.media[0].url}
                        alt=''
                      />
                    ) : (
                      <video
                        muted
                        playsInline
                        className='w-full h-full object-contain overflow-clip bg-stone-300'
                      >
                        <source src={post?.media[0].url} type='video/mp4' />
                      </video>
                    )}
                  </Link>
                  <div className='hidden group-hover:flex transition-all mx-0.5 items-center justify-center gap-12 absolute inset-0 bg-[rgba(0,0,0,0.3)]'>
                    <div className='flex items-center justify-center gap-2'>
                      <HeartIcon width={24} height={24} className='text-[#fff]' />
                      <span className='font-bold text-[#fff] text-lg'>{post.likes?.length}</span>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                      <MessageCircleIcon width={24} height={24} className='text-[#fff]' />
                      <span className='font-bold text-[#fff] text-lg'>{post?.totalComments}</span>
                    </div>
                  </div>
                </div>
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
    </>
  );
};
