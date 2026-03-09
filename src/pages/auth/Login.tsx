import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ColorPallete } from "../../config/colors";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/dashboard";
import { Email } from "@mui/icons-material";
import { AppButton } from "../../components/dashboard";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
            <Typography
              sx={{
                color: "#0D0D0D",
                fontSize: { xs: "26px", md: "28px" },
                fontWeight: 700,
                letterSpacing: "-0.4px",
                mb: "6px",
              }}
            >
              Welcome back
            </Typography>
            <Typography sx={{ color: "#999", fontSize: "14px", mb: "28px" }}>
              Sign in to manage your growth and collaborations.
            </Typography>

            <Stack gap={2} mb="10px">
              <CustomInput
                fullWidth
                label="Email"
                placeholder="name@example.com"
                type="email"
                endIcon={<Email sx={{ color: ColorPallete.primary.main }} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                iconColor={ColorPallete.primary.main}
                variant="outlined"
              />
              <CustomInput
                fullWidth
                label="Password"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                variant="outlined"
              />
            </Stack>

            <Box sx={{ textAlign: "right", mb: "10px", mr: 1 }}>
              <Link
                href="/auth/forgot-password"
                underline="none"
                sx={{
                  color: ColorPallete.primary.main,
                  fontSize: "12px",
                  fontWeight: 500,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot Password ?
              </Link>
            </Box>

            <AppButton
              shape="rounded"
              fullWidth
              variant="primary"
              sx={{ mt: "auto" }}
              onClick={() => {}}
            >
              Continue
            </AppButton>

            <Divider
              sx={{
                mb: "20px",
                "&::before, &::after": { borderColor: "#E6E6E6" },
                color: "#BBBBBB",
                fontSize: "13px",
              }}
            >
              or continue
            </Divider>

            <Stack gap="12px" mb="24px">
              {[
                {
                  label: "Sign in with Google",
                  icon: <GoogleIcon sx={{ fontSize: 18, color: "#4285F4" }} />,
                },
                {
                  label: "Sign in with Apple",
                  icon: <AppleIcon sx={{ fontSize: 18, color: "#000000" }} />,
                },
                {
                  label: "Sign in with Instagram",
                  icon: (
                    <InstagramIcon sx={{ fontSize: 18, color: "#E1306C" }} />
                  ),
                },
              ].map(({ label, icon }) => (
                <Button
                  key={label}
                  fullWidth
                  variant="outlined"
                  endIcon={icon}
                  sx={{
                    color: "#1A1A1A",
                    borderColor: "#E0E0E0",
                    borderRadius: "10px",
                    py: "11px",
                    textTransform: "none",
                    fontWeight: 400,
                    fontSize: "14px",
                    bgcolor: "#F2F2F2",

                    justifyContent: "center",
                    letterSpacing: "0.1px",
                    "&:hover": {
                      borderColor: "#C8C8C8",
                      bgcolor: "#FAFAFA",
                    },
                    boxShadow: "none",
                    "& .MuiButton-endIcon": {
                      position: "absolute",
                      right: "16px",
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Stack>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                component="span"
                sx={{ color: "#AAAAAA", fontSize: "13.5px" }}
              >
                Need an account?{" "}
              </Typography>
              <Link
                href="/auth/onboarding"
                underline="none"
                sx={{
                  color: ColorPallete.primary.main,
                  fontSize: "13.5px",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Create one
              </Link>
            </Box>
          </Box>

          <Box sx={{ height: 56 }} />
        </Grid>

        <Grid
          size={{ xs: 0, md: 7 }}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
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
              src="/auth/auth2.png"
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

export default LoginPage;
