'use client';

import { BadgeCheckIcon } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import { TippyDisplay } from '@/components/common/display';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IUser } from '@/interfaces';

type AccountItemProps = {
  user: IUser;
  className?: string;
  classNameBtn?: string;
  hasTippy?: boolean;
  hasRound?: boolean;
  btn?: string | ReactNode;
  description: string;
  onClick?: () => void;
  onClickBtn?: () => void;
};

const AccountItem = ({
  user,
  className,
  hasTippy = true,
  hasRound,
  btn,
  classNameBtn,
  description,
  onClick,
  onClickBtn,
  ...props
}: AccountItemProps) => {
  return (
    <div
      onClick={onClick}
      {...props}
      className={`flex items-center justify-between py-2 px-6 ${className}`}
    >
      <div className='flex items-center'>
        {hasTippy ? (
          <TippyDisplay user={user} offset={[160, 4]}>
            <Link
              className={`w-11 h-11 relative ${
                !hasRound ? 'after:hidden before:hidden' : 'after:content-[""] before:content-[""]'
              } after:bg-linearGradientAvatar after:block after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-[52px] after:w-[52px] after:z-[-2] after:rounded-full before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-12 before:w-12 before:z-[-1] before:rounded-full before:bg-white dark:before:bg-[rgb(0,0,0)]`}
              href={`/${user.username}`}
            >
              <Avatar className='w-11 h-11 object-cover rounded-full'>
                <AvatarImage src={user.profile_image} />
                <AvatarFallback />
              </Avatar>
            </Link>
          </TippyDisplay>
        ) : (
          <Link
            className={`w-11 h-11 relative ${
              !hasRound ? 'after:hidden before:hidden' : 'after:content-[""] before:content-[""]'
            } after:bg-linearGradientAvatar after:block after:absolute after:translate-x-[-50%] after:translate-y-[-50%] after:top-1/2 after:left-1/2 after:h-[52px] after:w-[52px] after:z-[-2] after:rounded-full before:block before:absolute before:translate-x-[-50%] before:translate-y-[-50%] before:top-1/2 before:left-1/2 before:h-12 before:w-12 before:z-[-1] before:rounded-full before:bg-white dark:before:bg-[rgb(0,0,0)]`}
            href={`/${user.username}`}
          >
            <Avatar className='w-11 h-11 object-cover rounded-full'>
              <AvatarImage src={user.profile_image} />
              <AvatarFallback />
            </Avatar>
          </Link>
        )}
        <div className={'flex flex-col ml-3'}>
          <div className='flex items-center justify-start'>
            {hasTippy ? (
              <TippyDisplay user={user} offset={[150, 4]}>
                <h4 className={'text-sm leading-[18px] font-bold dark:text-[rgb(245,245,245)]'}>
                  <Link href={`/${user.username}`}>
                    <span>{user.username}</span>
                  </Link>
                </h4>
              </TippyDisplay>
            ) : (
              <h4 className={'text-sm leading-[18px] font-bold dark:text-[rgb(245,245,245)]'}>
                <Link href={`/${user.username}`}>
                  <span>{user.username}</span>
                </Link>
              </h4>
            )}
            {user?.tick && (
              <BadgeCheckIcon
                width={12}
                height={12}
                className={'ml-0.5 text-[rgb(0,149,246)] -mt-2'}
              />
            )}
          </div>
          <span
            className={
              'text-sm leading-[18px] font-medium text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)]'
            }
          >
            {description}
          </span>
        </div>
      </div>
      {btn && (
        <button
          onClick={onClickBtn}
          className={`text-xs font-bold text-[rgb(0,147,246)] dark:text-[rgb(0,160,246)] cursor-pointer hover:text-[rgb(0,55,107)] dark:hover:text-[rgb(245,245,245)] ${classNameBtn}`}
        >
          {btn}
        </button>
      )}
    </div>
  );
};

export default AccountItem;
