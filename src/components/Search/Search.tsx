'use client';

import { CircleXIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
// import { useEffect, useRef, useState } from 'react';

import AccountItem from '@/components/AccountItem';
import { IUser } from '@/interfaces';
// import { useDebounce } from '@/hooks';
// import { userService } from '@/services';

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

type SearchProps = {
  isOpen: boolean;
};

const Search = ({ isOpen }: SearchProps) => {
  // const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<Array<IUser>>([]);
  // const [loading, setLoading] = useState(false);
  // const debouncedValue = useDebounce(searchValue, 600);

  // const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (!debouncedValue.trim()) {
  //     setSearchResult([]);
  //     return;
  //   }
  //   (async () => {
  //     setLoading(true);
  //     const response = await userService.search(debouncedValue);
  //     setSearchResult(response?.data?.data);
  //     setLoading(false);
  //   })();
  // }, [debouncedValue]);

  // const handleClear = () => {
  //   setSearchValue('');
  //   setSearchResult([]);
  //   inputRef.current!.focus();
  // };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchValue = event.target.value;
  //   if (!searchValue.startsWith(' ')) {
  //     setSearchValue(searchValue);
  //   }
  // };

  useEffect(() => {
    setSearchResult(dataFake);
  }, []);

  return (
    <div
      className={`hidden md:flex flex-col absolute z-40 top-0 left-[calc(var(--nav-narrow-width)+1px)] w-[397px] h-screen py-2 overflow-y-hidden bg-white dark:bg-darkBackground shadow-[rgba(0,0,0,0.15)] drop-shadow-xl border-r border-solid border-border dark:border-[rgb(38,38,38)] rounded-r-2xl transition-transform ease-in-out duration-500 ${
        isOpen ? 'translate-x-0' : 'translate-x-[calc(-100%-var(--nav-narrow-width)+1px)]'
      }`}
    >
      <div className='my-2 px-6 py-1'>
        <span className='block text-primary font-bold text-2xl'>Search</span>
      </div>
      <div className='flex flex-col'>
        <div className='mx-4 mb-4 min-w-32 h-10 flex items-center justify-center relative'>
          <div className='absolute left-3 top-2/4 translate-y-[-50%] text-[rgba(22,24,35,0.34)] dark:text-[rgb(180,180,180)]'>
            <SearchIcon width={18} height={18} />
          </div>
          <input
            className='w-full h-full text-base py-1 px-4 rounded-md outline-none text-primary dark:text-[rgb(250,250,250)] bg-[rgb(239,239,239)] dark:bg-[rgb(38,38,38)] placeholder:text-[rgb(180,180,180)] placeholder:pl-6'
            type='text'
            placeholder='Search'
            // ref={inputRef}
            // value={searchValue}
            spellCheck={false}
            // onChange={handleChange}
          />
          <div className='absolute right-3 top-2/4 translate-y-[-50%] text-[rgba(22,24,35,0.34)] dark:text-[rgb(180,180,180)] cursor-pointer'>
            <CircleXIcon width={18} height={18} />
          </div>
          {/* <div className='animate-spinner absolute right-3 top-2/4 translate-y-[-50%] text-[rgba(22,24,35,0.34)] dark:text-[rgb(180,180,180)]'>
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
        </div>

        <div className='overflow-y-auto h-screen'>
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
            <div className='p-4 mt-5 flex items-center justify-center text-primary text-base'>
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
