import { IAction, IState } from '@/interfaces/';
import { refreshToken } from '@/services/authService';
import { decodeAccessToken, removeToken, setToken } from '@/utils';
import {
  LOG_OUT,
  REHYDRATE_AUTH_STATE,
  SET_AVATAR,
  SET_IS_STATE_SIDEBAR,
  SET_USER,
  TOGGLE_FOLLOWING_USER,
} from './constants';

export const initState = {
  isStateSidebar: false,
  user: null,
  isSignedIn: false,
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case SET_IS_STATE_SIDEBAR: {
      state.isStateSidebar = action.payload;
      return state;
    }
    case SET_USER: {
      state.user = action.payload;
      state.isSignedIn = true;
      return state;
    }
    case REHYDRATE_AUTH_STATE: {
      const userDeCode = decodeAccessToken();
      if (userDeCode) {
        state.user = userDeCode;
        state.isSignedIn = true;
      }
      return state;
    }
    case LOG_OUT: {
      removeToken();
      state.user = null;
      state.isSignedIn = false;
      return state;
    }
    case TOGGLE_FOLLOWING_USER: {
      if (state.user?.followings) {
        const index = state.user.followings.indexOf(action.payload);
        if (index !== -1) {
          state.user.followings.splice(index, 1);
        } else {
          state.user.followings.push(action.payload);
        }
      }
      return state;
    }
    case SET_AVATAR: {
      state.user && (state.user.profile_image = action.payload);
      refreshToken().then((response) => {
        const { accessToken } = response.data;

        setToken(accessToken);
      });

      return state;
    }
    default:
      throw new Error('Invalid Action!');
  }
};

export default reducer;
