'use client';

import { LoaderCircleIcon, MessageCircleMoreIcon, UserPlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IUser } from '@/interfaces';
import { userService } from '@/services';
import { actions, useStore } from '@/store';
import { toast } from 'react-toastify';

interface IAccountPreview {
  user: IUser;
}

const AccountPreview = ({ user }: IAccountPreview) => {
  const [isLoadingFollowUser, setIsLoadingFollowUser] = useState<boolean>(false);
  const [state, dispatch] = useStore();

  const handleFollowUser = async (userId: string) => {
    setIsLoadingFollowUser(true);
    try {
      await userService.followUser(userId);
      dispatch(actions.toggleFollowingUser(userId));
    } catch (error) {
      toast.error('Theo dõi người dùng thất bại! vui lòng thử lại sau!');
    } finally {
      setIsLoadingFollowUser(false);
    }
  };

  return (
    <div className='flex flex-col w-[366px] py-4'>
      <div className='px-4 flex flex-row items-center justify-start gap-x-4 mb-4'>
        <div className='cursor-pointer w-14 h-14 relative z-[1] after:bg-linearGradientAvatar after:content-[""] after:block after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-[64px] after:w-[64px] after:z-[-2] after:rounded-full before:content-[""] before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-[60px] before:w-[60px] before:z-[-1] before:rounded-full before:bg-white dark:before:bg-[rgb(0,0,0)]'>
          <Avatar className='w-full h-full object-cover'>
            <AvatarImage src={user.profile_image} />
            <AvatarFallback />
          </Avatar>
        </div>
        <div className='flex flex-col justify-center'>
          <Link href={`/${user.username}`}>
            <span className='text-base font-bold text-primary leading-5 dark:text-[rgb(245,245,245)]'>
              {user.username}
            </span>
          </Link>
          <span className='text-sm font-normal text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)] leading-[18px] mt-0.5'>
            {user.full_name}
          </span>
        </div>
      </div>
      <div className='grid items-center grid-cols-3 gap-x-1 mb-4'>
        <div className='mx-2 flex flex-col text-center text-sm dark:text-[rgb(245,245,245)]'>
          <span className='font-extrabold leading-[18px]'>{user?.totalPosts}</span>
          <span className='font-medium'>posts</span>
        </div>
        <div className='mx-2 flex flex-col text-center text-sm dark:text-[rgb(245,245,245)]'>
          <span className='font-extrabold leading-[18px]'>{user?.followers?.length}</span>
          <span className='font-medium'>followers</span>
        </div>
        <div className='mx-2 flex flex-col text-center text-sm dark:text-[rgb(245,245,245)]'>
          <span className='font-extrabold leading-[18px]'>{user?.followings?.length}</span>
          <span className='font-medium'>following</span>
        </div>
      </div>
      {user.recentImages && user.recentImages?.length > 0 ? (
        <div className='grid items-center grid-cols-3 gap-x-1 mb-4'>
          {user.recentImages.map((img: string, i) => (
            <Link key={i} href={'/'}>
              <Image
                width={300}
                height={300}
                src={img}
                className='w-[120px] h-[120px] aspect-[120/120]'
                alt=''
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center gap-2 p-4 pb-2 mb-4 border-y border-solid border-[rgb(219,219,219)] dark:border-[rgb(38,38,38)]'>
          <i className='w-12 h-12 inline-block bg-[url("/icons/icons.png")] bg-no-repeat bg-[length:98px_198px] bg-[0_-98px]'></i>
          <span className='text-sm font-bold text-primary dark:text-[rgb(245,245,245)]'>
            No posts yet
          </span>
          <span className='text-sm font-medium text-center text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)]'>
            When {user.username} shares photos, you&apos;ll see them here.
          </span>
        </div>
      )}

      <div className='flex items-center justify-center gap-2 px-4'>
        {(state.user?.followings && state.user?.followings.includes(user?._id)) ||
        state.user?._id === user?._id ? (
          <>
            <Button
              size={'sm'}
              className='w-full bg-[rgb(0,149,246)] text-[rgb(255,255,255)] font-semibold text-sm hover:bg-[rgb(24,119,242)] rounded-lg active:opacity-70'
            >
              <MessageCircleMoreIcon width={20} height={20} className='mr-1.5' />
              Message
            </Button>
            <Button
              size={'sm'}
              className='w-full bg-[rgb(239,239,239)] dark:bg-[rgb(54,54,54)] dark:hover:bg-[rgb(38,38,38)] text-primary dark:text-[rgb(245,245,245)] font-semibold text-sm hover:bg-[rgb(219,219,219)] rounded-lg active:opacity-70'
            >
              Following
            </Button>
          </>
        ) : (
          <Button
            disabled={isLoadingFollowUser}
            onClick={() => !isLoadingFollowUser && handleFollowUser(user?._id)}
            size={'sm'}
            className={`w-full bg-[rgb(0,149,246)] text-[rgb(255,255,255)] font-semibold text-sm hover:bg-[rgb(24,119,242)] rounded-lg ${
              isLoadingFollowUser ? '!cursor-default bg-[rgb(24,119,242)]' : ''
            }`}
          >
            {isLoadingFollowUser ? (
              <LoaderCircleIcon
                width={20}
                height={20}
                className='animate-spinner text-[rgb(16,16,16)] dark:text-[rgb(245,245,245)]'
              />
            ) : (
              <>
                <UserPlusIcon width={20} height={20} className='mr-1.5' />
                Follow
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountPreview;
