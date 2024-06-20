import axios, { AxiosInstance } from 'axios';

import { RootPath } from '@/constants/enum';
import { logOut, refreshToken } from '@/services/authService';
import { getAccessToken, removeToken, setToken } from '@/utils';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error.config;
    const statusCode = error.response?.status || error.response?.statusCode;

    if (statusCode === 401 && !prevRequest?._retry) {
      prevRequest._retry = true;
      try {
        const response = await refreshToken();

        const { accessToken } = response.data;

        setToken(accessToken);

        prevRequest.headers.authorization = `Bearer ${accessToken}`;

        return instance(prevRequest);
      } catch (err) {
        removeToken();
        await logOut();
        window.location.href = RootPath.SignIn;
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
