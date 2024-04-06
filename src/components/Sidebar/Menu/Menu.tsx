import classNames from 'classnames/bind';
import React from 'react';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

interface IMenu {
  children: React.ReactNode;
}

const Menu = ({ children }: IMenu) => {
  return <nav className={cx('list-menu')}>{children}</nav>;
};

export default Menu;
