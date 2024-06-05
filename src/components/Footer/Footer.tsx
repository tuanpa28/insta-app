import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-start px-4 pb-6'>
      <div className='mt-6 flex items-center justify-center flex-wrap'>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Meta</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>About</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Blog</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Jobs</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Help</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>API</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Privacy</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Terms</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Locations</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Instagram Lite</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Threads</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Contact Uploading & Non-Users</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Meta Verified</Link>
        </div>
        {/* item */}
        <div className='mx-2 mb-3 text-xs font-medium text-[rgb(115,115,115)]'>
          <Link href={'/'}>Threads</Link>
        </div>
      </div>
      <div className='flex items-center justify-center text-xs font-medium text-[rgb(115,115,115)]'>
        <div className='flex items-center justify-start cursor-pointer'>
          English <ChevronDownIcon className=' w-[18px] h-[18px]' />
        </div>
        <span className='ml-4'>© 2024 Social Network Clone By Pham Anh Tuan</span>
      </div>
    </div>
  );
};

export default Footer;
