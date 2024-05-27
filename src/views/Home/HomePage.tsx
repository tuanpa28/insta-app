'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';

import { LoadingIcon } from '@/components/Icons';
import PostItem from '@/components/PostItem';
import SidebarFeed from '@/components/SidebarFeed';
import { useGetPostTimeLine } from '@/hooks';
import { IPost } from '@/interfaces';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const HomePage = () => {
  const [volume, setVolume] = useState<boolean>(false);
  const { isLoading, error, data: posts } = useGetPostTimeLine();

  if (error) return JSON.stringify(error);

  const handlerVolumeVideo = () => {
    setVolume(!volume);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('home-body')}>
        <div className={cx('head')}>
          <div className={cx('list-user-storie')}>
            {/* item */}
            <div className={cx('user-storie-item')}>
              <button className={cx('btn')}>
                <div className={cx('avatar')}>
                  <span className={cx('img')}>
                    <Image width={300} height={300} src='https://picsum.photos/300/300' alt='' />
                  </span>
                </div>
                <span className={cx('username')}>tuanpa.03</span>
              </button>
            </div>
            {/* item */}
            <div className={cx('user-storie-item')}>
              <button className={cx('btn')}>
                <div className={cx('avatar')}>
                  <span className={cx('img')}>
                    <Image width={300} height={300} src='https://picsum.photos/300/300' alt='' />
                  </span>
                </div>
                <span className={cx('username')}>tuanpa.03</span>
              </button>
            </div>
            {/* item */}
            <div className={cx('user-storie-item')}>
              <button className={cx('btn')}>
                <div className={cx('avatar')}>
                  <span className={cx('img')}>
                    <Image width={300} height={300} src='https://picsum.photos/300/300' alt='' />
                  </span>
                </div>
                <span className={cx('username')}>tuanpa.03</span>
              </button>
            </div>
            {/* item */}
            <div className={cx('user-storie-item')}>
              <button className={cx('btn')}>
                <div className={cx('avatar')}>
                  <span className={cx('img')}>
                    <Image width={300} height={300} src='https://picsum.photos/300/300' alt='' />
                  </span>
                </div>
                <span className={cx('username')}>tuanpa.03</span>
              </button>
            </div>
            {/* item */}
            <div className={cx('user-storie-item')}>
              <button className={cx('btn')}>
                <div className={cx('avatar')}>
                  <span className={cx('img')}>
                    <Image width={300} height={300} src='https://picsum.photos/300/300' alt='' />
                  </span>
                </div>
                <span className={cx('username')}>tuanpa.03</span>
              </button>
            </div>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('list-post')}>
            {posts?.map((post: IPost, index: number) => (
              <PostItem
                key={index}
                post={post}
                isVolume={volume}
                onHandlerVolume={handlerVolumeVideo}
              />
            ))}
          </div>
          {isLoading && (
            <div className={cx('loading')}>
              <LoadingIcon className={cx('icon')} />
            </div>
          )}
        </div>
      </div>
      <SidebarFeed />
    </div>
  );
};

export default HomePage;
