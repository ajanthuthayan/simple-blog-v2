import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (prevState) => {
      let newState = { ...prevState };
      newState.isLoggedIn = true;
      return newState;
    },
    logout: (prevState) => {
      let newState = { ...prevState };
      newState.isLoggedIn = false;
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
