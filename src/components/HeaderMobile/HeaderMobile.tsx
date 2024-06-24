'use client';

import { CircleXIcon, HeartIcon, LoaderIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import AccountItem from '@/components/AccountItem';
import { LogoTextIcon } from '@/components/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import { RootPath } from '@/constants/enum';
import { useDebounce } from '@/hooks';
import { IUser } from '@/interfaces';
import { userService } from '@/services';

const HeaderMobile = () => {
  const [isFocusedInput, setIsFocusedInput] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Array<IUser>>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathName = usePathname();
  const router = useRouter();
  const debouncedValue = useDebounce(searchValue, 600);

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
    <div className='block md:hidden h-fit w-full bg-white dark:bg-[rgb(0,0,0)] fixed top-0 left-0 right-0 z-10'>
      <div className='flex items-center justify-between px-4 h-12 sm:h-[60px] border-b border-solid border-[rgb(219,219,219)] dark:border-[rgb(54,54,54)]'>
        <div className='pt-2 sm:py-1 sm:pt-3'>
          <Link href={'/'}>
            <LogoTextIcon />
          </Link>
        </div>
        <div className='flex items-center justify-end w-full'>
          <div className='mx-2 w-full max-w-64 min-w-32 h-fit flex items-center justify-center relative'>
            {!isFocusedInput && (
              <div className='absolute left-4 top-2/4 translate-y-[-50%] text-[rgba(22,24,35,0.34)] dark:text-[rgb(180,180,180)]'>
                <SearchIcon width={18} height={18} />
              </div>
            )}

            <input
              className={`w-full h-full text-base py-2 px-4 rounded-lg outline-none text-primary dark:text-[rgb(250,250,250)] bg-[rgb(239,239,239)] dark:bg-[rgb(38,38,38)] placeholder:text-[rgb(180,180,180)] ${
                !isFocusedInput && 'placeholder:pl-6'
              }  ${!isFocusedInput && searchValue && 'pl-10'}`}
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

            <div
              className={`${
                !isFocusedInput && 'hidden'
              } fixed right-0 top-[48px] sm:top-[58px] w-full max-w-[375px] h-fit z-20 bg-white dark:bg-darkBackground rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_0_23px_rgba(255,255,255,0.2)]`}
            >
              <div className='overflow-y-scroll py-3 h-fit max-h-[calc(100vh-110px)]'>
                {isLoading ? (
                  <div className='flex flex-col'>
                    {new Array(4).fill(0).map((_, i) => (
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
                  searchResult?.map((user: IUser, index) => (
                    <AccountItem
                      key={index}
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
