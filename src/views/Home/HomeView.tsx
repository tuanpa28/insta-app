import Link from 'next/link';

import SidebarFeed from '@/components/SidebarFeed';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const HomeView = () => {
  // const [volume, setVolume] = useState<boolean>(false);
  // const { isLoading, error, data: posts } = useGetPostTimeLine();

  // if (error) return JSON.stringify(error);

  // const handlerVolumeVideo = () => {
  //   setVolume(!volume);
  // };

  return (
    <div className='w-full flex justify-center flex-row'>
      <div className='max-w-[630px] w-full mt-14 md:mt-4 h-screen'>
        <div className='w-full outline-none mb-6 py-2 rounded-lg '>
          <div className='flex flex-row items-center justify-start'>
            {new Array(4).fill(0).map((_, i) => (
              <div key={i} className='w-20 h-full px-1'>
                <Link
                  href={'#'}
                  className='flex flex-col items-center mx-auto cursor-pointer w-[62px] '
                >
                  {/* after:bg-[rgb(228,228,228)] */}
                  <div className='relative mt-1 mb-2 after:bg-linearGradientAvatar after:content-[""] after:block after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-16 after:w-16 after:z-[-2] after:rounded-full before:content-[""] before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-[60px] before:w-[60px] before:z-[-1] before:rounded-full before:bg-white'>
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
        <div className='flex items-center justify-center flex-col'>
          <div className='flex flex-col items-center justify-start max-w-full w-[470px]'>
            {/* {posts?.map((post: IPost, index: number) => (
              <PostItem
                key={index}
                post={post}
                isVolume={volume}
                onHandlerVolume={handlerVolumeVideo}
              />
            ))} */}
          </div>
          {/* {isLoading && (
            <div className='h-12 mt-10'>
              <LoadingIcon className='w-8 h-8 animate-spinner' />
            </div>
          )} */}
        </div>
      </div>
      <SidebarFeed />
    </div>
  );
};

export default HomeView;
