import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContextMenuState {
  isActive: boolean,
}

const initialState: ContextMenuState = {
  isActive: false,
};

const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState: initialState,
  reducers: {
    setActive(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
  },
});

export const { setActive } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;