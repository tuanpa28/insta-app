import AccountItem from '@/components/AccountItem';
import { IUser } from '@/interfaces';
import Link from 'next/link';

const dataFake: IUser[] = [
  {
    _id: '1',
    username: 'tuanpa.03',
    email: 'tuanpa@gmail.com',
    full_name: 'Pham Anh Tuan',
    tick: true,
  },
  {
    _id: '2',
    username: '_tte19_',
    email: 'tte19@gmail.com',
    full_name: 'Hoang Thu Thao',
    tick: true,
  },
];

const currentUser: IUser = {
  _id: '1',
  username: 'tuanpa.03',
  email: 'tuanpa@gmail.com',
  full_name: 'Pham Anh Tuan',
};

export const SidebarFeed = () => {
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
      <div>
        {currentUser && (
          <AccountItem
            user={currentUser}
            description={currentUser.full_name}
            hasTippy={false}
            btn={'Switch'}
          />
        )}
      </div>
      <div className='my-4'>
        <div className='flex items-center justify-between ml-1 px-6'>
          <span className='text-sm font-bold text-[rgb(115,115,115)] dark:text-[rgb(168,168,168)]'>
            Suggested for you
          </span>
          <Link
            href={'/'}
            className='text-xs font-bold text-[#000] dark:text-[rgb(245,245,245)] hover:opacity-60'
          >
            See All
          </Link>
        </div>
        <div className='ml-1 mb-1 flex flex-col py-2'>
          {dataFake.map((user: IUser, i) => (
            <AccountItem key={i} user={user} description={'Suggested for you'} btn={'Follow'} />
          ))}
        </div>
      </div>
      <div className='px-6 ml-1 mb-2'>
        <ul className='flex flex-wrap mb-4'>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>About</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Help</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Press</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>API</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Jobs</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Privacy</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Terms</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Locations</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Language</Link>
          </li>
          <li className='text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
            <Link href={'/'}>Meta Verified</Link>
          </li>
        </ul>
        <span className='uppercase text-xs font-medium text-[rgb(119,119,119)] dark:text-[rgb(115,115,115)] last:after:content-none after:content-["\00B7"] after:mx-1 leading-5'>
          © 2024 Social Network
        </span>
      </div>
    </div>
  );
};
