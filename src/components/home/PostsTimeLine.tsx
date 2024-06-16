'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { LoadingIcon } from '@/components/Icons';
import PostItem from '@/components/PostItem';
import { IPostTimeLine } from '@/interfaces';

const dataFake: IPostTimeLine[] = [
  {
    _id: '1',
    user: {
      _id: '2',
      username: 'tuanpa.03',
      email: 'tuanpa.03@gmail.com',
      full_name: 'Pham Anh Tuan',
      profile_image: '',
      followers: [],
      followings: [],
    },
    caption: 'caption',
    media: [
      { type: 'image', url: 'https://picsum.photos/200/300' },
      { type: 'image', url: 'https://picsum.photos/200/300' },
      { type: 'image', url: 'https://picsum.photos/200/300' },
    ],
    likes: [],
    shares: [],
    slug: 'caption_slug',
    createdAt: new Date().toString(),
  },
  {
    _id: '2',
    user: {
      _id: '2',
      username: 'tuanpa.03',
      email: 'tuanpa.03@gmail.com',
      full_name: 'Pham Anh Tuan',
      followers: [],
      followings: [],
    },
    caption: 'caption 2',
    media: [
      {
        type: 'video',
        url: 'https://res.cloudinary.com/dugodumc5/video/upload/v1718160418/InstaApp/qbwuc5tkbl3cjtvzo9eg.mov',
      },
    ],
    likes: [],
    shares: [],
    slug: 'caption_2_slug',
    createdAt: new Date().toString(),
  },
  {
    _id: '3',
    user: {
      _id: '2',
      username: 'tuanpa.03',
      email: 'tuanpa.03@gmail.com',
      full_name: 'Pham Anh Tuan',
      followers: [],
      followings: [],
    },
    caption: 'caption 2',
    media: [
      {
        type: 'video',
        url: 'https://res.cloudinary.com/dugodumc5/video/upload/v1718422558/InstaApp/Snaptik_app__1718422598_.mp4',
      },
    ],
    likes: [],
    shares: [],
    slug: 'caption_2_slug',
    createdAt: new Date().toString(),
  },
  {
    _id: '4',
    user: {
      _id: '2',
      username: 'tuanpa.03',
      email: 'tuanpa.03@gmail.com',
      full_name: 'Pham Anh Tuan',
      followers: [],
      followings: [],
    },
    caption: 'caption 2',
    media: [
      {
        type: 'video',
        url: 'https://res.cloudinary.com/dugodumc5/video/upload/v1718422647/InstaApp/Snaptik_app__1718422683_.mp4',
      },
    ],
    likes: [],
    shares: [],
    slug: 'caption_2_slug',
    createdAt: new Date().toString(),
  },
  {
    _id: '5',
    user: {
      _id: '2',
      username: 'tuanpa.03',
      email: 'tuanpa.03@gmail.com',
      full_name: 'Pham Anh Tuan',
      followers: [],
      followings: [],
    },
    caption: 'caption 2',
    media: [
      {
        type: 'video',
        url: 'https://res.cloudinary.com/dugodumc5/video/upload/v1718423251/InstaApp/Snaptik_app__1718423251_.mp4',
      },
    ],
    likes: [],
    shares: [],
    slug: 'caption_2_slug',
    createdAt: new Date().toString(),
  },
  {
    _id: '6',
    user: {
      _id: '2',
      username: 'tuanpa.03',
      email: 'tuanpa.03@gmail.com',
      full_name: 'Pham Anh Tuan',
      followers: [],
      followings: [],
    },
    caption: 'caption 2',
    media: [
      {
        type: 'video',
        url: 'https://res.cloudinary.com/dugodumc5/video/upload/v1718431348/InstaApp/hh655hsjorjr0icsbfr5.mp4',
      },
    ],
    likes: [],
    shares: [],
    slug: 'caption_2_slug',
    createdAt: new Date().toString(),
  },
];

export const PostsTimeLine = () => {
  const [volume, setVolume] = useState<boolean>(false);

  const [data, setData] = useState<IPostTimeLine[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  // const { isLoading, error, data: posts } = useGetPostTimeLine();

  // if (error) return JSON.stringify(error);

  const toggleVolume = () => setVolume(!volume);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setData((prevData) => [...prevData, ...dataFake]);

        if (page >= 4) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      fetchData();
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isLoading, fetchData]);

  return (
    <>
      <div className='flex flex-col items-center justify-start max-w-full w-[470px]'>
        {data.map((post: IPostTimeLine, i) => {
          return <PostItem key={i} post={post} isVolume={volume} onToggleVolume={toggleVolume} />;
        })}
      </div>
      {hasMore && (
        <div ref={ref} className='h-14 mt-6 flex items-center justify-center'>
          <LoadingIcon className='w-8 h-8 animate-spinner' />
        </div>
      )}
    </>
  );
};
