import { IUser } from './user';

export interface IState {
  isStateSidebar: boolean;
  user: IUser | null;
  isSignedIn: boolean;
}

export interface IAction {
  type: string;
  payload: any;
}
