import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export interface Criterion {
  label: string;
  met: boolean;
}

export const CriterionRow = ({ label, met }: Criterion) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
    {met ? (
      <CheckCircleOutlineIcon sx={{ fontSize: 14, color: "#66BB6A" }} />
    ) : (
      <CancelOutlinedIcon sx={{ fontSize: 14, color: "#CCCCCC" }} />
    )}
    <Typography
      sx={{
        fontSize: "12px",
        color: met ? "#66BB6A" : "#AAAAAA",
        transition: "color 0.2s",
      }}
    >
      {label}
    </Typography>
  </Box>
);
