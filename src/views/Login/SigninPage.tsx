'use client';

import { joiResolver } from '@hookform/resolvers/joi';
import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

import { IAuth, IUser } from '@/interfaces';
import { authService } from '@/services';
import { useAppDispatch } from '@/store/hook';
import { logout, saveUser } from '@/store/slices/userSlice';
import { signInSchema } from '@/validates';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const SigninPage = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(signInSchema),
  });

  const onSubmit = async (values: IAuth) => {
    const data = await authService.login(values);
    if (data) {
      const accessToken = data?.data?.accessToken;

      const decode: IUser = jwtDecode(accessToken);

      dispatch(saveUser({ values: decode, accessToken, isAdmin: decode?.isAdmin }));
      toast.success('Đăng nhập thành công!');
      redirect('/');
    }
  };

  const handleLoginGoogle = () => {
    const popupWidth = 500;
    const popupHeightPercentage = 75; // Chiều cao là 75% của chiều cao màn hình
    const screenWidth = window.innerWidth;
    const screenHeight = screen.availHeight;
    const popupHeight = (screenHeight * popupHeightPercentage) / 100;
    const left = (screenWidth - popupWidth) / 2;
    const top = (screenHeight - popupHeight) / 2;

    // Mở cửa sổ popup
    window.open(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/google`,
      '_blank',
      `width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}`,
    );
  };

  useEffect(() => {
    (async () => {
      await authService.logout();
      dispatch(logout());
    })();
  }, [dispatch]);

  useEffect(() => {
    const handleMessage = (event: {
      data: {
        type: string;
        accessToken?: string;
      };
    }) => {
      if (event.data && event.data.type === 'success') {
        const accessToken = event.data.accessToken || '';

        const decode: IUser = jwtDecode(accessToken);

        dispatch(saveUser({ values: decode, accessToken, isAdmin: decode?.isAdmin }));
        toast.success('Đăng nhập thành công!');
        redirect('/');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, [dispatch]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('bg-img')}>{/* <Image src={bg_login} alt='' /> */}</div>
      <div className={cx('main')}>
        <span className={cx('title')}>Log in with your account</span>
        <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
          <div className={cx('input-item')}>
            <input type='text' {...register('emailOrUsername')} placeholder='Username or Email' />
            {errors.emailOrUsername && (
              <span className={cx('error')}>{errors.emailOrUsername.message}</span>
            )}
          </div>
          <div className={cx('input-item')}>
            <input type='password' {...register('password')} placeholder='Password' />
            {errors.password && <span className={cx('error')}>{errors.password.message}</span>}
          </div>
          <button
            type='submit'
            className={cx('btn-submit', { disable: Object.keys(errors).length > 0 })}
          >
            <span className={cx('text')}>Log in</span>
          </button>
        </form>
        <span className={cx('btn-forgot-pass')}>
          <Link href={'/'}>Forgot password?</Link>
        </span>
        <div className={cx('line')}>
          <span className={cx('text')}>or</span>
        </div>
        <div className={cx('another-login')} onClick={handleLoginGoogle}>
          {/* <Image src={gg_logo} alt='' className={cx('logo')} /> */}
          <span className={cx('text')}>Continue with Google</span>
          <span className={cx('icon')}>{/* <FaAngleRight /> */}</span>
        </div>
      </div>
      <footer className={cx('footer')}>
        <ul className={cx('list-content')}>
          <li className={cx('item')}>© 2023</li>
          <li className={cx('item')}>
            <Link className={cx('link')} href={'/'}>
              Threads Terms
            </Link>
          </li>
          <li className={cx('item')}>
            <Link className={cx('link')} href={'/'}>
              Privacy Policy
            </Link>
          </li>
          <li className={cx('item')}>
            <Link className={cx('link')} href={'/'}>
              Cookies Policy
            </Link>
          </li>
          <li className={cx('item')}>
            <span className={cx('link')}>Report a problem</span>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default SigninPage;
