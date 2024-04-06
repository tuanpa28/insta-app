import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

interface IWrapper {
  children: React.ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: IWrapper) => {
  return <div className={cx('wrapper', className)}>{children}</div>;
};

export default Wrapper;
