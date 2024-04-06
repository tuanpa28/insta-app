'use client';

import { useAppSelector } from '@/store/hook';
import { redirect } from 'next/navigation';

export const PrivateRouteProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const isLogged = useAppSelector((state) => state.user.isLogged);

  if (!isLogged) return redirect('/login');

  return <>{children}</>;
};
