import { IUser } from '@/interfaces';
import { jwtDecode } from 'jwt-decode';

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const accessToken =  localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        return JSON.parse(accessToken);
      } catch (error) {
        console.error('Error parsing accessToken:', error);
        return null;
      }
    }
  }
  return null;
};

export const setToken = (accessToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
  }
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }
};

export const decodeAccessToken = () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    return jwtDecode<IUser>(accessToken);
  }
  return null;
};
