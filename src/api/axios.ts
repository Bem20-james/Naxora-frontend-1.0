import axios from "axios";
import { store } from "../store";
import { SERVER_BASE_URL } from "../config/paths";
import { setCredentials } from "../features/auth/authSlice";
import { refreshTokenRequest } from "../features/auth/authService";

const api = axios.create({
  baseURL: SERVER_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const data = await refreshTokenRequest();

      store.dispatch(
        setCredentials({
          user: store.getState().auth.user!,
          accessToken: data.accessToken,
        }),
      );

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
