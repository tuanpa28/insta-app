import instance from '@/configs/axios.config';
import { toast } from 'react-toastify';

const getListUser = async () => {
  try {
    const respon = await instance.get('user');
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

const search = async (q: string) => {
  try {
    const respon = await instance.get('user/search/results', {
      params: {
        q,
      },
    });
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

const getUsersSuggested = async () => {
  try {
    const respon = await instance.get('user/suggested/results');
    return respon;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

export { search, getUsersSuggested, getListUser };
