import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const NotifiItem = () => {
  return (
    <Link
      href={`/@tuanpa03`}
      className={`flex items-center py-2 px-6 cursor-pointer hover:bg-stone-200 dark:hover:bg-[rgba(255,255,255,0.1)]`}
    >
      <Avatar className='w-11 h-11'>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback />
      </Avatar>
      <span className='text-sm font-normal ml-3'>
        Follow <span className='font-semibold'>tuanpa03</span> and others you know to see their
        photos and videos.
      </span>
    </Link>
  );
};

export default NotifiItem;
