'use client';

import { userService } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { saveListUser } from '@/store/slices/userSlice';
import { useEffect, useState } from 'react';

const useGetListUser = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.user.users);

  useEffect(() => {
    setisLoading(true);
    (async () => {
      try {
        const response = await userService.getListUser();
        const users = response?.data.data;
        dispatch(saveListUser(users));
        setisLoading(false);
      } catch (error: any) {
        setisLoading(false);
        setError(error?.response?.data?.message);
      }
    })();
  }, [dispatch]);

  return { isLoading, error, data };
};

export default useGetListUser;
