'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  BoxArrowUpRightIcon,
  CreateIcon,
  ExploreActiveIcon,
  ExploreIcon,
  HomeActiveIcon,
  HomeIcon,
  LogoImgIcon,
  LogoTextIcon,
  MessageActiveIcon,
  MessageIcon,
  MoreActiveIcon,
  MoreIcon,
  NotificationActiveIcon,
  NotificationIcon,
  ReelsActiveIcon,
  ReelsIcon,
  SearchActiveIcon,
  SearchIcon,
  ThreadsIcon,
} from '@/components/Icons';
import ModalCreatePost from '@/components/ModalCreatePost';
import ModalMore from '@/components/ModalMore';
import Notifications from '@/components/Notifications';
import Search from '@/components/Search';
import noAvatar from '@/public/images/no-user-image.jpg';
import { useAppSelector } from '@/store/hook';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

interface ISidebar {
  handleFullMain?: (status: boolean) => void;
}

const Sidebar = ({ handleFullMain = () => {} }: ISidebar) => {
  const [showModalMore, setShowModalMore] = useState(false);
  const [showModalCreatePost, setShowModalCreatePost] = useState(false);
  const [sizeSidebar, setSizeSidebar] = useState(false);
  const [showFormSearch, setShowFormSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const user = useAppSelector((state) => state.user.currentUser.values);

  const handleShowModalMore = (event: any) => {
    event.preventDefault();
    setShowModalMore(!showModalMore);
  };

  const handleShowModalCreatePost = (event: any) => {
    event.preventDefault();
    setShowModalCreatePost(!showModalCreatePost);
  };

  const handleClickMessages = () => {
    setSizeSidebar(true);
    handleFullMain(true);
    if (showFormSearch) {
      setShowFormSearch(false);
    }
    if (showNotifications) {
      setShowNotifications(false);
    }
  };

  const handleSidebarBig = () => {
    handleFullMain(false);
    setSizeSidebar(false);
    if (showFormSearch) {
      setShowFormSearch(false);
    }
    if (showNotifications) {
      setShowNotifications(false);
    }
  };

  const handleClickSearch = (event: any) => {
    event.preventDefault();
    setSizeSidebar(!sizeSidebar);
    setShowFormSearch(!sizeSidebar);
    if (showNotifications) {
      setShowNotifications(false);
    }
  };

  const handleClickNotifications = (event: any) => {
    event.preventDefault();
    setSizeSidebar(!sizeSidebar);
    setShowNotifications(!sizeSidebar);
    if (showFormSearch) {
      setShowFormSearch(false);
    }
  };

  return (
    <>
      <div className={`${cx('wrapper')} h-screen border-r w-fit border-solid border-border`}>
        <div className={cx('content', { sidebar_small: sizeSidebar })}>
          <div className={cx('logo')}>
            <Link onClick={handleSidebarBig} href={'/'} className={cx('logo-link')}>
              {/* <Image
                className={cx('logo-text', { opacity_0: sizeSidebar })}
                src={logo_text}
                alt='Instagram'
              /> */}
              <LogoTextIcon className={cx('logo-text', { opacity_0: sizeSidebar })} />
              <LogoImgIcon className={cx('logo-img', { scale_1: sizeSidebar })} />
              {/* <Image
                className={cx('logo-img', { scale_1: sizeSidebar })}
                src={logo_img}
                alt='Instagram'
              /> */}
            </Link>
          </div>
          <Menu>
            <MenuItem
              onClick={handleSidebarBig}
              title='Home'
              to={'/'}
              icon={<HomeIcon />}
              activeIcon={<HomeActiveIcon />}
              isHideMenuText={sizeSidebar}
            />
            <MenuItem
              onClick={handleClickSearch}
              isActive={showFormSearch}
              title='Search'
              to={'/search'}
              icon={<SearchIcon />}
              activeIcon={<SearchActiveIcon />}
              isHideMenuText={sizeSidebar}
            />
            <MenuItem
              onClick={handleSidebarBig}
              title='Explore'
              to={'/explore'}
              icon={<ExploreIcon />}
              activeIcon={<ExploreActiveIcon />}
              isHideMenuText={sizeSidebar}
            />
            <MenuItem
              onClick={handleSidebarBig}
              title='Reels'
              to={'/reels'}
              icon={<ReelsIcon />}
              activeIcon={<ReelsActiveIcon />}
              isHideMenuText={sizeSidebar}
            />
            <MenuItem
              onClick={handleClickMessages}
              title='Messages'
              to={'/inbox'}
              icon={<MessageIcon />}
              activeIcon={<MessageActiveIcon />}
              isHideMenuText={sizeSidebar}
            />
            <MenuItem
              onClick={handleClickNotifications}
              isActive={showNotifications}
              title='Notifications'
              to={'/notifications'}
              icon={<NotificationIcon />}
              activeIcon={<NotificationActiveIcon />}
              isHideMenuText={sizeSidebar}
              className={cx('menu-item-notifications')}
            />
            <MenuItem
              onClick={handleShowModalCreatePost}
              title='Create'
              to={'/create'}
              icon={<CreateIcon />}
              isHideMenuText={sizeSidebar}
            />
            <MenuItem
              onClick={handleSidebarBig}
              title='Profile'
              to={'/profile'}
              icon={
                <Image
                  className={cx('sidebar-avatar')}
                  src={user?.profile_image || noAvatar}
                  alt='Avatar'
                />
              }
              isHideMenuText={sizeSidebar}
            />
          </Menu>
          <div className={cx('footer')}>
            <MenuItem
              title='Threads'
              to={'/threads'}
              icon={<ThreadsIcon />}
              subIcon={!sizeSidebar && <BoxArrowUpRightIcon />}
              isHideMenuText={sizeSidebar}
            />
            <MenuItem
              onClick={handleShowModalMore}
              isActive={showModalMore}
              title='More'
              to={'/more'}
              icon={<MoreIcon />}
              activeIcon={<MoreActiveIcon />}
              isHideMenuText={sizeSidebar}
            />
          </div>
        </div>
        {/* Search */}
        {showFormSearch && <Search />}
        {/* Notifications */}
        {showNotifications && <Notifications />}
        {/* Modal More */}
        {showModalMore && <ModalMore onShowModalMore={handleShowModalMore} />}
      </div>
      {showModalCreatePost && <ModalCreatePost onClick={handleShowModalCreatePost} />}
    </>
  );
};

export default Sidebar;
