import api from "../../api/axios";
import {
  type RegisterPayload,
  type RegisterResponse,
  type LoginPayload,
  type LoginResponse,
} from "./authTypes";

export const loginRequest = async (
  data: LoginPayload,
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login/", data);
  return response.data;
};

export const registerRequest = async (
  data: RegisterPayload,
): Promise<RegisterResponse> => {
  const response = await api.post("/auth/register/", data);
  return response.data;
};

export const refreshTokenRequest = async () => {
  const response = await api.post("/auth/token/refresh/");
  return response.data;
};
