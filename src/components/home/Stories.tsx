import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Stories = () => {
  return (
    <div className='snap-start w-full outline-none mb-4 sm:mb-1 pt-[50px] sm:pt-[64px] md:pt-6 pb-2 rounded-lg border-b border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)] sm:border-none'>
      <div className='flex flex-row items-center justify-start overflow-x-auto stories-scrollbar'>
        {new Array(6).fill(0).map((_, i) => (
          <div key={i} className='w-20 h-full px-1'>
            <Link
              href={'#'}
              className='flex flex-col items-center mx-auto cursor-pointer w-[62px] '
            >
              <div
                className={`relative mt-1 mb-2 ${
                  i % 2
                    ? 'after:bg-linearGradientAvatar'
                    : 'after:bg-[rgb(228,228,228)] dark:after:bg-[rgb(168,168,168)]'
                } after:content-[""] after:block after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-16 after:w-16 after:z-[-2] after:rounded-full before:content-[""] before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-[60px] before:w-[60px] before:z-[-1] before:rounded-full before:bg-white dark:before:bg-[rgb(0,0,0)]`}
              >
                <span className='block w-14 h-14 overflow-hidden rounded-full'>
                  <Avatar className='w-full h-full object-cover'>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback />
                  </Avatar>
                </span>
              </div>
              <span
                className={`text-primary text-xs font-medium block px-0.5 max-w-[74px] truncate text-center ${
                  i % 2 ? 'dark:text-[rgb(245,245,245)]' : 'dark:text-[rgb(168,168,168)]'
                }`}
              >
                tuanpa.03
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
