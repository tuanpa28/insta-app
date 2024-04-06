'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

import AccountItem from '@/components/AccountItem';
import Button from '@/components/Button';
import { MessageIcon, UserPlusIcon } from '@/components/Icons';
import { IMedia, IPost, IUser } from '@/interfaces';
import { useAppSelector } from '@/store/hook';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

interface IAccountPreview {
  user: IUser;
  postsUser: IPost[];
}

const AccountPreview = ({ user, postsUser }: IAccountPreview) => {
  const authUser = useAppSelector((state) => state.user.currentUser.values);
  const medias = postsUser?.map((post: IPost) => post.media).flat();
  const imageUrls = medias
    ?.filter((media: IMedia) => media.type === 'image')
    .slice(-3)
    .map((media: IMedia) => media.url);

  const followed = authUser?.followings?.includes(user?._id) || authUser?._id === user?._id;

  return (
    <div className={cx('wrapper')}>
      <AccountItem className={cx('head')} avatarLarge nameLarge user={user} />
      <div className={cx('analytics')}>
        <div className={cx('item')}>
          <span className={cx('value')}>{postsUser?.length || 0}</span>
          <span className={cx('label')}>posts</span>
        </div>
        <div className={cx('item')}>
          <span className={cx('value')}>{user?.followers?.length}</span>
          <span className={cx('label')}>followers</span>
        </div>
        <div className={cx('item')}>
          <span className={cx('value')}>{user?.followings?.length}</span>
          <span className={cx('label')}>following</span>
        </div>
      </div>
      {postsUser?.length > 0 ? (
        <div className={cx('images')}>
          {imageUrls?.map((url: string, i: number) => (
            <Link key={i} href={'/'}>
              <Image src={url} className={cx('img-item')} alt='' />
            </Link>
          ))}
        </div>
      ) : (
        <div className={cx('no-images')}>
          <i className={cx('icon-camera')}></i>
          <span className={cx('title')}>No posts yet</span>
          <span className={cx('desc')}>
            When {user.username} shares photos and reels, you&apos;ll see them here.
          </span>
        </div>
      )}
      <div className={cx('wrapper-btn')}>
        {followed && (
          <Button className={cx('btn-follow')} icon={<MessageIcon className={cx('icon')} />}>
            Message
          </Button>
        )}
        {followed && <Button className={cx('btn-following')}>Following</Button>}
        {!followed && (
          <Button className={cx('btn-follow')} icon={<UserPlusIcon />}>
            Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountPreview;
