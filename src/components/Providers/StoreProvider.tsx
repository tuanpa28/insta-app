'use client';

import { produce } from 'immer';
import { useEffect, useReducer } from 'react';

import { rehydrateAuthState } from '@/store/actions';
import StoreContext from '@/store/context';
import reducer, { initState } from '@/store/reducer';

export const StoreProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [state, dispatch] = useReducer(produce(reducer), initState);

  useEffect(() => {
    dispatch(rehydrateAuthState());
  }, [dispatch]);

  return <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>;
};
