import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

export type NavLinkProps = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  subIcon?: React.ReactNode;
  badge?: number;
  [key: string]: any;
};

export const MANAGER_ROUTES: NavLinkProps[] = [
  {
    title: 'Home',
    icon: <HomeIcon className='group-hover:scale-110 transition-transform' strokeWidth={3} />,
    href: '/',
  },
  {
    title: 'Sreach',
    icon: <SearchIcon className='group-hover:scale-110 transition-transform' />,
  },
  {
    title: 'Explore',
    icon: <CompassIcon className='group-hover:scale-110 transition-transform' />,
    href: '/explore',
  },
  {
    title: 'Reels',
    icon: <VideotapeIcon className='group-hover:scale-110 transition-transform' />,
    href: '/reels',
  },
  {
    title: 'Messages',
    icon: <MessageCircleMoreIcon className='group-hover:scale-110 transition-transform' />,
    href: '/inbox',
    badge: 1,
  },
  {
    title: 'Notifications',
    icon: <HeartIcon className='group-hover:scale-110 transition-transform' />,
  },
  {
    title: 'Create',
    icon: <SquarePlusIcon className='group-hover:scale-110 transition-transform' />,
  },
  {
    title: 'Profile',
    icon: (
      <Avatar className='w-6 h-6 group-hover:scale-110 transition-transform'>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
  },
];

export const ROUTES_UTILS: NavLinkProps[] = [
  {
    title: 'Threads',
    icon: <AtSignIcon className='group-hover:scale-110 transition-transform' />,
    href: 'https://www.threads.net',
    badge: 3,
    subIcon: <SquareArrowOutUpRightIcon className='w-[18px] h-[18px]' />,
  },
  {
    title: 'More',
    icon: <MenuIcon className='group-hover:scale-110 transition-transform' />,
  },
];
