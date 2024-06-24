'use client';

import { useEffect } from 'react';

import { actions, useStore } from '@/store';
import { MessagesPageView } from '@/views/Messages';

const MessagesPage = () => {
  const [, dispatch] = useStore();

  useEffect(() => {
    dispatch(actions.setIsStateSidebar(true));
  }, [dispatch]);

  return <MessagesPageView />;
};

export default MessagesPage;
