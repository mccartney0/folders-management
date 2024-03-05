import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface AuthState {
  username: string;
  password: string | null;
  token: string | null;
  refreshToken: string | null;
}

const INITIAL_STATE: AuthState = {
  username: '7dev',
  password: null,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    logIn(state, { payload }: PayloadAction<AuthState>) {
      const { username, password, token, refreshToken } = payload;

      localStorage.setItem('username', username);
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('refresh', JSON.stringify(refreshToken));

      return {
        username,
        password,
        token,
        refreshToken,
      }
    },
    logOut() {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');

      return INITIAL_STATE;
    },
    setToken(state, { payload }: PayloadAction<string | null>) {
      state.token = payload;
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut, setToken } = authSlice.actions;

export const useAuth = (state: RootState) => state.auth;