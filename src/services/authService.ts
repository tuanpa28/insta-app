import instance from '@/configs/axios.config';
import { IAuth } from '@/interfaces';
import { toast } from 'react-toastify';

const login = async (user: IAuth) => {
  try {
    const respon = await instance.post('login', user);
    return respon;
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
};

const refreshToken = async () => {
  try {
    const respon = await instance.post('refreshToken');
    return respon;
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
};

const logout = async () => {
  try {
    await instance.delete('logout');
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
};

export { login, refreshToken, logout };
