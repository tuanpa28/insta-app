import { SET_IS_STATE_SIDEBAR } from './constants';

export const setIsStateSidebar = (payload: boolean) => ({
  type: SET_IS_STATE_SIDEBAR,
  payload,
});
