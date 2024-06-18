import instance from '@/configs/axios.config';
import { IAuthLogin } from '@/interfaces';

export const login = (user: IAuthLogin) => {
  return instance.post('auth/login', user);
};

export const refreshToken = () => {
  return instance.post('auth/refreshToken');
};

export const logOut = () => {
  return instance.delete('auth/logout');
};
