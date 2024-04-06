'use client';

import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiSolidBadgeCheck } from 'react-icons/bi';

import AccountPreview from '@/components/AccountPreview';
import { PopperWrapper } from '@/components/Popper';
import { IPost, IUser } from '@/interfaces';
import { postService } from '@/services';
import styles from './AccountItem.module.scss';
import { noImage } from '@/public/images';

const cx = classNames.bind(styles);

interface IAccountItem {
  user: IUser;
  className?: string;
  btn?: string;
  hasTooltip?: boolean;
  avatarLarge?: boolean;
  nameLarge?: boolean;
  hasBorder?: boolean;
}

const AccountItem = ({
  user,
  className,
  btn,
  hasTooltip,
  avatarLarge = false,
  nameLarge = false,
  hasBorder = false,
}: IAccountItem) => {
  const [postsUser, setPostsUser] = useState<IPost[]>([]);

  const renderPreview = () => (
    <div tabIndex={-1}>
      <PopperWrapper>
        <AccountPreview user={user} postsUser={postsUser} />
      </PopperWrapper>
    </div>
  );

  useEffect(() => {
    (async () => {
      const respon = await postService.getPostsUser(user?._id as string);
      respon?.data && setPostsUser(respon?.data);
    })();
  }, [user]);

  return (
    <div className={cx('wrapper', className)}>
      {hasTooltip ? (
        <div>
          <Tippy
            interactive
            delay={[600, 100]}
            offset={[160, 12]}
            placement='bottom'
            render={renderPreview}
          >
            <Link className={cx({ border: hasBorder })} href={`/${user.username}`}>
              <Image
                className={cx('avatar', { avatarLarge })}
                src={user.profile_image || noImage}
                alt=''
              />
            </Link>
          </Tippy>
        </div>
      ) : (
        <Link className={cx({ border: hasBorder })} href={`/${user.username}`}>
          <Image
            className={cx('avatar', { avatarLarge })}
            src={user.profile_image || noImage}
            alt=''
          />
        </Link>
      )}
      <div className={cx('info')}>
        <h4 className={cx('name', { nameLarge })}>
          {hasTooltip ? (
            <div>
              <Tippy
                interactive
                delay={[600, 100]}
                offset={[152, 2]}
                placement='bottom'
                render={renderPreview}
              >
                <Link href={`/${user.username}`}>
                  <span>{user.username}</span>
                  {user?.tick && <BiSolidBadgeCheck className={cx('check')} />}
                </Link>
              </Tippy>
            </div>
          ) : (
            <Link href={`/${user.username}`}>
              <span>{user.username}</span>
              {user?.tick && <BiSolidBadgeCheck className={cx('check')} />}
            </Link>
          )}
        </h4>
        <span className={cx('user-name')}>{user.full_name}</span>
      </div>
      {btn && <button className={cx('btn')}>{btn}</button>}
    </div>
  );
};

export default AccountItem;
