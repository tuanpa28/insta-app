import { IUser, IUserState } from '@/interfaces/user';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUserState = {
  users: [],
  currentUser: {
    values: null,
    accessToken: '',
  },
  isLogged: false,
  isAdmin: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveListUser(state, action) {
      state.users = action.payload;
    },
    saveUser(state, action) {
      state.currentUser.values = action.payload?.values;
      state.currentUser.accessToken = action.payload?.accessToken;
      localStorage.setItem('accessToken', action.payload?.accessToken);
      state.isLogged = true;
      state.isAdmin = action.payload?.isAdmin;
    },
    logout(state) {
      state.currentUser.values = {} as IUser;
      state.currentUser.accessToken = '';
      localStorage.removeItem('accessToken');
      state.isLogged = false;
      state.isAdmin = null;
    },
  },
});

export const { saveListUser, saveUser, logout } = userSlice.actions;
export default userSlice.reducer;
