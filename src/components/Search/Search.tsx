'use client';

// import { Skeleton } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
// import { BiLoader, BiSolidXCircle } from 'react-icons/bi';

import AccountItem from '@/components/AccountItem';
import { useDebounce } from '@/hooks';
import { userService } from '@/services';
import styles from './Search.module.scss';
import { IUser } from '@/interfaces';
import Link from 'next/link';

const cx = classNames.bind(styles);

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(searchValue, 600);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    (async () => {
      setLoading(true);
      const response = await userService.search(debouncedValue);
      setSearchResult(response?.data?.data);
      setLoading(false);
    })();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current!.focus();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div className={cx('wrapper', { translate_x_0: true })}>
      <div className={cx('head')}>
        <span className={cx('title')}>Search</span>
      </div>
      <div className={cx('content')}>
        <div className={cx('form-search')}>
          <input
            className={cx('form-input')}
            type='text'
            placeholder='Search'
            ref={inputRef}
            value={searchValue}
            spellCheck={false}
            onChange={handleChange}
          />
          {!!searchValue && !loading && (
            <div onClick={handleClear} className={cx('clear')}>
              {/* <BiSolidXCircle className={cx('icon')} /> */}
            </div>
          )}
          {loading && (
            <div className={cx('loading')}>
              {/* <BiLoader className={cx('icon')} /> */}
            </div>
          )}
        </div>

        <div className={cx('result')}>
          {loading && (
            <>
              {/* <Skeleton
                className={cx('skeleton')}
                avatar
                loading={true}
                active
                title={false}
                paragraph={{ rows: 2, width: ['80%', '50%'] }}
              />
              <Skeleton
                className={cx('skeleton')}
                avatar
                loading={true}
                active
                title={false}
                paragraph={{ rows: 2, width: ['80%', '50%'] }}
              />
              <Skeleton
                className={cx('skeleton')}
                avatar
                loading={true}
                active
                title={false}
                paragraph={{ rows: 2, width: ['80%', '50%'] }}
              />
              <Skeleton
                className={cx('skeleton')}
                avatar
                loading={true}
                active
                title={false}
                paragraph={{ rows: 2, width: ['80%', '50%'] }}
              /> */}
            </>
          )}
          {searchResult && searchResult.length > 0 ? (
            searchResult?.map((item: IUser, index: number) => (
              <Link key={index} href={`/${item.username}`}>
                <AccountItem user={item} hasBorder />
              </Link>
            ))
          ) : (
            <div className={cx('not-found')}>No results found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
