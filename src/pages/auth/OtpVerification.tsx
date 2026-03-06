import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

export type OtpMethod = "email" | "sms" | "authenticator" | null;
export type OtpType = "register" | "forgot-password" | "login";

export interface OtpProps {
  title: string;
  otpCode: string;
  otpError?: string | null;
  otpTimer: number;
  otpMethod: OtpMethod;
  otpType: OtpType;
  loading?: boolean;

  handleOtpInput: (value: string) => void;
  handleResendOtp: () => void;
  setOtpTimer: React.Dispatch<React.SetStateAction<number>>;
  setOtpMethod: (method: OtpMethod) => void;
}

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

const OtpVerification: React.FC<OtpProps> = ({
  title,
  otpCode,
  otpError,
  otpTimer,
  otpMethod,
  otpType,
  loading = false,
  handleOtpInput,
  handleResendOtp,
  setOtpTimer,
  setOtpMethod,
}) => {
  const theme = useTheme();

  /* -------- Countdown Timer -------- */

  useEffect(() => {
    if (otpTimer <= 0) return;

    const interval = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpTimer, setOtpTimer]);

  /* -------- Helpers -------- */

  const handleOtpMethodChange = (method: OtpMethod) => {
    setOtpMethod(method);
    setOtpTimer(60);
  };

  const getInstructionText = () => {
    switch (otpMethod) {
      case "email":
        return "OTP sent to your email";
      case "sms":
        return "OTP sent to your phone";
      case "authenticator":
        return "Code from your authenticator app";
      default:
        return "";
    }
  };

  const canSubmit = otpCode.length === 6 && !loading;

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography
        variant="h5"
        sx={{ textAlign: "left", fontWeight: 700, py: 3 }}
      >
        {title}
      </Typography>

      {/* Method Selection */}
      {otpType !== "register" && (
        <Box mb={3}>
          <Typography variant="body1">
            Choose method to receive the OTP:
          </Typography>

          <Stack direction="row" spacing={2} mt={2}>
            {otpType !== "forgot-password" && otpMethod !== "email" && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleOtpMethodChange("email")}
              >
                Email
              </Button>
            )}
          </Stack>
        </Box>
      )}

      {/* OTP Input */}
      {otpMethod && (
        <>
          <Typography variant="body1" mt={4}>
            Please enter the {getInstructionText()}:
          </Typography>

          <Box mt={3}>
            <Grid container justifyContent="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <MuiOtpInput
                  length={6}
                  value={otpCode}
                  onChange={handleOtpInput}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Resend Section */}
          {otpMethod !== "authenticator" && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={3}
              gap={1}
            >
              <Typography variant="body2">Resend OTP in</Typography>

              <Typography variant="body2" color="text.secondary">
                ({otpTimer}s)
              </Typography>

              {otpTimer === 0 && (
                <Button
                  size="small"
                  color="secondary"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </Button>
              )}
            </Box>
          )}
        </>
      )}

      {/* Error */}
      {otpError && (
        <Typography color="error" textAlign="center" mt={2}>
          {otpError}
        </Typography>
      )}

      {/* Submit */}
      {otpMethod && (
        <Box mt={4}>
          <Button fullWidth variant="contained" disabled={!canSubmit}>
            {loading ? (
              <CircularProgress
                size={24}
                sx={{ color: theme.palette.common.white }}
              />
            ) : (
              "Submit OTP"
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default OtpVerification;
