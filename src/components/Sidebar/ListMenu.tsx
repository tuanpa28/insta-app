import Link from 'next/link';

import { NavLinkProps } from '@/constants/routes';

const ListMenu = ({ items }: { items: NavLinkProps[] }) => {
  return (
    <ul className='space-y-2 font-medium'>
      {items.map(({ title, icon, badge, subIcon, href, ...passProps }, i) => {
        let Comp: any | string = 'button';
        const props = { ...passProps };
        if (href) {
          props.href = href;
          Comp = Link;
        }

        return (
          <li key={i}>
            <Comp
              {...props}
              className='relative flex items-center text-left my-[2px] p-3 w-full text-primary rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
            >
              {icon}
              <span className='flex-1 ms-4 whitespace-nowrap'>{title}</span>
              {badge && (
                <span className='absolute top-2 left-[24px] bg-[#fff] flex items-center justify-center w-[10px] h-[10px] p-[10px] rounded-full'>
                  <span className='text-[#fff] bg-red-500 text-xs font-normal flex items-center justify-center w-[8px] h-[8px] p-[8px] rounded-full'>
                    {badge}
                  </span>
                </span>
              )}
              {subIcon && (
                <div className='text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity'>
                  {subIcon}
                </div>
              )}
            </Comp>
          </li>
        );
      })}
    </ul>
  );
};

export default ListMenu;
