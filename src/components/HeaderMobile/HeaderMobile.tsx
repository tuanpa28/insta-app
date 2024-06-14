'use client';

import { CircleXIcon, HeartIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AccountItem from '@/components/AccountItem';
import { LogoTextIcon } from '@/components/Icons';
import { RootPath } from '@/constants/enum';
import { IUser } from '@/interfaces';
import { useEffect, useState } from 'react';

const dataFake: IUser[] = [
  {
    _id: '1',
    username: 'tuanpa.03',
    email: 'tuanpa@gmail.com',
    full_name: 'Pham Anh Tuan',
    tick: true,
  },
  {
    _id: '2',
    username: '_tte19_',
    email: 'tte19@gmail.com',
    full_name: 'Hoang Thu Thao',
    tick: true,
  },
];

const HeaderMobile = () => {
  const [searchResult, setSearchResult] = useState<Array<IUser>>([]);
  const pathName = usePathname();

  useEffect(() => {
    setSearchResult(dataFake);
  }, []);

  return (
    <div className='block md:hidden h-fit w-full bg-white fixed top-0 left-0 right-0 z-10'>
      <div className='flex items-center justify-between px-4 h-12 sm:h-[60px] border-b border-solid border-[rgb(219,219,219)]'>
        <div className='pt-2 sm:py-1 sm:pt-3'>
          <Link href={'/'}>
            <LogoTextIcon />
          </Link>
        </div>
        <div className='flex items-center justify-end w-full'>
          <div className='mx-2 w-full max-w-64 min-w-32 h-fit flex items-center justify-center relative'>
            <div className='absolute left-4 top-2/4 translate-y-[-50%] text-[rgba(22,24,35,0.34)] dark:text-[rgb(180,180,180)]'>
              <SearchIcon width={18} height={18} />
            </div>
            <input
              className='w-full h-full text-base py-2 px-4 rounded-lg outline-none text-primary dark:text-[rgb(250,250,250)] bg-[rgb(239,239,239)] dark:bg-[rgb(38,38,38)] placeholder:text-[rgb(180,180,180)] placeholder:pl-7'
              type='text'
              placeholder='Search'
              // ref={inputRef}
              // value={searchValue}
              spellCheck={false}
              // onChange={handleChange}
            />
            <div className='absolute right-4 top-2/4 translate-y-[-50%] text-[rgba(22,24,35,0.34)] dark:text-[rgb(180,180,180)] cursor-pointer'>
              <CircleXIcon width={18} height={18} />
            </div>
            {/* <div className='animate-spinner absolute right-4 top-2/4 translate-y-[-50%] text-[rgba(22,24,35,0.34)] dark:text-[rgb(180,180,180)]'>
            <LoaderIcon width={18} height={18} />
          </div> */}
            {/* {!!searchValue && !loading && ( 
            <div onClick={handleClear} className='clear'>
              <BiSolidXCircle className='icon' />
            </div>
          
          {loading && (
            <div className='loading'>
              <BiLoader className='icon' />
            </div>
           */}
            <div className='hidden fixed right-0 top-[48px] sm:top-[58px] w-full max-w-[375px] h-fit z-20 bg-white rounded-[6px] shadow-[0_4px_12px_rgba(0,0,0,0.15)]'>
              <div className='overflow-y-auto py-3 h-full max-h-[calc(100vh-110px)]'>
                {searchResult && searchResult.length > 0 ? (
                  searchResult?.map((item: IUser, i) => (
                    <AccountItem
                      key={i}
                      user={item}
                      hasTippy={false}
                      description={'Pham Tuan • 1.4M followers'}
                      hasRound
                      className='cursor-pointer hover:bg-[rgba(0,0,0,.05)] dark:hover:bg-[rgba(255,255,255,0.1)]'
                    />
                  ))
                ) : (
                  <div className='p-4 text-center text-primary text-base'>
                    <span>No results found.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='p-2 sm:p-3'>
            <Link href={RootPath.Notifications}>
              {pathName === RootPath.Notifications ? <HeartIcon strokeWidth={3} /> : <HeartIcon />}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
