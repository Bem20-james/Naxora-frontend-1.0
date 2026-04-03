import { Typography } from "@mui/material";

export const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: "0.75rem",
      fontWeight: 700,
      color: "#555",
      mb: 0.7,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    }}
  >
    {children}
  </Typography>
);
