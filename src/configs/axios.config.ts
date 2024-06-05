import { getAccessToken, setToken } from '@/utils';
import axios, { AxiosInstance } from 'axios';
import { redirect } from 'next/navigation';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 6000,
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

    if (statusCode === 401 && !prevRequest._retry) {
      prevRequest._retry = true;
      try {
        const response = await instance.post('refreshToken');

        const { accessToken: newAccessToken } = response.data;

        setToken(newAccessToken);

        prevRequest.headers.authorization = `Bearer ${newAccessToken}`;

        return instance(prevRequest);
      } catch (err) {
        return () => {
          localStorage.removeItem('accessToken');
          redirect('login');
        };
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
