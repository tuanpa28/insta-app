import { IAction, IState } from '@/interfaces/';
import { SET_IS_STATE_SIDEBAR } from './constants';

export const initState = {
  isStateSidebar: false,
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case SET_IS_STATE_SIDEBAR: {
      state.isStateSidebar = action.payload;
      return state;
    }
    default:
      throw new Error('Invalid Action!');
  }
};

export default reducer;
