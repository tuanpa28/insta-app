import instance from '@/configs/axios.config';
import { IAuth } from '@/interfaces';

export const login = (user: IAuth) => {
  return instance.post('login', user);
};

export const refreshToken = () => {
  return instance.post('refreshToken');
};

export const logout = () => {
  return instance.delete('logout');
};
