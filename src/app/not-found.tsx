import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold mb-10'>Sorry, this page isn&apos;t available.</h2>
      <p className='text-base font-medium text-primary'>
        The link you followed may be broken, or the page may have been removed.{' '}
        <Link className='text-[rgb(0,55,107)]' href='/'>
          Go back to Home.
        </Link>
      </p>
    </div>
  );
}
