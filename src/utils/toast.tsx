import { type ReactNode } from "react";
import { toast, type ToastOptions } from "react-toastify";
import CustomToast from "../components/CustomToast";

const baseConfig: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: true,
  closeButton: false,
  pauseOnHover: true,
};

//function type to avoid repetition
type ToastFunction = (message: ReactNode, title?: string) => void;

interface ShowToast {
  success: ToastFunction;
  error: ToastFunction;
  warning: ToastFunction;
  info: ToastFunction;
}

export const showToast: ShowToast = {
  success: (message, title = "Success") =>
    toast(
      <CustomToast severity="success" title={title} message={message} />,
      baseConfig,
    ),

  error: (message, title = "Error") =>
    toast(
      <CustomToast severity="error" title={title} message={message} />,
      baseConfig,
    ),

  warning: (message, title = "Warning") =>
    toast(
      <CustomToast severity="warning" title={title} message={message} />,
      baseConfig,
    ),

  info: (message, title = "Info") =>
    toast(
      <CustomToast severity="info" title={title} message={message} />,
      baseConfig,
    ),
};
