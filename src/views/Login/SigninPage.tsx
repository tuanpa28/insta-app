import Link from 'next/link';

const SigninPage = () => {
  // const dispatch = useAppDispatch();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   mode: 'onChange',
  //   resolver: joiResolver(signInSchema),
  // });

  // const onSubmit = async (values: IAuth) => {
  //   const data = await authService.login(values);
  //   if (data) {
  //     const accessToken = data?.data?.accessToken;

  //     const decode: IUser = jwtDecode(accessToken);

  //     dispatch(saveUser({ values: decode, accessToken, isAdmin: decode?.isAdmin }));
  //     toast.success('Đăng nhập thành công!');
  //     redirect('/');
  //   }
  // };

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
  //   (async () => {
  //     await authService.logout();
  //     dispatch(logout());
  //   })();
  // }, [dispatch]);

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
    <div className='w-full overflow-hidden relative flex items-center justify-center flex-col min-h-screen'>
      <div className='absolute top-0 z-0'>
        {/* <Image src={bg_login} className='w-[1785px] h-[510px]' alt='' /> */}
      </div>
      <div className='w-full max-w-[418px] p-6 flex flex-col items-center justify-center z-[1] mt-[15vh]'>
        <span className='block text-base font-bold text-center text-[#000] mb-2.5'>
          Log in with your account
        </span>
        <form className='w-full'>
          <div className='w-full mb-2'>
            <input
              className='px-4 pt-5 mb-3 w-full border border-solid border-transparent rounded-xl text-base text-[#000 outline-none] bg-[rgb(245,245,245)] focus:border-[rgba(0,0,0,0.15)]'
              type='text'
              placeholder='Username or Email'
            />
            {/* {errors.emailOrUsername && (
              <span className='inline-block mt-1 ml-2.5 text-sm font-semibold text-[#dc2626]'>{errors.emailOrUsername.message}</span>
            )} */}
          </div>
          <div className='w-full mb-2'>
            <input
              className='px-4 pt-5 mb-3 w-full border border-solid border-transparent rounded-xl text-base text-[#000 outline-none] bg-[rgb(245,245,245)] focus:border-[rgba(0,0,0,0.15)]'
              type='password'
              placeholder='Password'
            />
            {/* {errors.password && <span className='inline-block mt-1 ml-2.5 text-sm font-semibold text-[#dc2626]'>{errors.password.message}</span>} */}
          </div>
          <button
            type='submit'
            // className='btn-submit', { disable: Object.keys(errors).length > 0 })}
            className='p-4 w-full h-[54px] rounded-xl outline-none text-base font-semibold cursor-pointer border border-solid border-[rgba(0,0,0,0.4)] bg-[rgb(0,0,0)] active:scale-95'
          >
            <span className='text-[#fff] block'>Log in</span>
          </button>
        </form>
        <span className='mt-4 w-full text-base font-normal text-center text-[rgb(153,153,153)]'>
          <Link href={'/'}>Forgot password?</Link>
        </span>
        <div className='relative py-2 my-6 w-full after:contents after:absolute after:top-1/2 after:left-0 after:right-0 after:h-[1px] bg-[rgba(0,0,0,0.15)]'>
          <span className='absolute block top-1/2 left-1/2 bg-[#fff] px-4 text-base font-normal text-[rgb(153,153,153)] -translate-x-[50%] -translate-y-[34%] z-[1]'>
            or
          </span>
        </div>
        <div className='w-full p-5 rounded-2xl border border-solid border-[rgba(0,0,0,0.15)] flex items-center justify-between cursor-pointer active:scale-95'>
          {/* <Image src={gg_logo} alt='' className='w-[45px] h-[45px]' /> */}
          <span className='text-[#000] text-base font-bold block '>Continue with Google</span>
          <span className='text-lg p-2 text-[rgb(153,153,153)]'>{/* <FaAngleRight /> */}</span>
        </div>
      </div>
      <footer className='absolute bottom-0 w-full h-[70px] px-4 flex items-center justify-center'>
        <ul className='mx-auto text-center'>
          <li className='inline-block text-xs font-normal mx-1.5 text-[rgb(153,153,153)]'>
            © 2023
          </li>
          <li className='inline-block text-xs font-normal mx-1.5 text-[rgb(153,153,153)]'>
            <Link className='hover:cursor-pointer underline' href={'/'}>
              Threads Terms
            </Link>
          </li>
          <li className='inline-block text-xs font-normal mx-1.5 text-[rgb(153,153,153)]'>
            <Link className='hover:cursor-pointer underline' href={'/'}>
              Privacy Policy
            </Link>
          </li>
          <li className='inline-block text-xs font-normal mx-1.5 text-[rgb(153,153,153)]'>
            <Link className='hover:cursor-pointer underline' href={'/'}>
              Cookies Policy
            </Link>
          </li>
          <li className='inline-block text-xs font-normal mx-1.5 text-[rgb(153,153,153)]'>
            <span className='hover:cursor-pointer underline'>Report a problem</span>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default SigninPage;
