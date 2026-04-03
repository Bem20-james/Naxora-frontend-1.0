import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../store";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  if (!accessToken) return <Navigate to="/auth/login" />;
  return children;
};
