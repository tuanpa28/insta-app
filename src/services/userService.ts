import instance from '@/configs/axios.config';
import { IUserUpdate } from '@/interfaces';

export const getListUser = () => {
  return instance.get('user');
};

export const search = (q: string) => {
  return instance.get('user/search/results', {
    params: {
      q,
    },
  });
};

export const getUserByUserName = (userName: string) => {
  return instance.get(`user/${userName}/username`);
};

export const getUsersSuggested = (params: { limit?: number }) => {
  return instance.get('user/suggested/results', { params });
};

export const followUser = (userId: string) => {
  return instance.put(`user/follow/${userId}`);
};

export const updateUser = (userId: string, dataUpdate: IUserUpdate) => {
  return instance.put(`user/${userId}`, dataUpdate);
};
