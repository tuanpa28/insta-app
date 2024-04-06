import classNames from 'classnames/bind';
import Link from 'next/link';
import { RiArrowDownSLine } from 'react-icons/ri';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('more')}>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Meta</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>About</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Blog</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Jobs</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Help</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>API</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Privacy</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Terms</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Locations</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Instagram Lite</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Threads</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Contact Uploading & Non-Users</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Meta Verified</Link>
        </div>
        {/* item */}
        <div className={cx('more-item')}>
          <Link href={'/'}>Threads</Link>
        </div>
      </div>
      <div className={cx('bottom')}>
        <span className={cx('language')}>
          English <RiArrowDownSLine className={cx('arrow-icon')} />
        </span>
        <span className={cx('infor')}>© 2023 Instagram Clone By Pham Tuan</span>
      </div>
    </div>
  );
};

export default Footer;
