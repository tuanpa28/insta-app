import Link from 'next/link';

import { LogoTextIcon } from '@/components/Icons';
import { MANAGER_ROUTES, ROUTES_UTILS } from '@/constants/routes';
import ListMenu from './ListMenu';

const Sidebar = () => {
  return (
    <div className={`relative z-10 h-screen w-fit border-r border-solid border-border`}>
      <div
        className={`w-[var(--nav-narrow-width)] xl:w-[var(--nav-medium-width)] 3xl:w-[var(--nav-wide-width)] h-screen flex flex-col transition-[width] ease-in-out duration-300 bg-[#fff] px-3 pt-2 pb-5`}
      >
        <div className={'w-full pt-6 px-3 pb-4'}>
          <Link href={'/'}>
            <LogoTextIcon className={'mt-2'} />
            {/* <LogoImgIcon className={'mt-1'} /> */}
          </Link>
        </div>
        <div className='flex flex-col justify-between h-full'>
          <div className='py-4 w-full'>
            <ListMenu items={MANAGER_ROUTES} />
          </div>

          <div className='w-full'>
            <ListMenu items={ROUTES_UTILS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
