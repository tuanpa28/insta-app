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

export const SidebarMobile = () => {
  const pathName = usePathname();

  return (
    <div className='block md:hidden h-fit w-full bg-white fixed bottom-0 left-0 right-0 z-10'>
      <div className='flex items-center justify-around sm:px-4 h-[50px] border-t border-solid border-[rgb(219,219,219)]'>
        <div className='p-3'>
          <Link href={RootPath.Home}>
            {pathName === RootPath.Home ? <HomeIcon strokeWidth={3} /> : <HomeIcon />}
          </Link>
        </div>
        <div className='p-3'>
          <Link href={RootPath.Explore}>
            {pathName === RootPath.Explore ? <CompassIcon strokeWidth={3} /> : <CompassIcon />}
          </Link>
        </div>
        <div className='p-3'>
          <Link href={RootPath.Reels}>
            {pathName === RootPath.Reels ? <VideotapeIcon strokeWidth={3} /> : <VideotapeIcon />}
          </Link>
        </div>
        <div className='p-3'>
          <SquarePlusIcon />
        </div>
        <div className='p-3'>
          <Link href={RootPath.Inbox}>
            {pathName === RootPath.Inbox ? (
              <MessageCircleMoreIcon strokeWidth={3} />
            ) : (
              <MessageCircleMoreIcon />
            )}
          </Link>
        </div>
        <div className='p-3'>
          <Link href={'/patuan.03'}>
            <div
              className={`p-[1px] rounded-full ${
                pathName === '/patuan.03' && 'ring-[1.5px] ring-primary'
              }`}
            >
              <Avatar className='w-6 h-6'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback />
              </Avatar>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
