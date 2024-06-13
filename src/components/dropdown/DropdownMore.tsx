'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';

import { MenuItemMore } from '@/components/common/data/DataMore';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { CompType } from '@/interfaces';
import { MoonIcon } from 'lucide-react';
import { useState } from 'react';

interface IDropdownMore {
  className?: string;
  items: MenuItemMore[];
}

const DropdownMore = ({ className, items }: IDropdownMore) => {
  const { theme, setTheme } = useTheme();
  const [isCheck, setIsCheck] = useState(() => theme === 'dark');

  const handlerChangeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      setIsCheck(false);
    } else {
      setTheme('dark');
      setIsCheck(true);
    }
  };

  return (
    <DropdownMenuContent
      className={`w-60 rounded-2xl dark:bg-[rgba(26,26,26,1)] dark:border-transparent ${className}`}
    >
      {items?.map((item, i) =>
        'separator' in item ? (
          <DropdownMenuSeparator
            key={i}
            className={`bg-stone-100 dark:bg-[rgba(41,41,41,1)] ${
              item.size === 'large' ? 'h-1' : 'h-0.5'
            }`}
          />
        ) : (
          <DropdownMenuGroup key={i} className='p-1'>
            {item.group.map(({ icon, label, href, switchTheme }, subIndex) => {
              const Comp: CompType = href ? Link : 'div';
              const props = {
                ...(href && { href }),
                ...(switchTheme && { onClick: handlerChangeTheme }),
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
