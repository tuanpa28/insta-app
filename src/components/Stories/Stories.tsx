import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Stories = () => {
  return (
    <div className='w-full outline-none mb-6 py-2 rounded-lg '>
      <div className='flex flex-row items-center justify-start'>
        {new Array(4).fill(0).map((_, i) => (
          <div key={i} className='w-20 h-full px-1'>
            <Link
              href={'#'}
              className='flex flex-col items-center mx-auto cursor-pointer w-[62px] '
            >
              <div
                className={`relative mt-1 mb-2 ${
                  i % 2 ? 'after:bg-linearGradientAvatar' : 'after:bg-[rgb(228,228,228)]'
                } after:content-[""] after:block after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-16 after:w-16 after:z-[-2] after:rounded-full before:content-[""] before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-[60px] before:w-[60px] before:z-[-1] before:rounded-full before:bg-white`}
              >
                <span className='block w-14 h-14 overflow-hidden rounded-full'>
                  <Avatar className='w-full h-full object-cover'>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback />
                  </Avatar>
                </span>
              </div>
              <span className='text-primary text-xs font-medium block px-0.5 max-w-[74px] truncate text-center'>
                tuanpa.03
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;