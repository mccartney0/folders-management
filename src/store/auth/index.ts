import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface AuthState {
  username: string;
  password: string | null;
  token: string | null;
}

const INITIAL_STATE: AuthState = {
  username: '7dev',
  password: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    logIn(state, { payload }: PayloadAction<AuthState>) {
      const { username, password, token } = payload;

      localStorage.setItem('username', username);
      localStorage.setItem('token', JSON.stringify(token));

      return {
        username,
        password,
        token,
      }
    },
    logOut() {
      localStorage.removeItem('username');
      localStorage.removeItem('token');

      return INITIAL_STATE;
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut } = authSlice.actions;

export const useAuth = (state: RootState) => state.auth;