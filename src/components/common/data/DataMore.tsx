import { RootPath } from '@/constants/enum';
import {
  BookmarkIcon,
  LogOut,
  MessageSquareWarningIcon,
  RefreshCcwIcon,
  SettingsIcon,
  SquareActivityIcon,
  SunIcon,
} from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  switchTheme?: boolean;
}

interface MenuGroup {
  group: MenuItem[];
}

interface MenuSeparator {
  separator: boolean;
  size?: 'small' | 'large';
}

export type MenuItemMore = MenuGroup | MenuSeparator;

export const menuItemsMore: MenuItemMore[] = [
  {
    group: [
      {
        icon: <SettingsIcon className='w-[18px] h-[18px]' />,
        label: 'Settings',
        href: RootPath.Settings,
      },
      {
        icon: <SquareActivityIcon className='w-[18px] h-[18px]' />,
        label: 'Your activity',
        href: RootPath.YourActivity,
      },
      {
        icon: <BookmarkIcon className='w-[18px] h-[18px]' />,
        label: 'Saved',
        href: RootPath.Saved,
      },
      {
        icon: <SunIcon className='w-[18px] h-[18px]' />,
        label: 'Switch appearance',
        switchTheme: true,
      },
      {
        icon: <MessageSquareWarningIcon className='w-[18px] h-[18px]' />,
        label: 'Report a problem',
      },
    ],
  },
  {
    separator: true,
    size: 'large',
  },
  {
    group: [
      {
        icon: <RefreshCcwIcon className='w-[18px] h-[18px]' />,
        label: 'Switch accounts',
      },
    ],
  },
  {
    separator: true,
  },
  {
    group: [
      {
        icon: <LogOut className='w-[18px] h-[18px]' />,
        label: 'Log out',
      },
    ],
  },
];
