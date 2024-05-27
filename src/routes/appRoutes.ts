// import {
//   CART_ENDPOINT,
//   CHANGE_PASSWORD_ENDPOINT,
//   IMAGES_ENDPOINT,
//   ORDER_ENDPOINT,
//   PROFILE_ENDPOINT,
//   REVIEW_ORDER_ENDPOINT,
//   UPDATE_PROFILE_ADDRESS_ENDPOINT,
//   UPDATE_PROFILE_INFO_ENDPOINT,
// } from '@/constants';
import { RootPath } from '@/constants/enum';

export const publicRoutes = [
  '',
  RootPath.Home,
  RootPath.ProductDetails,
  RootPath.ProductList,
  RootPath.Search,
] as string[];

export const authRoutes = [
  RootPath.Login,
  RootPath.Register,
  '/auth/error',
  '/auth/reset',
] as string[];

export const needAuthRoutes = [
  RootPath.Cart,
  RootPath.Profile,
  RootPath.Order,
  RootPath.Payment,
] as string[];

export const apiAuthRoute = [
  '/api/auth',
  //   CHANGE_PASSWORD_ENDPOINT,
  //   IMAGES_ENDPOINT,
  //   CART_ENDPOINT,
  //   PROFILE_ENDPOINT,
  //   UPDATE_PROFILE_ADDRESS_ENDPOINT,
  //   UPDATE_PROFILE_INFO_ENDPOINT,
  //   ORDER_ENDPOINT,
  //   REVIEW_ORDER_ENDPOINT,
] as string[];
