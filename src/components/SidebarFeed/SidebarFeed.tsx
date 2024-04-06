'use client';

import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import AccountItem from '@/components/AccountItem';
import { IUser } from '@/interfaces';
import { userService } from '@/services';
import { useAppSelector } from '@/store/hook';
import styles from './SidebarFeed.module.scss';

const cx = classNames.bind(styles);

const SidebarFeed = () => {
  const [userSuggested, setSserSuggested] = useState([]);
  const user = useAppSelector((state) => state.user.currentUser.values);

  useEffect(() => {
    (async () => {
      const response = await userService.getUsersSuggested();
      setSserSuggested(response?.data?.data);
    })();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('head')}>
        {user && <AccountItem className={cx('current-user')} user={user} btn='Switch' />}
      </div>
      <div className={cx('body')}>
        <div className={cx('head-body')}>
          <span className={cx('text')}>Suggested for you</span>
          <Link href={'/'} className={cx('btn')}>
            See All
          </Link>
        </div>
        <div className={cx('list-user')}>
          {userSuggested?.map((user: IUser, index: number) => (
            <AccountItem
              key={index}
              className={cx('user-item')}
              user={user}
              btn='follow'
              hasTooltip
            />
          ))}
        </div>
      </div>
      <div className={cx('footer')}>
        <ul className={cx('more')}>
          <li className={cx('more-item')}>
            <Link href={'/'}>About</Link>
          </li>
          <li className={cx('more-item')}>
            <Link href={'/'}>Help</Link>
          </li>
          <li className={cx('more-item')}>
            <Link href={'/'}>Press</Link>
          </li>
          <li className={cx('more-item')}>
            <Link href={'/'}>API</Link>
          </li>
          <li className={cx('more-item')}>
            <Link href={'/'}>Jobs</Link>
          </li>
          <li className={cx('more-item')}>
            <Link href={'/'}>Privacy</Link>
          </li>
          <li className={cx('more-item')}>
            <Link href={'/'}>Terms</Link>
          </li>
          <li className={cx('more-item')}>
            <Link href={'/'}>Locations</Link>
          </li>
          <li className={cx('more-item')}>
            <Link href={'/'}>Language</Link>
          </li>
          <li className={cx('more-item')}>
            <Link href={'/'}>Meta Verified</Link>
          </li>
        </ul>
        <span className={cx('infor')}>© 2023 Instagram Clone By Pham Tuan</span>
      </div>
    </div>
  );
};

export default SidebarFeed;
