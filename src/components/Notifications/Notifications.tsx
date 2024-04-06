import { Skeleton } from 'antd';
import classNames from 'classnames/bind';

import NotifiItem from '@/components/NotifiItem';
import styles from './Notifications.module.scss';

const cx = classNames.bind(styles);

const Notifications = () => {
  return (
    <div className={cx('wrapper', { translate_x_0: true })}>
      <div className={cx('head')}>
        <span className={cx('title')}>Notifications</span>
      </div>
      <div className={cx('content')}>
        <Skeleton className={cx('skeleton')} loading={true} active title paragraph={{ rows: 0 }} />
        <Skeleton
          className={cx('skeleton')}
          avatar
          loading={true}
          active
          title
          paragraph={{ rows: 0 }}
        />
        <Skeleton
          className={cx('skeleton')}
          avatar
          loading={true}
          active
          title
          paragraph={{ rows: 0 }}
        />
        <Skeleton
          className={cx('skeleton')}
          avatar
          loading={true}
          active
          title
          paragraph={{ rows: 0 }}
        />
        <div className={cx('notifi-week')}>
          <span className={cx('notifi-title')}>This week</span>
          <div className={cx('notifi-content')}>
            <NotifiItem />
            <NotifiItem />
            <NotifiItem />
          </div>
        </div>
        <span className={cx('line')}></span>
        <div className={cx('notifi-month')}>
          <span className={cx('notifi-title')}>This month</span>
          <div className={cx('notifi-content')}>
            <NotifiItem />
            <NotifiItem />
            <NotifiItem />
          </div>
        </div>
        <span className={cx('line')}></span>
        <div className={cx('notifi-earlier')}>
          <span className={cx('notifi-title')}>Earlier</span>
          <div className={cx('notifi-content')}>
            <NotifiItem />
            <NotifiItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
