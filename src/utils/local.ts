import { IUser } from '@/interfaces';
import { jwtDecode } from 'jwt-decode';

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) return accessToken;
  }
  return null;
};

export const setToken = (accessToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
  }
};

export const decodeAccessToken = () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    return jwtDecode<IUser>(accessToken);
  }
  return null;
};
