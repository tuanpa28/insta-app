'use client';

import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import { ActivityIcon, ReportIcon, SavedIcon, SettingIcon, SunIcon } from '@/components/Icons';
import { authService } from '@/services';
import { useAppDispatch } from '@/store/hook';
import { logout } from '@/store/slices/userSlice';
import styles from './ModalMore.module.scss';

const cx = classNames.bind(styles);

interface IModalMore {
  onShowModalMore: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ModalMore = ({ onShowModalMore }: IModalMore) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    toast.success('Đăng xuất thành công');
  };

  return (
    <div onClick={onShowModalMore} className={cx('wrapper')}>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={cx('modal-more')}
      >
        <div className={cx('modal-more-container')}>
          <Button primary to='settings' icon={<SettingIcon />}>
            Settings
          </Button>
          <Button primary to='activity' icon={<ActivityIcon />}>
            Your activity
          </Button>
          <Button primary icon={<SavedIcon />}>
            Saved
          </Button>
          <Button primary icon={<SunIcon />}>
            Switch appearance
          </Button>
          <Button primary icon={<ReportIcon />}>
            Report a problem
          </Button>
          <span className={cx('line-more-big')}></span>
          <Button primary>Switch accounts</Button>
          <span className={cx('line-more-small')}></span>
          <Button primary onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalMore;
