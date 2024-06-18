'use client';

import { useMutation } from '@tanstack/react-query';
import {
  BookmarkIcon,
  LogOut,
  MessageSquareWarningIcon,
  MoonIcon,
  RefreshCcwIcon,
  SettingsIcon,
  SquareActivityIcon,
  SunIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { RootPath } from '@/constants/enum';
import { CompType } from '@/interfaces';
import { logOut } from '@/services/authService';
import { actions, useStore } from '@/store';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  switchTheme?: boolean;
  onClick?: () => void;
}

interface MenuGroup {
  group: MenuItem[];
}

interface MenuSeparator {
  separator: boolean;
  size?: 'small' | 'large';
}

type MenuItemMore = MenuGroup | MenuSeparator;

interface IDropdownMore {
  className?: string;
}

const DropdownMore = ({ className }: IDropdownMore) => {
  const { theme, setTheme } = useTheme();
  const [isCheck, setIsCheck] = useState(() => theme === 'dark');
  const [, dispatch] = useStore();
  const { push } = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      toast.success('Đăng xuất thành công!');
      push(RootPath.SignIn);
    },
    onError: (error) => {
      console.log('error:', error);
      toast.error(error.message || 'Đăng xuất thất bại!');
    },
  });

  const handlerChangeTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light');
      setIsCheck(false);
    } else {
      setTheme('dark');
      setIsCheck(true);
    }
  }, [theme, setTheme]);

  const menuItemsMore: MenuItemMore[] = useMemo(
    () => [
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
            onClick: handlerChangeTheme,
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
            onClick: async () => {
              dispatch(actions.logOut());
              await mutateAsync();
            },
          },
        ],
      },
    ],
    [dispatch, mutateAsync, handlerChangeTheme],
  );

  return (
    <DropdownMenuContent
      className={`w-60 rounded-2xl dark:bg-[rgba(26,26,26,1)] dark:border-transparent ${className}`}
    >
      {menuItemsMore?.map((item, i) =>
        'separator' in item ? (
          <DropdownMenuSeparator
            key={i}
            className={`bg-stone-100 dark:bg-[rgba(41,41,41,1)] ${
              item.size === 'large' ? 'h-1' : 'h-0.5'
            }`}
          />
        ) : (
          <DropdownMenuGroup key={i} className='p-1'>
            {item.group.map(({ icon, label, href, switchTheme, ...passProps }, subIndex) => {
              const Comp: CompType = href ? Link : 'div';
              const props = {
                ...(href && { href }),
                ...passProps,
              };

              return (
                <Comp
                  key={subIndex}
                  {...props}
                  className='hover:cursor-pointer hover:bg-stone-200 dark:hover:bg-[#292929] p-4 rounded-lg flex items-center justify-between w-full dark:text-[rgb(245,245,245)]'
                >
                  <div className='flex items-center'>
                    <span className='mr-3'>
                      {switchTheme ? (
                        theme === 'dark' ? (
                          <MoonIcon className='w-[18px] h-[18px]' />
                        ) : (
                          icon
                        )
                      ) : (
                        icon
                      )}
                    </span>
                    <span className='text-sm font-normal'>{label}</span>
                  </div>
                  {switchTheme && <Switch checked={isCheck} className='dark:bg-[#f8f9f93]' />}
                </Comp>
              );
            })}
          </DropdownMenuGroup>
        ),
      )}
    </DropdownMenuContent>
  );
};

export default DropdownMore;
