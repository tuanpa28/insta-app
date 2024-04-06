'use client';

import { useAppSelector } from '@/store/hook';
import { redirect } from 'next/navigation';

export const PrivateAdminProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { isAdmin } = useAppSelector((state) => state.user);

  if (!isAdmin) return redirect('/');

  return <>{children}</>;
};
