'use client';

import {
  AtSignIcon,
  CompassIcon,
  HeartIcon,
  HomeIcon,
  MenuIcon,
  MessageCircleMoreIcon,
  SearchIcon,
  SquareArrowOutUpRightIcon,
  SquarePlusIcon,
  VideotapeIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

import { LogoImgIcon, LogoTextIcon } from '@/components/Icons';
import Notifications from '@/components/Notifications';
import Search from '@/components/Search';
import { menuItemsMore } from '@/components/common/data/DataMore';
import { DropdownMore } from '@/components/dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLinkProps } from '@/constants/common';
import { RootLabel, RootPath } from '@/constants/enum';
import { actions, useStore } from '@/store';
import ListMenu from './ListMenu';

const Sidebar = () => {
  const [state, dispatch] = useStore();
  const { isStateSidebar } = state;

  const strokeWidth = useMemo(() => 3, []);

  const MANAGER_ROUTES: NavLinkProps[] = useMemo(
    () => [
      {
        label: RootLabel.Home,
        icon: <HomeIcon />,
        activeIcon: <HomeIcon strokeWidth={strokeWidth} />,
        href: RootPath.Home,
      },
      {
        label: RootLabel.Sreach,
        icon: <SearchIcon />,
        activeIcon: <SearchIcon strokeWidth={strokeWidth} />,
        component: <Search />,
        onClick: () => dispatch(actions.setIsStateSidebar(!isStateSidebar)),
      },
      {
        label: RootLabel.Explore,
        icon: <CompassIcon />,
        activeIcon: <CompassIcon strokeWidth={strokeWidth} />,
        href: RootPath.Explore,
      },
      {
        label: RootLabel.Reels,
        icon: <VideotapeIcon />,
        activeIcon: <VideotapeIcon strokeWidth={strokeWidth} />,
        href: RootPath.Reels,
      },
      {
        label: RootLabel.Messages,
        icon: <MessageCircleMoreIcon />,
        activeIcon: <MessageCircleMoreIcon strokeWidth={strokeWidth} />,
        href: RootPath.Inbox,
        badge: 1,
      },
      {
        label: RootLabel.Notifications,
        icon: <HeartIcon />,
        activeIcon: <HeartIcon strokeWidth={strokeWidth} />,
        component: <Notifications />,
      },
      {
        label: RootLabel.Create,
        icon: <SquarePlusIcon />,
        activeIcon: <SquarePlusIcon strokeWidth={strokeWidth} />,
      },
      {
        label: RootLabel.Profile,
        icon: (
          <Avatar className='w-6 h-6'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback />
          </Avatar>
        ),
        activeIcon: (
          <div className='p-[0.8px] rounded-full ring-[1.5px] ring-primary'>
            <Avatar className='w-6 h-6'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback />
            </Avatar>
          </div>
        ),
        href: '/patuan.03',
      },
    ],
    [strokeWidth, isStateSidebar, dispatch],
  );

  const ROUTES_UTILS: NavLinkProps[] = useMemo(
    () => [
      {
        label: RootLabel.Threads,
        icon: <AtSignIcon />,
        activeIcon: <AtSignIcon strokeWidth={strokeWidth} />,
        href: 'https://www.threads.net',
        badge: 3,
        subIcon: <SquareArrowOutUpRightIcon className='w-[18px] h-[18px]' />,
      },
      {
        label: RootLabel.More,
        icon: <MenuIcon />,
        activeIcon: <MenuIcon strokeWidth={strokeWidth} />,
        dropdown: <DropdownMore items={menuItemsMore} className='w-72 mx-4' />,
      },
    ],
    [strokeWidth],
  );

  return (
    <div className={`relative z-10 h-screen w-fit border-r border-solid border-border`}>
      <div
        className={`${
          isStateSidebar
            ? '!w-[var(--nav-narrow-width)]'
            : 'w-[var(--nav-narrow-width)] xl:w-[var(--nav-medium-width)] 3xl:w-[var(--nav-wide-width)]'
        } h-screen flex flex-col transition-[width] ease-in-out duration-300 bg-[#fff] dark:bg-darkBackground px-3 pt-2 pb-5`}
      >
        <div className={'w-full pt-6 px-3 pb-4 h-20'}>
          <Link href={'/'}>
            {isStateSidebar ? (
              <LogoImgIcon className={'mt-2'} />
            ) : (
              <LogoTextIcon className={'mt-2'} />
            )}
          </Link>
        </div>
        <div className='flex flex-col justify-between h-full'>
          <div className='py-4 w-full'>
            <ListMenu items={MANAGER_ROUTES} />
          </div>

          <div className='w-full'>
            <ListMenu items={ROUTES_UTILS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
