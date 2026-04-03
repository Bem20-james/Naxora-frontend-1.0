import React, { useEffect } from "react";
import { Box, Typography, Button, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MuiOtpInput } from "mui-one-time-password-input";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type OtpMethod = "email" | "sms" | "authenticator" | null;
export type OtpType = "register" | "forgot-password" | "login";

export interface OtpProps {
  title: string;
  otpCode: string;
  otpError?: string | boolean | null;
  otpTimer: number;
  otpMethod: OtpMethod;
  otpType: OtpType;
  loading?: boolean;
  /** Email address / phone to show in the hint line */
  destination?: string;

  handleOtpInput: (value: string) => void;
  handleResendOtp: () => void;
  setOtpTimer: React.Dispatch<React.SetStateAction<number>>;
  setOtpMethod: (method: OtpMethod) => void;
  /** Optional – called when all 6 digits are entered and user submits */
  onSubmit?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shake = keyframes`
  0%,100% { transform: translateX(0); }
  20%      { transform: translateX(-8px); }
  40%      { transform: translateX(8px); }
  60%      { transform: translateX(-6px); }
  80%      { transform: translateX(6px); }
`;

const timerShrink = (pct: number) => keyframes`
  from { width: ${pct}%; }
  to   { width: 0%; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// STYLED
// ─────────────────────────────────────────────────────────────────────────────

const MethodChip = styled(Box)<{ active: boolean }>(({ active }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  border: `1.5px solid ${active ? "rgba(108,99,255,0.55)" : "rgba(0,0,0,0.1)"}`,
  background: active ? "rgba(108,99,255,0.07)" : "transparent",
  color: active ? "#6C63FF" : "#555",
  fontSize: "13px",
  fontWeight: active ? 600 : 400,
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "rgba(108,99,255,0.4)",
    background: "rgba(108,99,255,0.04)",
    color: "#6C63FF",
  },
}));

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const METHOD_CONFIG: Record<
  NonNullable<OtpMethod>,
  { icon: React.ReactNode; label: string; hint: (dest?: string) => string }
> = {
  email: {
    icon: <MailOutlineIcon sx={{ fontSize: 16 }} />,
    label: "Email",
    hint: (dest) =>
      dest ? `Code sent to ${dest}` : "Code sent to your email address",
  },
  sms: {
    icon: <SmsOutlinedIcon sx={{ fontSize: 16 }} />,
    label: "SMS",
    hint: (dest) =>
      dest ? `Code sent to ${dest}` : "Code sent to your phone number",
  },
  authenticator: {
    icon: <SecurityOutlinedIcon sx={{ fontSize: 16 }} />,
    label: "Authenticator",
    hint: () => "Enter the code from your authenticator app",
  },
};

const formatTimer = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const OtpVerification: React.FC<OtpProps> = ({
  title,
  otpCode,
  otpError,
  otpTimer,
  otpMethod,
  otpType,
  loading = false,
  destination,
  handleOtpInput,
  handleResendOtp,
  setOtpTimer,
  setOtpMethod,
  onSubmit,
}) => {
  const isComplete = otpCode.length === 6;
  const hasError = Boolean(otpError);

  // ── Countdown ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (otpTimer <= 0) return;
    const id = setInterval(() => setOtpTimer((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [otpTimer, setOtpTimer]);

  // ── Method switch ──────────────────────────────────────────────────────────
  const switchMethod = (method: OtpMethod) => {
    setOtpMethod(method);
    setOtpTimer(60);
  };

  // Available methods per flow
  const availableMethods: OtpMethod[] =
    otpType === "register"
      ? ["email"]
      : otpType === "forgot-password"
        ? ["email", "sms"]
        : ["email", "sms", "authenticator"];

  const activeConfig = otpMethod ? METHOD_CONFIG[otpMethod] : null;

  return (
    <Box
      sx={{
        width: "100%",
        animation: `${fadeUp} 0.4s ease both`,
      }}
    >
      <Box sx={{ mb: 4, pt: 3 }}>
        <Typography
          sx={{
            fontSize: { xs: "20px", md: "24px" },
            fontWeight: 700,
            color: "#0D0D0D",
            letterSpacing: "-0.4px",
            mb: "8px",
          }}
        >
          {title}
        </Typography>

        {activeConfig && (
          <Typography
            sx={{ fontSize: "13.5px", color: "#999", lineHeight: 1.6 }}
          >
            {activeConfig.hint(destination)}
          </Typography>
        )}
      </Box>

      {availableMethods.length > 1 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#AAA",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Receive code via
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {availableMethods.map((m) => {
              if (!m) return null;
              const cfg = METHOD_CONFIG[m];
              return (
                <MethodChip
                  key={m}
                  active={otpMethod === m}
                  onClick={() => switchMethod(m)}
                >
                  {cfg.icon}
                  {cfg.label}
                </MethodChip>
              );
            })}
          </Box>
        </Box>
      )}

      <Box
        sx={{
          animation: hasError ? `${shake} 0.45s ease` : "none",
          mb: hasError ? 1 : 3,
        }}
      >
        <MuiOtpInput
          length={6}
          value={otpCode}
          onChange={handleOtpInput}
          sx={{
            gap: { xs: "8px", sm: "12px" },
            "& .MuiOtpInput-TextField": {
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                height: { xs: 48, sm: 56 },
                fontSize: { xs: "20px", sm: "24px" },
                fontWeight: 700,
                color: "#0D0D0D",
                transition: "all 0.2s ease",
                "& fieldset": {
                  borderColor: hasError
                    ? "#EF5350"
                    : isComplete
                      ? "#6C63FF"
                      : "rgba(0,0,0,0.15)",
                  borderWidth: isComplete || hasError ? "2px" : "1.5px",
                },
                "&:hover fieldset": { borderColor: "#6C63FF" },
                "&.Mui-focused fieldset": {
                  borderColor: "#6C63FF",
                  boxShadow: "0 0 0 3px rgba(108,99,255,0.12)",
                },
              },
            },
          }}
        />
      </Box>

      {hasError && (
        <Typography
          sx={{
            fontSize: "13px",
            color: "#EF5350",
            textAlign: "center",
            mb: 2,
            animation: `${fadeUp} 0.3s ease both`,
          }}
        >
          {typeof otpError === "string"
            ? otpError
            : "Incorrect code. Please try again."}
        </Typography>
      )}

      {isComplete && !hasError && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            mb: 2,
            animation: `${fadeUp} 0.3s ease both`,
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#66BB6A" }} />
          <Typography
            sx={{ fontSize: "13px", color: "#66BB6A", fontWeight: 500 }}
          >
            Looking good — hit Verify to continue
          </Typography>
        </Box>
      )}

      {otpMethod !== "authenticator" && (
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              height: 2,
              borderRadius: 99,
              bgcolor: "rgba(0,0,0,0.07)",
              overflow: "hidden",
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                height: "100%",
                borderRadius: 99,
                bgcolor: otpTimer > 20 ? "#6C63FF" : "#FFA726",
                width: `${(otpTimer / 60) * 100}%`,
                transition: "width 1s linear, background-color 0.3s ease",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "12.5px", color: "#AAA" }}>
              {otpTimer > 0 ? (
                <>
                  Resend available in{" "}
                  <Box
                    component="span"
                    sx={{
                      color: otpTimer > 20 ? "#6C63FF" : "#FFA726",
                      fontWeight: 600,
                    }}
                  >
                    {formatTimer(otpTimer)}
                  </Box>
                </>
              ) : (
                "Didn't receive the code?"
              )}
            </Typography>

            <Button
              size="small"
              disableRipple
              onClick={() => {
                handleResendOtp();
                setOtpTimer(60);
              }}
              disabled={otpTimer > 0 || loading}
              sx={{
                fontSize: "12.5px",
                fontWeight: 600,
                color: otpTimer === 0 ? "#6C63FF" : "#CCC",
                textTransform: "none",
                p: 0,
                minWidth: 0,
                "&:hover": { background: "none", textDecoration: "underline" },
                "&.Mui-disabled": { color: "#CCC" },
              }}
            >
              Resend code
            </Button>
          </Box>
        </Box>
      )}

      {/* ── Submit button (only shown when onSubmit prop is passed in) ────
           In the Register flow, the parent's AppButton handles submission,
           so this renders only when onSubmit is explicitly provided.
      ─────────────────────────────────────────────────────────────────── */}
      {onSubmit && (
        <Button
          fullWidth
          variant="contained"
          disabled={!isComplete || loading}
          onClick={onSubmit}
          sx={{
            bgcolor: "#6C63FF",
            color: "#fff",
            fontWeight: 700,
            fontSize: "15px",
            py: "13px",
            borderRadius: "10px",
            textTransform: "none",
            boxShadow: "0 4px 18px rgba(108,99,255,0.35)",
            "&:hover": {
              bgcolor: "#5A52E0",
              boxShadow: "0 6px 24px rgba(108,99,255,0.5)",
            },
            "&.Mui-disabled": { bgcolor: "rgba(0,0,0,0.08)", color: "#AAA" },
          }}
        >
          {loading ? "Verifying…" : "Verify & Continue"}
        </Button>
      )}
    </Box>
  );
};

export default OtpVerification;
