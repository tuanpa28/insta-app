import { DropdownMore } from '@/components/dropdown';
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
import { RootLabel, RootPath } from './enum';
import { menuItemsMore } from '@/components/common/data/dataMore';

export type NavLinkProps = {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  href?: string;
  subIcon?: React.ReactNode;
  badge?: number;
  onClick?: () => void;
  dropdown?: React.ReactNode;
};

const strokeWidth = 3;

const AvatarCustom = () => (
  <Avatar className='w-6 h-6'>
    <AvatarImage src='https://github.com/shadcn.png' />
    <AvatarFallback />
  </Avatar>
);

export const MANAGER_ROUTES: NavLinkProps[] = [
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
  },
  {
    label: RootLabel.Create,
    icon: <SquarePlusIcon />,
    activeIcon: <SquarePlusIcon strokeWidth={strokeWidth} />,
  },
  {
    label: RootLabel.Profile,
    icon: <AvatarCustom />,
    activeIcon: (
      <div className='p-[0.8px] rounded-full ring-[1.5px] ring-primary'>
        <AvatarCustom />
      </div>
    ),
    href: '/patuan.03',
  },
];

export const ROUTES_UTILS: NavLinkProps[] = [
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
];
