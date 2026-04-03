import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "./authTypes";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user?: User;
        accessToken: string;
        refreshToken?: string;
      }>,
    ) => {
      if (action.payload.user) state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      if (action.payload.refreshToken)
        state.refreshToken = action.payload.refreshToken;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = "idle";
    },
    setStatus: (state, action: PayloadAction<AuthState["status"]>) => {
      state.status = action.payload;
    },
  },
});

export const { setCredentials, setUser, logout, setStatus } = authSlice.actions;

export default authSlice.reducer;
