'use client';

import { LoadingIcon } from '@/components/Icons';
import PostItem from '@/components/PostItem';
import { IPostTimeLine } from '@/interfaces';
import { useState } from 'react';

const data: IPostTimeLine[] = [
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
];

const PostsTimeLine = () => {
  const [volume, setVolume] = useState<boolean>(false);
  // const { isLoading, error, data: posts } = useGetPostTimeLine();

  // if (error) return JSON.stringify(error);

  const toggleVolume = () => setVolume(!volume);

  return (
    <>
      <div className='flex flex-col items-center justify-start max-w-full w-[470px]'>
        {data.map((post: IPostTimeLine, i) => {
          return <PostItem key={i} post={post} isVolume={volume} onToggleVolume={toggleVolume} />;
        })}
      </div>
      <div className='h-14 mt-6 flex items-center justify-center'>
        <LoadingIcon className='w-8 h-8 animate-spinner' />
      </div>
    </>
  );
};

export default PostsTimeLine;
