import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Link,
  Stack,
  Typography,
  FormHelperText,
  keyframes,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { ColorPallete } from "../../config/colors";
import { useNavigate } from "react-router-dom";
import { CustomInput, AppButton } from "../../components/dashboard";
import {
  SPECIAL_CHAR_REGEX,
  UPPERCASE_REGEX,
  NUMBER_REGEX,
} from "../../assets/data";
import { type Criterion, CriterionRow } from "../../components/public";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Strength bar: 0–100
const getStrength = (pwd: string): number => {
  let score = 0;
  if (pwd.length >= 8) score += 25;
  if (UPPERCASE_REGEX.test(pwd)) score += 25;
  if (NUMBER_REGEX.test(pwd)) score += 25;
  if (SPECIAL_CHAR_REGEX.test(pwd)) score += 25;
  return score;
};

const strengthMeta = (score: number): { label: string; color: string } => {
  if (score <= 25) return { label: "Weak", color: "#EF5350" };
  if (score <= 50) return { label: "Fair", color: "#FFA726" };
  if (score <= 75) return { label: "Good", color: "#42A5F5" };
  return { label: "Strong", color: "#66BB6A" };
};

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const criteria: Criterion[] = useMemo(
    () => [
      { label: "At least 8 characters", met: password.length >= 8 },
      { label: "One uppercase letter", met: UPPERCASE_REGEX.test(password) },
      { label: "One number", met: NUMBER_REGEX.test(password) },
      {
        label: "One special character",
        met: SPECIAL_CHAR_REGEX.test(password),
      },
    ],
    [password],
  );

  const allCriteriaMet = criteria.every((c) => c.met);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const canSubmit = allCriteriaMet && passwordsMatch && !loading;

  const strength = getStrength(password);
  const { label: strengthLabel, color: strengthColor } = strengthMeta(strength);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      // Replace with real API call
      // await resetPassword({ token, password });
      await new Promise((r) => setTimeout(r, 900)); // mock
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        borderRadius: "20px",
        overflow: "hidden",
        bgcolor: "#FFFFFF",
        boxShadow: "0 4px 40px rgba(0,0,0,0.07)",
      }}
    >
      <Grid container sx={{ height: "100%", flex: 1 }}>
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "#FFFFFF",
            px: { xs: 4, sm: 6, md: 8 },
            py: { xs: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "360px",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Box
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                mb: 1,
                ml: -2,
                width: "fit-content",
                transition: "opacity 0.2s",
                "&:hover": { opacity: 0.75 },
              }}
            >
              <Box
                component="img"
                src="/logo/logo2.png"
                sx={{ width: 160, height: 56, objectFit: "contain" }}
              />
            </Box>

            <Box
              onClick={() => navigate("/auth/login")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                mb: "28px",
                cursor: "pointer",
                width: "fit-content",
                color: "#AAAAAA",
                transition: "color 0.2s",
                "&:hover": { color: ColorPallete.primary.main },
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 11 }} />
              <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                Back to login
              </Typography>
            </Box>

            {!done ? (
              <Box sx={{ animation: `${fadeUp} 0.38s ease both` }}>
                <Typography
                  sx={{
                    color: "#0D0D0D",
                    fontSize: { xs: "24px", md: "26px" },
                    fontWeight: 700,
                    letterSpacing: "-0.4px",
                    mb: "6px",
                  }}
                >
                  Reset your password
                </Typography>
                <Typography
                  sx={{
                    color: "#999",
                    fontSize: "14px",
                    mb: "28px",
                    lineHeight: 1.7,
                  }}
                >
                  Choose a new password for your account. Make it strong and
                  don't share it with anyone.
                </Typography>

                <Stack gap={2} mb="16px">
                  <CustomInput
                    fullWidth
                    label="New password"
                    placeholder="Enter new password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                  />

                  {password.length > 0 && (
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: "6px",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "11.5px", color: "#AAAAAA" }}
                        >
                          Password strength
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "11.5px",
                            fontWeight: 600,
                            color: strengthColor,
                            transition: "color 0.3s",
                          }}
                        >
                          {strengthLabel}
                        </Typography>
                      </Box>

                      {/* Track */}
                      <Box
                        sx={{
                          height: 3,
                          borderRadius: 99,
                          bgcolor: "rgba(0,0,0,0.07)",
                          overflow: "hidden",
                          mb: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            borderRadius: 99,
                            width: `${strength}%`,
                            bgcolor: strengthColor,
                            transition:
                              "width 0.4s ease, background-color 0.3s ease",
                          }}
                        />
                      </Box>

                      {/* Criteria checklist */}
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "6px",
                        }}
                      >
                        {criteria.map((c) => (
                          <CriterionRow key={c.label} {...c} />
                        ))}
                      </Box>
                    </Box>
                  )}

                  <CustomInput
                    fullWidth
                    label="Confirm new password"
                    placeholder="Re-enter new password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                  />

                  {/* Match feedback */}
                  {confirmPassword.length > 0 && (
                    <FormHelperText
                      sx={{
                        mt: "-8px",
                        color: passwordsMatch ? "#66BB6A" : "#EF5350",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {passwordsMatch
                        ? "✔ Passwords match"
                        : "✖ Passwords do not match"}
                    </FormHelperText>
                  )}
                </Stack>

                <AppButton
                  shape="rounded"
                  fullWidth
                  variant="primary"
                  sx={{ mt: { lg: 3, sm: 5 } }}
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  loading={loading}
                >
                  {loading ? "Resetting…" : "Reset Password"}
                </AppButton>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    component="span"
                    sx={{ color: "#AAAAAA", fontSize: "13.5px" }}
                  >
                    Remember your password?{" "}
                  </Typography>
                  <Link
                    href="/auth/login"
                    underline="none"
                    sx={{
                      color: ColorPallete.primary.main,
                      fontSize: "13.5px",
                      fontWeight: 600,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Sign in
                  </Link>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  animation: `${fadeUp} 0.4s ease both`,
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "20px",
                    bgcolor: "rgba(102,187,106,0.1)",
                    border: "1.5px solid rgba(102,187,106,0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "24px",
                  }}
                >
                  <TaskAltIcon sx={{ fontSize: 34, color: "#66BB6A" }} />
                </Box>

                <Typography
                  sx={{
                    color: "#0D0D0D",
                    fontSize: { xs: "22px", md: "24px" },
                    fontWeight: 700,
                    letterSpacing: "-0.4px",
                    mb: "10px",
                  }}
                >
                  Password updated!
                </Typography>
                <Typography
                  sx={{
                    color: "#999",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    mb: "28px",
                  }}
                >
                  Your password has been reset successfully. You can now sign in
                  with your new password.
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/auth/login")}
                  sx={{
                    bgcolor: ColorPallete.primary.default,
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "15px",
                    py: "13px",
                    borderRadius: "10px",
                    textTransform: "none",
                    boxShadow: `0 4px 18px ${ColorPallete.primary.default}44`,
                    "&:hover": {
                      bgcolor: ColorPallete.primary.main,
                      boxShadow: `0 6px 24px ${ColorPallete.primary.main}60`,
                    },
                  }}
                >
                  Back to Login
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ height: 56 }} />
        </Grid>

        <Grid
          size={{ xs: 0, md: 7 }}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              p: "8px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src="/auth/auth3.jpg"
              alt="reset-password-img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPassword;
