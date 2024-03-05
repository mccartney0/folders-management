import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Directory } from "../../types/types";

interface DirectoriesState {
  directories: Directory[];
}

const initialState: DirectoriesState = {
  directories: [],
};

const directoriesSlice = createSlice({
  name: "directories",
  initialState,
  reducers: {
    setDirectories(state, action: PayloadAction<Directory[]>) {
      state.directories = action.payload;
    },
  },
});

export const { setDirectories } = directoriesSlice.actions;
export default directoriesSlice.reducer;
