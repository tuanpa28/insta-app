'use client';

import {
  AtSignIcon,
  CompassIcon,
  HeartIcon,
  HomeIcon,
  MenuIcon,
  MessageCircleMoreIcon,
  SearchIcon,
  SquareArrowOutUpRightIcon,
  SquarePlusIcon,
  VideotapeIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import { ImageVideoIcon, LogoImgIcon, LogoTextIcon } from '@/components/Icons';
import Notifications from '@/components/Notifications';
import Search from '@/components/Search';
import { menuItemsMore } from '@/components/common/data/DataMore';
import { DialogDisplay } from '@/components/common/display';
import { DropdownMore } from '@/components/dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RootLabel, RootPath } from '@/constants/enum';
import { actions, useStore } from '@/store';
import ListMenu from './ListMenu';

export type NavLinkProps = {
  label: string;
  icon: React.ReactNode;
  active_icon: React.ReactNode;
  href?: string;
  sub_icon?: React.ReactNode;
  badge?: number;
  onClick?: () => void;
  dropdown?: React.ReactNode;
};

const Sidebar = () => {
  const [isShowCreatePost, setIsShowCreatePost] = useState<boolean>(false);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const [isShowNotifi, setIsShowNotifi] = useState<boolean>(false);
  const [state, dispatch] = useStore();
  const pathName = usePathname();
  const { isStateSidebar } = state;

  const strokeWidth = useMemo(() => 3, []);
  const isInboxPage = pathName === RootPath.Inbox;

  const handlerResetSidebar = useCallback(() => {
    dispatch(actions.setIsStateSidebar(false));
    setIsShowSearch(false);
    setIsShowNotifi(false);
  }, [dispatch]);

  const handlerClickSearch = useCallback(() => {
    setIsShowSearch(!isShowSearch);
    if (!isInboxPage && isStateSidebar === isShowSearch) {
      dispatch(actions.setIsStateSidebar(!isStateSidebar));
    }
    if (isShowNotifi) {
      setIsShowNotifi(false);
    }
  }, [isInboxPage, isStateSidebar, isShowNotifi, isShowSearch, dispatch]);

  const handlerClickInbox = useCallback(() => {
    dispatch(actions.setIsStateSidebar(true));
    if (isShowSearch) {
      setIsShowSearch(false);
    }
    if (isShowNotifi) {
      setIsShowNotifi(false);
    }
  }, [isShowNotifi, isShowSearch, dispatch]);

  const handlerClickNotifi = useCallback(() => {
    setIsShowNotifi(!isShowNotifi);
    if (!isInboxPage && isStateSidebar === isShowNotifi) {
      dispatch(actions.setIsStateSidebar(!isStateSidebar));
    }
    if (isShowSearch) {
      setIsShowSearch(false);
    }
  }, [isInboxPage, isStateSidebar, isShowNotifi, isShowSearch, dispatch]);

  const MANAGER_ROUTES: NavLinkProps[] = useMemo(
    () => [
      {
        label: RootLabel.Home,
        icon: <HomeIcon />,
        active_icon: <HomeIcon strokeWidth={strokeWidth} />,
        href: RootPath.Home,
        onClick: handlerResetSidebar,
      },
      {
        label: RootLabel.Search,
        icon: <SearchIcon />,
        active_icon: <SearchIcon strokeWidth={strokeWidth} />,
        onClick: handlerClickSearch,
      },
      {
        label: RootLabel.Explore,
        icon: <CompassIcon />,
        active_icon: <CompassIcon strokeWidth={strokeWidth} />,
        href: RootPath.Explore,
        onClick: handlerResetSidebar,
      },
      {
        label: RootLabel.Reels,
        icon: <VideotapeIcon />,
        active_icon: <VideotapeIcon strokeWidth={strokeWidth} />,
        href: RootPath.Reels,
        onClick: handlerResetSidebar,
      },
      {
        label: RootLabel.Messages,
        icon: <MessageCircleMoreIcon />,
        active_icon: <MessageCircleMoreIcon strokeWidth={strokeWidth} />,
        href: RootPath.Inbox,
        badge: 1,
        onClick: handlerClickInbox,
      },
      {
        label: RootLabel.Notifications,
        icon: <HeartIcon />,
        active_icon: <HeartIcon strokeWidth={strokeWidth} />,
        onClick: handlerClickNotifi,
      },
      {
        label: RootLabel.Create,
        icon: <SquarePlusIcon />,
        active_icon: <SquarePlusIcon strokeWidth={strokeWidth} />,
        onClick: () => setIsShowCreatePost(true),
      },
      {
        label: RootLabel.Profile,
        icon: (
          <Avatar className='w-6 h-6'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback />
          </Avatar>
        ),
        active_icon: (
          <div className='p-[1px] rounded-full ring-[1.5px] ring-primary'>
            <Avatar className='w-6 h-6'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback />
            </Avatar>
          </div>
        ),
        href: '/patuan.03',
        onClick: handlerResetSidebar,
      },
    ],
    [strokeWidth, handlerClickNotifi, handlerClickInbox, handlerClickSearch, handlerResetSidebar],
  );

  const ROUTES_UTILS: NavLinkProps[] = useMemo(
    () => [
      {
        label: RootLabel.Threads,
        icon: <AtSignIcon />,
        active_icon: <AtSignIcon strokeWidth={strokeWidth} />,
        href: 'https://www.threads.net',
        badge: 3,
        sub_icon: <SquareArrowOutUpRightIcon className='w-[18px] h-[18px]' />,
      },
      {
        label: RootLabel.More,
        icon: <MenuIcon />,
        active_icon: <MenuIcon strokeWidth={strokeWidth} />,
        dropdown: <DropdownMore items={menuItemsMore} className='w-72 mx-4' />,
      },
    ],
    [strokeWidth],
  );

  return (
    <>
      <div
        className={`hidden md:block relative z-50 h-screen w-fit border-r border-solid border-border dark:border-[rgb(38,38,38)]`}
      >
        <div
          className={`${
            isStateSidebar
              ? '!w-[var(--nav-narrow-width)]'
              : 'w-[var(--nav-narrow-width)] xl:w-[var(--nav-medium-width)] 3xl:w-[var(--nav-wide-width)]'
          } h-screen flex flex-col transition-[width] ease-in-out duration-300 bg-[#fff] dark:bg-darkBackground px-3 pt-2 pb-5`}
        >
          <div className={'w-full pt-6 px-3 pb-4 h-20'}>
            <Link href={'/'} onClick={handlerResetSidebar}>
              {isStateSidebar ? (
                <LogoImgIcon className='mt-2 ' />
              ) : (
                <>
                  <LogoTextIcon className='mt-2 hidden xl:block' />
                  <LogoImgIcon className='mt-2 xl:hidden block' />
                </>
              )}
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
      <Search isOpen={isShowSearch} />
      <Notifications isOpen={isShowNotifi} />
      <DialogDisplay
        title={'Create new post'}
        alignTitle='center'
        className='w-[539px] 3xl:w-[744px] min-w-[348px] max-w-[855px] min-h-96'
        open={isShowCreatePost}
        setOpen={() => setIsShowCreatePost(!isShowCreatePost)}
      >
        <div className='flex items-center justify-center flex-col min-h-96'>
          <div className='mb-2'>
            <ImageVideoIcon />
          </div>
          <p className='text-lg text-center font-medium mb-4'>Drag photos and videos here</p>
          <label
            htmlFor='file-upload'
            className='bg-[rgb(0,149,246)] hover:bg-[rgb(24,119,242)] text-[#fff] rounded-lg cursor-pointer text-sm font-semibold py-2 px-4'
          >
            Select from computer
          </label>
          <input
            id='file-upload'
            type='file'
            accept='image/*, video/*'
            multiple
            className='hidden'
          />
        </div>
      </DialogDisplay>
      <div
        onClick={handlerResetSidebar}
        className={`${
          isShowSearch || isShowNotifi ? 'fixed' : 'hidden'
        } inset-0 z-30 bg-transparent`}
      />
    </>
  );
};

export default Sidebar;
