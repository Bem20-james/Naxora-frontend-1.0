import { Alert, AlertTitle, type AlertColor } from "@mui/material";
import { type ReactNode } from "react";

interface CustomToastProps {
  title?: string;
  message: ReactNode;
  severity?: AlertColor;
}

const CustomToast = ({
  title,
  message,
  severity = "info",
}: CustomToastProps) => {
  return (
    <Alert
      severity={severity}
      variant="filled"
      sx={{
        minWidth: 320,
        borderRadius: 2,
        fontWeight: 500,
        alignItems: "center",
      }}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
};

export default CustomToast;
