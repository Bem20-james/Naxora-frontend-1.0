import { ColorPallete } from "../config/colors";

export const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontSize: "0.87rem",
    "& fieldset": { borderColor: "#f0f0f5" },
    "&:hover fieldset": { borderColor: `${ColorPallete.primary.main}50` },
    "&.Mui-focused fieldset": { borderColor: ColorPallete.primary.main },
  },
};
