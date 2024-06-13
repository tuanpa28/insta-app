import { PostsTimeLine, SidebarFeed, Stories } from '@/components/home';

const HomeView = () => {
  return (
    <div className='w-full flex justify-center flex-row'>
      <div className='max-w-[630px] w-full mt-14 md:mt-4 min-h-screen'>
        <Stories />
        <div className='flex items-center justify-center flex-col'>
          <PostsTimeLine />
        </div>
      </div>
      <SidebarFeed />
    </div>
  );
};

export default HomeView;
