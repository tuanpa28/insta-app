'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import LoadingPage from '@/app/loading';
import { RootPath } from '@/constants/enum';
import { useStore } from '@/store';

export const ProtectedProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [state] = useStore();
  const { push } = useRouter();
  const { isSignedIn } = state;

  useEffect(() => {
    if (!isSignedIn) {
      const timeout = setTimeout(() => {
        push(RootPath.SignIn);
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isSignedIn, push]);

  return !isSignedIn ? <LoadingPage /> : <>{children}</>;
};
