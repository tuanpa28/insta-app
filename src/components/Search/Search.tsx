'use client';

import { CircleXIcon, LoaderIcon, SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import AccountItem from '@/components/AccountItem';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks';
import { IUser } from '@/interfaces';
import { userService } from '@/services';
import { useRouter } from 'next/navigation';

type SearchProps = {
  isOpen: boolean;
};

const Search = ({ isOpen }: SearchProps) => {
  const [isFocusedInput, setIsFocusedInput] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Array<IUser>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedValue = useDebounce(searchValue, 600);
  const router = useRouter();
  console.log(searchResult);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const handleClearInput = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current!.blur();
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    (async () => {
      setIsLoading(true);
      try {
        const response = await userService.search(debouncedValue);

        setSearchResult(response?.data?.data);
      } catch (error) {
        setSearchResult([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [debouncedValue]);

  return (
    <div
      className={`flex flex-col absolute z-40 top-0 left-[calc(var(--nav-narrow-width)+1px)] w-[397px] h-screen py-2 overflow-y-hidden bg-white dark:bg-darkBackground shadow-[rgba(0,0,0,0.15)] drop-shadow-xl border-r border-solid border-border dark:border-[rgb(38,38,38)] rounded-r-2xl transition-transform ease-in-out duration-500 ${
        isOpen ? 'translate-x-0' : 'translate-x-[calc(-100%-var(--nav-narrow-width)+1px)]'
      }`}
    >
      <div className='my-2 px-6 py-1'>
        <span className='block text-primary font-bold text-2xl'>Search</span>
      </div>
      <div className='flex flex-col'>
        <div className='mx-4 mb-4 min-w-32 h-10 flex items-center justify-center relative'>
          {!isFocusedInput && (
            <div className='absolute left-3 top-2/4 translate-y-[-50%] text-[rgba(22,24,35,0.34)] dark:text-[rgb(180,180,180)]'>
              <SearchIcon width={18} height={18} />
            </div>
          )}
          <input
            className={`w-full h-full text-base py-1 px-4 rounded-md outline-none text-primary dark:text-[rgb(250,250,250)] bg-[rgb(239,239,239)] dark:bg-[rgb(38,38,38)] placeholder:text-[rgb(180,180,180)] ${
              !isFocusedInput && 'placeholder:pl-6'
            }
            ${!isFocusedInput && searchValue && 'pl-10'}`}
            type='text'
            placeholder='Search'
            ref={inputRef}
            value={searchValue}
            spellCheck={false}
            onFocus={() => setIsFocusedInput(true)}
            onBlur={() => setTimeout(() => setIsFocusedInput(false), 100)}
            onChange={handleChangeInput}
          />
          {isFocusedInput && !isLoading && (
            <div
              onClick={handleClearInput}
              className='absolute right-3 top-2/4 translate-y-[-50%] text-[rgba(22,24,35,0.34)] dark:text-[rgb(180,180,180)] cursor-pointer'
            >
              <CircleXIcon width={18} height={18} />
            </div>
          )}
          {isLoading && (
            <div className='absolute right-3 top-2/4 translate-y-[-50%] text-[rgba(22,24,35,0.34)] dark:text-[rgb(180,180,180)]'>
              <LoaderIcon width={18} height={18} className='animate-spinner' />
            </div>
          )}
        </div>

        <div className='overflow-y-auto h-screen'>
          {isLoading ? (
            <div className='flex flex-col'>
              {new Array(10).fill(0).map((_, i) => (
                <div key={i} className='flex items-center space-x-4 px-6 py-2'>
                  <Skeleton className='h-12 w-12 rounded-full' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                  </div>
                </div>
              ))}
            </div>
          ) : searchResult && searchResult.length > 0 ? (
            searchResult?.map((user: IUser, i) => (
              <AccountItem
                key={i}
                onClick={() => router.push(`/${user.username}`)}
                user={user}
                hasTippy={false}
                description={`${user.full_name} ${
                  user.followers && user?.followers?.length >= 1
                    ? `• ${user.followers?.length} followers`
                    : ''
                }`}
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
