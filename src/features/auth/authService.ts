import api from "../../api/axios";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const registerRequest = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const refreshTokenRequest = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};
