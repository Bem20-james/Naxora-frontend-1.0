import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  FilledInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

export interface StepThreeProps {
  password: string;
  confirmPassword: string;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
}

/* ---------------------------------- */
/* Validation Rules */
/* ---------------------------------- */

const PASSWORD_MIN_LENGTH = 8;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

const StepFour: React.FC<StepThreeProps> = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* -------- Derived Validation -------- */

  const passwordCriteria = useMemo(() => {
    const hasLength = password.length >= PASSWORD_MIN_LENGTH;
    const hasSpecialChar = SPECIAL_CHAR_REGEX.test(password);
    const matches = confirmPassword.length > 0 && password === confirmPassword;

    return {
      hasLength,
      hasSpecialChar,
      matches,
      isPasswordValid: hasLength && hasSpecialChar,
    };
  }, [password, confirmPassword]);

  const showPasswordValidation = password.length > 0;
  const showMatchValidation = confirmPassword.length > 0;

  /* -------- Handlers -------- */

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography
        variant="h5"
        sx={{ textAlign: "left", fontWeight: 700, py: 4 }}
      >
        Create password
      </Typography>

      {/* Password Field */}
      <Box sx={{ mb: 3 }}>
        <FormControl
          fullWidth
          variant="outlined"
          error={showPasswordValidation && !passwordCriteria.isPasswordValid}
        >
          <InputLabel htmlFor="password-input">Password</InputLabel>

          <FilledInput
            id="password-input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            disableUnderline
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          {showPasswordValidation && (
            <>
              <FormHelperText
                sx={{
                  color: passwordCriteria.hasLength
                    ? "success.main"
                    : "error.main",
                }}
              >
                {passwordCriteria.hasLength
                  ? "✔ At least 8 characters"
                  : "✖ At least 8 characters"}
              </FormHelperText>

              <FormHelperText
                sx={{
                  color: passwordCriteria.hasSpecialChar
                    ? "success.main"
                    : "error.main",
                }}
              >
                {passwordCriteria.hasSpecialChar
                  ? "✔ Contains at least one special character"
                  : "✖ Contains at least one special character"}
              </FormHelperText>
            </>
          )}
        </FormControl>
      </Box>

      {/* Confirm Password Field */}
      <Box>
        <FormControl
          fullWidth
          variant="outlined"
          error={showMatchValidation && !passwordCriteria.matches}
        >
          <InputLabel htmlFor="confirm-password-input">
            Confirm Password
          </InputLabel>

          <FilledInput
            id="confirm-password-input"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            disableUnderline
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          {showMatchValidation && (
            <FormHelperText
              sx={{
                color: passwordCriteria.matches ? "success.main" : "error.main",
              }}
            >
              {passwordCriteria.matches
                ? "✔ Passwords match"
                : "✖ Passwords do not match"}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    </Box>
  );
};

export default StepFour;
