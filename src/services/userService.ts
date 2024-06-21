import instance from '@/configs/axios.config';

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

export const getUsersSuggested = (params: { limit?: number }) => {
  return instance.get('user/suggested/results', { params });
};

export const followUser = (userId: string) => {
  return instance.put(`user/follow/${userId}`);
};
