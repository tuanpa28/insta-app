'use client';

import { GridLoader } from 'react-spinners';

export default function LoadingPage() {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <GridLoader color='#fd1d1d' size={28} />
    </div>
  );
}
