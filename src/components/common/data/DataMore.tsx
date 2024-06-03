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
  Icon: React.ReactNode;
  text: string;
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
        Icon: <SettingsIcon className='mr-3 h-[18px] w-[18px]' />,
        text: 'Settings',
      },
      {
        Icon: <SquareActivityIcon className='mr-3 h-[18px] w-[18px]' />,
        text: 'Your activity',
      },
      {
        Icon: <BookmarkIcon className='mr-3 h-[18px] w-[18px]' />,
        text: 'Saved',
      },
      {
        Icon: <SunIcon className='mr-3 h-[18px] w-[18px]' />,
        text: 'Switch appearance',
      },
      {
        Icon: <MessageSquareWarningIcon className='mr-3 h-[18px] w-[18px]' />,
        text: 'Report a problem',
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
        Icon: <RefreshCcwIcon className='mr-3 h-[18px] w-[18px]' />,
        text: 'Switch accounts',
      },
    ],
  },
  {
    separator: true,
  },
  {
    group: [
      {
        Icon: <LogOut className='mr-3 h-[18px] w-[18px]' />,
        text: 'Log out',
      },
    ],
  },
];
