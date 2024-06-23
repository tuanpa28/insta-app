'use client';

import { useQuery } from '@tanstack/react-query';
import { LoaderCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

import AccountItem from '@/components/AccountItem';
import { IUser } from '@/interfaces';
import { userService } from '@/services';
import { getUsersSuggested } from '@/services/userService';
import { actions, useStore } from '@/store';

export const SidebarFeed = () => {
  const [isLoadingFollowUser, setIsLoadingFollowUser] = useState<boolean>(false);
  const [state, dispatch] = useStore();

  const { data } = useQuery({
    queryKey: ['suggested-people', { currentUser: state.user?.username }],
    queryFn: () => getUsersSuggested({ limit: 5 }),
    staleTime: 60 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const handleFollowUser = async (user: IUser) => {
    setIsLoadingFollowUser(true);
    try {
      await userService.followUser(user._id);
      dispatch(actions.toggleFollowingUser(user._id));
      if (state.user && user.followers) {
        const index = user.followers.indexOf(state.user?._id);
        if (index !== -1) {
          user.followers.splice(index, 1);
        } else {
          user.followers.push(state.user?._id);
        }
      }
    } catch (error) {
      toast.error('Theo dõi người dùng thất bại! vui lòng thử lại sau!');
    } finally {
      setIsLoadingFollowUser(false);
    }
  };

  return (
    <div className='hidden lg:flex flex-col w-[var(--feed-sidebar-width)] mt-9 pl-10'>
      <div>
        {state.user && (
          <AccountItem
            user={state.user}
            description={state.user.full_name}
            hasTippy={false}
            btn={'Switch'}
          />
        )}
      </div>
      <div className='my-4'>
        <div className='flex items-center justify-between ml-1 px-6'>
          <span className='text-sm font-bold text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)]'>
            Suggested for you
          </span>
          <Link
            href={'/explore/people'}
            className='text-xs font-bold text-[#000] dark:text-[rgb(245,245,245)] hover:opacity-60'
          >
            See All
          </Link>
        </div>
        <div className='ml-1 mb-1 flex flex-col py-2'>
          {data?.data?.data.map((user: IUser, i: number) => (
            <AccountItem
              key={i}
              user={user}
              description={'Suggested for you'}
              btn={
                isLoadingFollowUser ? (
                  <LoaderCircleIcon
                    width={16}
                    height={16}
                    className='animate-spinner text-[rgb(16,16,16)] dark:text-[rgb(245,245,245)]'
                  />
                ) : state.user?.followings && state.user?.followings.includes(user?._id) ? (
                  'Following'
                ) : (
                  'Follow'
                )
              }
              classNameBtn={
                state.user?.followings && state.user?.followings.includes(user?._id)
                  ? '!text-[#000] !dark:text-[rgb(245,245,245)] hover:!opacity-60'
                  : ''
              }
              onClickBtn={() => !isLoadingFollowUser && handleFollowUser(user)}
            />
          ))}
        </div>
      </div>
      <div className='px-6 ml-1 mb-2'>
        <ul className='flex flex-wrap mb-4'>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>About</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Help</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Press</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>API</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Jobs</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Privacy</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Terms</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Locations</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Language</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Meta Verified</Link>
          </li>
        </ul>
        <span className='uppercase text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
          © 2024 Social Network
        </span>
      </div>
    </div>
  );
};
