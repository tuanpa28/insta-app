'use client';

import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { ChevronRightIcon, LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { RootPath } from '@/constants/enum';
import { IAuthLogin, IUser } from '@/interfaces';
import { login } from '@/services/authService';
import { actions, useStore } from '@/store';
import { setToken } from '@/utils';
import { signInSchema } from '@/validates';

type FormData = {
  emailOrUsername: string;
  password: string;
};

const SigninPage = () => {
  const [, dispatch] = useStore();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: joiResolver(signInSchema),
    defaultValues: {
      emailOrUsername: process.env.NEXT_PUBLIC_USERNAME ?? '',
      password: process.env.NEXT_PUBLIC_PASSWORD ?? '',
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (values: IAuthLogin) => login(values),
    onSuccess: ({ data }) => {
      const userDeCode: IUser = jwtDecode(data.accessToken);

      dispatch(actions.setUser(userDeCode));
      setToken(data.accessToken);
      toast.success('Đăng nhập thành công!');
      push(RootPath.Home);
    },
    onError: (error: any) => {
      console.log('error:', error);
      toast.error(
        error?.response?.data?.message ||
          'Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin đăng nhập!',
      );
    },
  });

  // const handleLoginGoogle = () => {
  //   const popupWidth = 500;
  //   const popupHeightPercentage = 75; // Chiều cao là 75% của chiều cao màn hình
  //   const screenWidth = window.innerWidth;
  //   const screenHeight = screen.availHeight;
  //   const popupHeight = (screenHeight * popupHeightPercentage) / 100;
  //   const left = (screenWidth - popupWidth) / 2;
  //   const top = (screenHeight - popupHeight) / 2;

  //   // Mở cửa sổ popup
  //   window.open(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/google`,
  //     '_blank',
  //     `width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}`,
  //   );
  // };

  // useEffect(() => {
  //   const handleMessage = (event: {
  //     data: {
  //       type: string;
  //       accessToken?: string;
  //     };
  //   }) => {
  //     if (event.data && event.data.type === 'success') {
  //       const accessToken = event.data.accessToken || '';

  //       const decode: IUser = jwtDecode(accessToken);

  //       dispatch(saveUser({ values: decode, accessToken, isAdmin: decode?.isAdmin }));
  //       toast.success('Đăng nhập thành công!');
  //       redirect('/');
  //     }
  //   };

  //   window.addEventListener('message', handleMessage);

  //   return () => window.removeEventListener('message', handleMessage);
  // }, [dispatch]);

  return (
    <div className='w-full relative flex items-center justify-center flex-col min-h-screen'>
      <div className='w-full max-w-[418px] p-4 flex flex-col items-center justify-center z-10'>
        <span className='block text-lg font-bold text-center text-[#000] mb-2.5'>
          Log in with your account
        </span>
        <form className='w-full mb-4' onSubmit={handleSubmit((values) => mutateAsync(values))}>
          <div className='w-full mb-3'>
            <input
              className='px-4 py-3 w-full border border-solid border-transparent rounded-xl text-base text-[#000] outline-none bg-[rgb(245,245,245)] focus:border-[rgba(0,0,0,0.15)]'
              type='text'
              placeholder='User Name or Email'
              {...register('emailOrUsername')}
            />
            {errors.emailOrUsername && (
              <span className='inline-block mt-1 ml-2.5 text-sm font-semibold text-[#dc2626]'>
                {errors?.emailOrUsername.message}
              </span>
            )}
          </div>
          <div className='w-full mb-3'>
            <input
              className='px-4 py-3 w-full border border-solid border-transparent rounded-xl text-base text-[#000] outline-none bg-[rgb(245,245,245)] focus:border-[rgba(0,0,0,0.15)]'
              type='password'
              placeholder='Password'
              {...register('password')}
            />
            {errors.password && (
              <span className='inline-block mt-1 ml-2.5 text-sm font-semibold text-[#dc2626]'>
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type='submit'
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={`${
              isSubmitting ||
              (Object.keys(errors).length > 0
                ? 'cursor-default'
                : 'hover:scale-[1.02] cursor-pointer active:scale-[.98]')
            } flex items-center justify-center px-4 py-3 w-full transition-all rounded-xl outline-none text-base font-semibold border border-solid border-[rgba(0,0,0,0.4)] bg-[rgb(0,0,0)]`}
          >
            {isSubmitting ? (
              <LoaderCircleIcon color='#fff' width={24} height={24} className='animate-spinner' />
            ) : (
              <span className='text-[#fff] block'>Log in</span>
            )}
          </button>
        </form>
        <span className='mb-4 w-full text-sm font-normal text-center text-[rgb(153,153,153)]'>
          <Link href={'/sign-in'}>Forgot password?</Link>
        </span>
        <div className='relative mb-6 w-full h-[1px] bg-[rgba(0,0,0,0.15)]'>
          <span className='absolute block left-1/2 bg-[#fff] px-4 text-base font-normal text-[rgb(153,153,153)] -translate-x-[50%] -translate-y-[50%]'>
            or
          </span>
        </div>
        <div className='w-full p-5 rounded-2xl border border-solid border-[rgba(0,0,0,0.15)] flex items-center justify-between cursor-pointer active:scale-[.98]'>
          <Image
            src={'/images/gg-logo.jpg'}
            width={200}
            height={200}
            alt=''
            className='w-[45px] h-[45px]'
          />
          <span className='text-[#000] text-base font-bold block'>Continue with Google</span>
          <span className='text-lg ml-2 text-[rgb(153,153,153)]'>
            <ChevronRightIcon />
          </span>
        </div>
      </div>
      <footer className='absolute bottom-0 w-full h-[70px] px-4 flex items-center justify-center'>
        <ul className='mx-auto text-center'>
          <li className='inline-block text-xs font-normal mx-1.5 text-[rgb(153,153,153)]'>
            © 2024
          </li>
          <li className='inline-block text-xs font-normal mx-1.5 text-[rgb(153,153,153)] hover:underline hover:cursor-pointer'>
            <Link href={'/'}>Threads Terms</Link>
          </li>
          <li className='inline-block text-xs font-normal mx-1.5 text-[rgb(153,153,153)] hover:underline hover:cursor-pointer'>
            <Link href={'/'}>Privacy Policy</Link>
          </li>
          <li className='inline-block text-xs font-normal mx-1.5 text-[rgb(153,153,153)] hover:underline hover:cursor-pointer'>
            <Link href={'/'}>Cookies Policy</Link>
          </li>
          <li className='inline-block text-xs font-normal mx-1.5 text-[rgb(153,153,153)] hover:underline hover:cursor-pointer'>
            <span>Report a problem</span>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default SigninPage;
