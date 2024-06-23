'use client';

import {
  CompassIcon,
  HomeIcon,
  MessageCircleMoreIcon,
  SquarePlusIcon,
  VideotapeIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RootPath } from '@/constants/enum';
import { useStore } from '@/store';

export const MenuMobile = () => {
  const [state] = useStore();
  const pathName = usePathname();

  return (
    <div className='block md:hidden h-fit w-full bg-white dark:bg-[rgb(0,0,0)] fixed bottom-0 left-0 right-0 z-10'>
      <div className='flex items-center justify-around sm:px-4 h-[50px] border-t border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
        <div className='p-3 dark:text-[rgb(245,245,245)]'>
          <Link href={RootPath.Home}>
            {pathName === RootPath.Home ? <HomeIcon strokeWidth={3} /> : <HomeIcon />}
          </Link>
        </div>
        <div className='p-3 dark:text-[rgb(245,245,245)]'>
          <Link href={RootPath.Explore}>
            {pathName === RootPath.Explore ? <CompassIcon strokeWidth={3} /> : <CompassIcon />}
          </Link>
        </div>
        <div className='p-3 dark:text-[rgb(245,245,245)]'>
          <Link href={RootPath.Reels}>
            {pathName === RootPath.Reels ? <VideotapeIcon strokeWidth={3} /> : <VideotapeIcon />}
          </Link>
        </div>
        <div className='p-3 dark:text-[rgb(245,245,245)]'>
          <SquarePlusIcon />
        </div>
        <div className='p-3 relative dark:text-[rgb(245,245,245)]'>
          <Link href={RootPath.Inbox}>
            {pathName === RootPath.Inbox ? (
              <MessageCircleMoreIcon strokeWidth={3} />
            ) : (
              <MessageCircleMoreIcon />
            )}
          </Link>
          <span className='absolute top-2 left-[24px] bg-[#fff] dark:bg-[rgb(0,0,0)] flex items-center justify-center w-[10px] h-[10px] p-[10px] rounded-full'>
            <span className='text-[#fff] bg-red-500 text-xs font-normal flex items-center justify-center w-[8px] h-[8px] p-[8px] rounded-full'>
              2
            </span>
          </span>
        </div>
        <div className='p-3'>
          <Link href={'/patuan.03'}>
            <div
              className={`p-[1px] rounded-full ${
                pathName === '/patuan.03' && 'ring-[1.5px] ring-primary'
              }`}
            >
              <Avatar className='w-6 h-6'>
                <AvatarImage src={state.user?.profile_image} />
                <AvatarFallback />
              </Avatar>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
