import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

import noAvatar from '@/public/images/no-user-image.jpg';
import styles from './NotifiItem.module.scss';

const cx = classNames.bind(styles);

const NotifiItem = () => {
  return (
    <Link href={`/@tuanpa03`} className={cx('wrapper')}>
      <Image className={cx('avatar')} src={noAvatar} alt={'Phạm Anh Tuấn'} />
      <span className={cx('content')}>
        Follow <span className={cx('user-name')}>tuanpa03</span> and others you know to see their
        photos and videos.
      </span>
    </Link>
  );
};

export default NotifiItem;