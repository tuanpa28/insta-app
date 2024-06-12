import { MessageCircleMoreIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IPost, IUser } from '@/interfaces';

interface IAccountPreview {
  user: IUser;
  postsUser?: IPost[];
}

const AccountPreview = ({ user }: IAccountPreview) => {
  // const authUser = useAppSelector((state) => state.user.currentUser.values);
  // const medias = postsUser?.map((post: IPost) => post.media).flat();
  // const imageUrls = medias
  //   ?.filter((media: IMedia) => media.type === 'image')
  //   .slice(-3)
  //   .map((media: IMedia) => media.url);

  // const followed = authUser?.followings?.includes(user?._id) || authUser?._id === user?._id;

  return (
    <div className='flex flex-col w-[366px] py-4'>
      <div className='px-4 flex flex-row items-center justify-start gap-x-4 mb-4'>
        <div className='cursor-pointer w-14 h-14 relative z-[1] after:bg-linearGradientAvatar after:content-[""] after:block after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-[64px] after:w-[64px] after:z-[-2] after:rounded-full before:content-[""] before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-[60px] before:w-[60px] before:z-[-1] before:rounded-full before:bg-white'>
          <Avatar className='w-full h-full object-cover'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback />
          </Avatar>
        </div>
        <div className='flex flex-col justify-center'>
          <Link href={`/${user.username}`}>
            <span className='text-base font-bold text-primary leading-5'>tuanpa.03</span>
          </Link>
          <span className='text-sm font-normal text-[rgb(115,115,115)] leading-[18px] mt-0.5'>
            Tuan Dev
          </span>
        </div>
      </div>

      <div className='grid items-center grid-cols-3 gap-x-1 mb-4'>
        <div className='mx-2 flex flex-col text-center text-sm'>
          <span className='font-extrabold leading-[18px]'>{0}</span>
          <span className='font-medium'>posts</span>
        </div>
        <div className='mx-2 flex flex-col text-center text-sm'>
          <span className='font-extrabold leading-[18px]'>{user?.followers?.length}</span>
          <span className='font-medium'>followers</span>
        </div>
        <div className='mx-2 flex flex-col text-center text-sm'>
          <span className='font-extrabold leading-[18px]'>{user?.followings?.length}</span>
          <span className='font-medium'>following</span>
        </div>
      </div>

      <div className='grid items-center grid-cols-3 gap-x-1 mb-4'>
        {new Array(3).fill(0).map((_, i) => (
          <Link key={i} href={'/'}>
            <Image
              width={300}
              height={300}
              src={'https://picsum.photos/200/300'}
              className='w-[120px] h-[120px] aspect-[120/120]'
              alt=''
            />
          </Link>
        ))}
      </div>

      {/* <div className='flex flex-col items-center gap-2 p-4 pb-2 mb-4 border-y border-solid border-[rgb(219,219,219)]'>
        <i className='w-12 h-12 inline-block bg-[url("/icons/icons.png")] bg-no-repeat bg-[length:98px_198px] bg-[0_-98px]'></i>
        <span className='text-sm font-bold text-primary'>No posts yet</span>
        <span className='text-sm font-medium text-center text-[rgb(115,115,115)]'>
          When {user.username} shares photos and reels, you&apos;ll see them here.
        </span>
      </div> */}

      <div className='flex items-center justify-center gap-2 px-4'>
        <Button
          size={'sm'}
          className='w-full bg-[rgb(0,149,246)] text-[rgb(255,255,255)] font-semibold text-sm hover:bg-[rgb(24,119,242)] rounded-lg'
        >
          <MessageCircleMoreIcon width={20} height={20} className='mr-1.5' />
          Message
        </Button>
        <Button
          size={'sm'}
          className='w-full bg-[rgb(239,239,239)] text-primary font-semibold text-sm hover:bg-[rgb(219,219,219)] rounded-lg'
        >
          Following
        </Button>
        {/* <Button
          size={'sm'}
          className='w-full bg-[rgb(0,149,246)] text-[rgb(255,255,255)] font-semibold text-sm hover:bg-[rgb(24,119,242)] rounded-lg'
        >
          <UserPlusIcon width={20} height={20} className='mr-1.5' />
          Follow
        </Button> */}
      </div>
    </div>
  );
};

export default AccountPreview;
