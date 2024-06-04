'use client';

import { produce } from 'immer';
import { useReducer } from 'react';

import StoreContext from '@/store/context';
import reducer, { initState } from '@/store/reducer';

export const StoreProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [state, dispatch] = useReducer(produce(reducer), initState);

  return <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>;
};
