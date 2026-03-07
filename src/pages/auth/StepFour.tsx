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
  LinearProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

export interface StepFourProps {
  password: string;
  confirmPassword: string;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
}

const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
const UPPERCASE_REGEX = /[A-Z]/;
const NUMBER_REGEX = /[0-9]/;

/** Returns 0–100 strength score */
const getStrength = (pwd: string): number => {
  let score = 0;
  if (pwd.length >= 8) score += 25;
  if (UPPERCASE_REGEX.test(pwd)) score += 25;
  if (NUMBER_REGEX.test(pwd)) score += 25;
  if (SPECIAL_CHAR_REGEX.test(pwd)) score += 25;
  return score;
};

const strengthLabel = (score: number): { label: string; color: string } => {
  if (score <= 25) return { label: "Weak", color: "#EF5350" };
  if (score <= 50) return { label: "Fair", color: "#FFA726" };
  if (score <= 75) return { label: "Good", color: "#42A5F5" };
  return { label: "Strong", color: "#66BB6A" };
};

interface CriterionProps {
  met: boolean;
  label: string;
}

const Criterion: React.FC<CriterionProps> = ({ met, label }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
    {met ? (
      <CheckCircle sx={{ fontSize: 14, color: "success.main" }} />
    ) : (
      <Cancel sx={{ fontSize: 14, color: "error.main" }} />
    )}
    <Typography
      variant="caption"
      sx={{ color: met ? "success.main" : "error.main" }}
    >
      {label}
    </Typography>
  </Box>
);

const StepFour: React.FC<StepFourProps> = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const criteria = useMemo(
    () => ({
      hasLength: password.length >= 8,
      hasUppercase: UPPERCASE_REGEX.test(password),
      hasNumber: NUMBER_REGEX.test(password),
      hasSpecialChar: SPECIAL_CHAR_REGEX.test(password),
      matches: confirmPassword.length > 0 && password === confirmPassword,
    }),
    [password, confirmPassword],
  );

  const strength = getStrength(password);
  const { label, color } = strengthLabel(strength);
  const showValidation = password.length > 0;
  const showMatch = confirmPassword.length > 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, py: 4 }}>
        Create a password
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl
          fullWidth
          variant="filled"
          error={
            showValidation && !(criteria.hasLength && criteria.hasSpecialChar)
          }
        >
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <FilledInput
            id="password-input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disableUnderline
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {/* Strength bar */}
        {showValidation && (
          <Box sx={{ mt: 1.5 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Password strength
              </Typography>
              <Typography variant="caption" sx={{ color, fontWeight: 600 }}>
                {label}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={strength}
              sx={{
                height: 4,
                borderRadius: 99,
                bgcolor: "rgba(0,0,0,0.08)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: color,
                  borderRadius: 99,
                },
              }}
            />

            {/* Criteria checklist */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1.5 }}>
              <Criterion met={criteria.hasLength} label="8+ characters" />
              <Criterion met={criteria.hasUppercase} label="Uppercase letter" />
              <Criterion met={criteria.hasNumber} label="Number" />
              <Criterion
                met={criteria.hasSpecialChar}
                label="Special character"
              />
            </Box>
          </Box>
        )}
      </Box>

      <FormControl
        fullWidth
        variant="filled"
        error={showMatch && !criteria.matches}
      >
        <InputLabel htmlFor="confirm-password-input">
          Confirm Password
        </InputLabel>
        <FilledInput
          id="confirm-password-input"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disableUnderline
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() => setShowConfirmPassword((v) => !v)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {showMatch && (
          <FormHelperText
            sx={{ color: criteria.matches ? "success.main" : "error.main" }}
          >
            {criteria.matches
              ? "✔ Passwords match"
              : "✖ Passwords do not match"}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default StepFour;
