'use client';

import { NavLinkProps } from '@/constants/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type CompType = any | string;

type IMenuItem = {
  item: NavLinkProps;
};

const MenuItem = ({ item }: IMenuItem) => {
  const pathName = usePathname();

  const isActive = pathName === item.href;

  const Comp: CompType = item.href ? Link : 'button';
  const props = { ...item, ...(item.href && { href: item.href }) };

  return (
    <li>
      <Comp
        {...props}
        className='relative flex items-center text-left my-[2px] p-3 w-full text-primary rounded-lg dark:text-white hover:!bg-stone-200 dark:hover:bg-gray-700 group'
      >
        <span className='group-hover:scale-110 group-active:scale-90 transition-transform'>
          {isActive ? item.activeIcon : item.icon}
        </span>
        <span className={`flex-1 ms-4 whitespace-nowrap ${isActive && 'font-black'}`}>
          {item.label}
        </span>
        {item.badge && (
          <span className='absolute top-2 left-[24px] bg-[#fff] flex items-center justify-center w-[10px] h-[10px] p-[10px] rounded-full'>
            <span className='text-[#fff] bg-red-500 text-xs font-normal flex items-center justify-center w-[8px] h-[8px] p-[8px] rounded-full'>
              {item.badge}
            </span>
          </span>
        )}
        {item.subIcon && (
          <div className='text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity'>
            {item.subIcon}
          </div>
        )}
      </Comp>
    </li>
  );
};

export default MenuItem;
