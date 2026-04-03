import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { registerRequest, loginRequest } from "../features/auth/authService";
import { showToast } from "../utils/toast";
import { type RegisterPayload } from "../features/auth/authTypes";
import { setCredentials, logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterPayload) => registerRequest(data),

    onSuccess: (data) => {
      console.log("req Response:", data);
      if (data.success) {
        showToast.success(data.message);
        return;
      }
      showToast.error(data.message);
    },

    onError: (error) => {
      console.error("Error:", error);

      if (axios.isAxiosError(error)) {
        const errors = error.response?.data;

        if (errors && typeof errors === "object") {
          Object.values(errors).forEach((fieldError: any) => {
            if (Array.isArray(fieldError)) {
              showToast.error(fieldError[0]);
            }
          });
        } else {
          showToast.error("Registration failed");
        }
      } else {
        showToast.error("Something went wrong");
      }
    },
  });
}

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: (data) => {
      if (data.success) {
        console.log("Login Response:", data);

        const result = data.data;
        console.log("Login Response:", result);
        showToast.success(data.message);

        dispatch(
          setCredentials({
            user: result.user,
            accessToken: result.access,
            refreshToken: result.refresh,
          }),
        );

        const user = result.user;

        if (user.role === "admin") {
          navigate("/dashboard/admin/overview");
        } else if (user.role === "brand") {
          navigate("/dashboard/brand/overview");
        } else {
          navigate("/dashboard/creator/overview");
        }
      } else {
        showToast.error("login failed");
      }
    },

    onError: (error) => {
      console.error("Login Error:", error);

      if (axios.isAxiosError(error)) {
        const errors = error.response?.data;

        if (errors && typeof errors === "object") {
          Object.values(errors).forEach((fieldError: any) => {
            if (Array.isArray(fieldError)) {
              showToast.error(fieldError[0]);
            }
          });
        } else {
          showToast.error("Login failed");
        }
      } else {
        showToast.error("Something went wrong");
      }
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.post("/auth/logout");
    },

    onSuccess: () => {
      dispatch(logout());
      localStorage.removeItem("token");
      queryClient.clear();
      navigate("/auth/login");
    },

    onError: () => {
      dispatch(logout());
      localStorage.removeItem("token");
      navigate("/auth/login");
    },
  });
};
