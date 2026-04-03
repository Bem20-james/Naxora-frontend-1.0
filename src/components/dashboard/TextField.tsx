import { Box, Typography, TextField } from "@mui/material";
import { ColorPallete } from "../../config/colors";

export const Field = ({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) => (
  <Box>
    <Typography
      sx={{
        fontSize: "0.7rem",
        fontWeight: 600,
        color: "#aaa",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        mb: 0.7,
      }}
    >
      {label}
    </Typography>
    <TextField
      fullWidth
      size="small"
      defaultValue={value}
      multiline={multiline}
      rows={multiline ? 3 : 1}
      sx={{
        "& .MuiOutlinedInput-root": {
          fontSize: "0.85rem",
          borderRadius: "10px",
          "& fieldset": { borderColor: "#f0f0f5" },
          "&:hover fieldset": { borderColor: `${ColorPallete.primary.main}50` },
          "&.Mui-focused fieldset": { borderColor: ColorPallete.primary.main },
        },
      }}
    />
  </Box>
);
