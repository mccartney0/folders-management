import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string;
  password: string;
}

const INITIAL_STATE: AuthState = {
  username: '7dev',
  password: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    logIn(state: AuthState, { payload }: PayloadAction<AuthState>) {
      const { username, password } = payload;

      localStorage.setItem('username', username);

      return {
        username,
        password,
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

export const useAuth = (state: { auth: AuthState }) => {
  return state.auth
  
};