import { TextField, InputAdornment, IconButton, styled } from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { useState } from "react";
import { ColorPallete } from "../../config/colors";

interface InputProps {
  label?: string;
  type?: "text" | "email" | "password" | "search" | "number" | "date" | "tel";
  variant?: "outlined" | "filled";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  currency?: string;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  color?: string;
  disabled?: boolean;
  iconColor?: string;
}

const StyledTextField = styled(TextField)<{
  customcolor?: string;
}>(({ theme, customcolor }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: "transparent",

    "&.Mui-focused fieldset": {
      borderColor: customcolor || theme.palette.primary.main,
    },
  },

  "& .MuiFilledInput-root": {
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: "transparent",
    },

    "&.Mui-focused": {
      border: `2px solid ${customcolor || theme.palette.primary.main}`,
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
    },

    "&:before, &:after": {
      display: "none",
    },
  },

  "& .MuiFormHelperText-root": {
    marginLeft: 0,
  },
}));

const CustomInput = ({
  label,
  type = "text",
  variant = "outlined",
  value,
  onChange,
  placeholder,
  error,
  helperText,
  startIcon,
  endIcon,
  currency,
  maxLength,
  multiline = false,
  rows = 4,
  fullWidth = true,
  color,
  disabled = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isSearch = type === "search";

  return (
    <StyledTextField
      variant={variant}
      fullWidth={fullWidth}
      label={label}
      type={isPassword ? (showPassword ? "text" : "password") : type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      helperText={maxLength ? `${value.length}/${maxLength}` : helperText}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      inputProps={{ maxLength }}
      customcolor={color}
      disabled={disabled}
      InputProps={{
        startAdornment:
          startIcon || currency ? (
            <InputAdornment position="start">
              {currency ? currency : startIcon}
            </InputAdornment>
          ) : undefined,

        endAdornment: (
          <>
            {isSearch && value && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => onChange({ target: { value: "" } } as any)}
                >
                  <Close sx={{ color: ColorPallete.primary.main }} />
                </IconButton>
              </InputAdornment>
            )}

            {isPassword && (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <VisibilityOff sx={{ color: ColorPallete.primary.main }} />
                  ) : (
                    <Visibility sx={{ color: ColorPallete.primary.main }} />
                  )}
                </IconButton>
              </InputAdornment>
            )}

            {endIcon && (
              <InputAdornment position="end">{endIcon}</InputAdornment>
            )}
          </>
        ),
      }}
    />
  );
};

export default CustomInput;
