import Link from 'next/link';

const SidebarFeed = () => {
  // const [userSuggested, setSserSuggested] = useState([]);
  // const user = useAppSelector((state) => state.user.currentUser.values);

  // useEffect(() => {
  //   (async () => {
  //     const response = await userService.getUsersSuggested();
  //     setSserSuggested(response?.data?.data);
  //   })();
  // }, []);

  return (
    <div className='hidden lg:flex flex-col w-[var(--feed-sidebar-width)] mt-9 pl-10'>
      <div className=''>
        {/* {user && <AccountItem className='px-4 bg-transparent' user={user} btn='Switch' />} */}
      </div>
      <div className='my-6'>
        <div className='flex items-center justify-between px-4 mt-[6px]'>
          <span className='text-sm font-semibold text-[rgb(115,115,115)]'>Suggested for you</span>
          <Link href={'/'} className='text-xs leading-5 font-semibold text-[#000] hover:opacity-50'>
            See All
          </Link>
        </div>
        <div className='ml-1 mb-1 flex flex-col items-stretch py-2'>
          {/* {userSuggested?.map((user: IUser, index: number) => (
            <AccountItem
              key={index}
              className='px-4 bg-transparent'
              user={user}
              btn='follow'
              hasTooltip
            />
          )} */}
        </div>
      </div>
      <div className='px-4 mb-2'>
        <ul className='flex flex-wrap mb-4'>
          <li className='text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>About</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Help</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Press</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>API</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Jobs</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Privacy</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Terms</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Locations</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Language</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Meta Verified</Link>
          </li>
        </ul>
        <span className='uppercase text-xs font-medium text-[rgb(119,119,119)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
          © 2024 Social Network
        </span>
      </div>
    </div>
  );
};

export default SidebarFeed;
