'use client';

import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

interface IMenuItem {
  title: string;
  to: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  subIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  isActive?: boolean;
  isHideMenuText?: boolean;
  className?: string;
}

const MenuItem = ({
  title,
  to,
  icon,
  activeIcon,
  subIcon,
  isActive,
  isHideMenuText,
  className,
  onClick,
}: IMenuItem) => {
  const pathName = usePathname();

  return (
    <>
      <Tippy
        placement='right'
        delay={[600, 0]}
        trigger='mouseenter'
        render={(attrs) => (
          <div className={cx('box-tippy')} tabIndex={-1} {...attrs}>
            {title}
          </div>
        )}
      >
        <Link
          onClick={onClick}
          className={cx(`menu-item`, {
            active: pathName === to || isActive,
            [className!]: className,
          })}
          href={to}
        >
          <span className={cx('icon')}>{icon}</span>
          <span className={cx('active-icon')}>{activeIcon}</span>
          <span className={cx('title', { hidden: isHideMenuText })}>{title}</span>
          {subIcon && <span className={cx('sub-icon')}>{subIcon}</span>}
        </Link>
      </Tippy>
    </>
  );
};

export default MenuItem;
