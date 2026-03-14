import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Link,
  Stack,
  Typography,
  keyframes,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ColorPallete } from "../../config/colors";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/dashboard";
import { Email } from "@mui/icons-material";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidEmail = /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async () => {
    if (!isValidEmail) return;
    setLoading(true);
    try {
      // ↓ Replace with your real API call
      // await requestPasswordReset({ email });
      await new Promise((r) => setTimeout(r, 900)); // mock
      setSent(true);
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

            {!sent ? (
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
                  Forgot password?
                </Typography>
                <Typography
                  sx={{
                    color: "#999",
                    fontSize: "14px",
                    mb: "28px",
                    lineHeight: 1.7,
                  }}
                >
                  Enter the email address linked to your account and we'll send
                  you a reset link.
                </Typography>

                <Stack gap={2} mb="20px">
                  <CustomInput
                    fullWidth
                    label="Email address"
                    placeholder="name@example.com"
                    type="email"
                    endIcon={
                      <Email sx={{ color: ColorPallete.primary.main }} />
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    iconColor={ColorPallete.primary.main}
                    variant="outlined"
                  />
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  disabled={!isValidEmail || loading}
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: ColorPallete.primary.default,
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "15px",
                    py: "13px",
                    mb: "20px",
                    borderRadius: "10px",
                    textTransform: "none",
                    boxShadow: `0 4px 18px ${ColorPallete.primary.default}44`,
                    "&:hover": {
                      bgcolor: ColorPallete.primary.main,
                      boxShadow: `0 6px 24px ${ColorPallete.primary.main}60`,
                    },
                    "&.Mui-disabled": {
                      bgcolor: "rgba(0,0,0,0.06)",
                      color: "#AAAAAA",
                      boxShadow: "none",
                    },
                  }}
                >
                  {loading ? "Sending…" : "Send Reset Link"}
                </Button>

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
                    bgcolor: `${ColorPallete.primary.main}12`,
                    border: `1.5px solid ${ColorPallete.primary.main}28`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "24px",
                  }}
                >
                  <MailOutlineIcon
                    sx={{ fontSize: 34, color: ColorPallete.primary.main }}
                  />
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
                  Check your inbox
                </Typography>
                <Typography
                  sx={{
                    color: "#999",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    mb: "28px",
                  }}
                >
                  We sent a password reset link to{" "}
                  <Box
                    component="span"
                    sx={{ color: "#0D0D0D", fontWeight: 600 }}
                  >
                    {email}
                  </Box>
                  . The link expires in 10 minutes.
                </Typography>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    component="span"
                    sx={{ color: "#AAAAAA", fontSize: "13.5px" }}
                  >
                    Didn't receive it?{" "}
                  </Typography>
                  <Box
                    component="span"
                    onClick={() => {
                      setSent(false);
                      setEmail("");
                    }}
                    sx={{
                      color: ColorPallete.primary.main,
                      fontSize: "13.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Try again
                  </Box>
                </Box>
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
              src="/auth/auth4.jpg"
              alt="forgot-password-img"
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

export default ForgotPassword;
