'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold text-red-600 mb-4'>Something went wrong!</h2>
      <Button onClick={() => reset()} variant='secondary'>
        Try again
      </Button>
    </div>
  );
}
