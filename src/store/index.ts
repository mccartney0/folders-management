import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth';
import directoriesReducer from './directories';
import contextMenuReducer from './context-menu';

const store = configureStore({
  reducer: {
    auth: authReducer,
    directories: directoriesReducer,
    contextMenu: contextMenuReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;