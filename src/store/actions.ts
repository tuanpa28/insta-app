import { IUser, IUserUpdate } from '@/interfaces';
import {
  EDIT_USER,
  LOG_OUT,
  REHYDRATE_AUTH_STATE,
  SET_AVATAR,
  SET_IS_STATE_SIDEBAR,
  SET_USER,
  TOGGLE_FOLLOWING_USER,
} from './constants';

export const setIsStateSidebar = (payload: boolean) => ({
  type: SET_IS_STATE_SIDEBAR,
  payload,
});

export const setUser = (payload: IUser) => ({
  type: SET_USER,
  payload,
});

export const rehydrateAuthState = () => ({
  type: REHYDRATE_AUTH_STATE,
  payload: null,
});

export const logOut = () => ({
  type: LOG_OUT,
  payload: null,
});

export const toggleFollowingUser = (payload: string) => ({
  type: TOGGLE_FOLLOWING_USER,
  payload,
});

export const setAvatar = (payload: string) => ({
  type: SET_AVATAR,
  payload,
});

export const editUser = (payload: IUserUpdate) => ({
  type: EDIT_USER,
  payload,
});
