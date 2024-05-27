'use client';

import React from 'react';
import { Provider } from 'react-redux';

// import { useAppDispatch } from '@/store/hook';
// import { saveUser } from '@/store/slices/userSlice';
import store from '@/store/store';
// import { decodeAccessToken, getAccessToken } from '@/utils';
// import { IUser } from '@/interfaces';

export const ReduxProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // const dispatch = useAppDispatch();
  // const accessToken = getAccessToken();
  // if (accessToken) {
  //   const decode: IUser | null = decodeAccessToken();
  //   if (decode) {
  //     dispatch(saveUser({ values: decode, accessToken, isAdmin: decode?.isAdmin }));
  //   }
  // }

  return <Provider store={store}>{children}</Provider>;
};
