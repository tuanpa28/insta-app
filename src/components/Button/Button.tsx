import classNames from 'classnames/bind';
import Link from 'next/link';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface IButton {
  to?: string;
  href?: string;
  primary?: boolean;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  to,
  href,
  primary = false,
  children,
  className,
  icon,
  onClick,
  ...passProps
}: IButton) => {
  let Comp: any = 'button';
  const props: any = {
    onClick,
    ...passProps,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  const classes = cx('wrapper', {
    [className!]: className,
    primary,
  });

  return (
    <Comp className={classes} {...props}>
      {icon && <span className={cx('icon')}>{icon}</span>}
      <span className={cx('title')}>{children}</span>
    </Comp>
  );
};

export default Button;
