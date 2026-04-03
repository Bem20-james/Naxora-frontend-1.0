import { Box, Typography } from "@mui/material";

import { ColorPallete } from "../../config/colors";

const AnalyticPill = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <Box
    sx={{
      background: "#f7f7fc",
      borderRadius: "10px",
      p: 1.5,
      flex: 1,
      minWidth: 80,
    }}
  >
    <Box sx={{ color: ColorPallete.primary.main, mb: 0.5 }}>{icon}</Box>
    <Typography
      sx={{
        fontSize: "1rem",
        fontWeight: 800,
        color: "#0f0f1a",
        lineHeight: 1,
      }}
    >
      {value}
    </Typography>
    <Typography
      sx={{ fontSize: "0.65rem", color: "#aaa", mt: 0.3, fontWeight: 500 }}
    >
      {label}
    </Typography>
  </Box>
);

export default AnalyticPill;
