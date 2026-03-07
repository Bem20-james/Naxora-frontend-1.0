import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ColorPallete } from "../../config/colors";
import { HorizontalStepper } from "../../components/auth";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import OtpVerification from "./OtpVerification";
import authStyles from "../../styles/authStyles";
import { isValidEmail, removeKeys } from "../../utils/functions";
import { AppLoader, AppButton } from "../../components/dashboard";
import OnboardingFlow from "../../components/auth/CoverSection";
import type { UserRole } from "./StepTwo";
import type { Gender } from "./StepThree";

export interface RegisterFormValues {
  country_id: string;

  role: UserRole | "";

  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  gender: Gender;
  referral: string;

  password: string;
  confirmPassword: string;

  otpCode: string;
}
const TOTAL_STEPS = 5;

const RegisterPage: React.FC = () => {
  const styles = authStyles();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [otpMethod, setOtpMethod] = useState<"email" | "sms" | null>("email");
  const [otpTimer, setOtpTimer] = useState<number>(60);

  const [formValues, setFormValues] = useState<RegisterFormValues>({
    country_id: "",
    role: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    countryCode: "",
    gender: "",
    referral: "",
    password: "",
    confirmPassword: "",
    otpCode: "",
  });

  // ── Controlled field updater ──────────────────────────────────────────────
  const handleFormChange = <K extends keyof RegisterFormValues>(
    field: K,
    value: RegisterFormValues[K],
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // ── Per-step validation ───────────────────────────────────────────────────
  useEffect(() => {
    const isDisabled = (): boolean => {
      switch (activeStep) {
        case 0:
          return !formValues.country_id;

        case 1:
          // Role step advances automatically on card click — always enabled
          return !formValues.role;

        case 2:
          return !(
            formValues.firstname &&
            formValues.lastname &&
            formValues.gender &&
            /^\d{10}$/.test(formValues.phoneNumber) &&
            isValidEmail(formValues.email)
          );

        case 3:
          return !(
            formValues.password &&
            formValues.password === formValues.confirmPassword &&
            formValues.password.length >= 8
          );

        case 4:
          return formValues.otpCode.length < 6;

        default:
          return false;
      }
    };

    setIsNextDisabled(isDisabled());
  }, [activeStep, formValues]);

  const handleNext = () =>
    setActiveStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  // Step 2 (Role) auto-advances on card select
  const handleRoleSelect = (role: UserRole) => {
    handleFormChange("role", role);
    setTimeout(handleNext, 320);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formValues,
        phone: `${formValues.countryCode}${formValues.phoneNumber}`.substring(
          1,
        ),
      };

      const cleanedPayload = removeKeys(payload, [
        "confirmPassword",
        "otpCode",
        "countryCode",
        "phoneNumber",
        !formValues.referral ? "referral" : "",
      ]);

      cleanedPayload.country_id = String(cleanedPayload.country_id);

      // const response = await registerUser(cleanedPayload);
      // if (response?.success) handleNext();

      console.log("Submitting payload →", cleanedPayload);
      handleNext(); // advance to OTP step
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setLoading(true);
    try {
      // const response = await verifyOtp({ email: formValues.email, otp: formValues.otpCode });
      // if (!response?.success) { setOtpError(true); return; }
      toast.success("Account created successfully!");
    } catch {
      setOtpError(true);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCtaConfig = (): { label: string; onClick: () => void } | null => {
    switch (activeStep) {
      case 1:
        return null; // role step auto-advances, no button needed
      case 3:
        return { label: "Create Account", onClick: handleSubmit };
      case 4:
        return { label: "Verify & Continue", onClick: handleOtpVerify };
      default:
        return { label: "Continue", onClick: handleNext };
    }
  };

  const ctaConfig = getCtaConfig();

  return (
    <>
      <AppLoader open={loading} title="Processing…" />

      <Grid container spacing={0} sx={styles.wrapper}>
        <Grid
          size={{ xs: 12, md: 7, lg: 7 }}
          sx={{
            maxHeight: "100vh",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
          }}
        >
          <OnboardingFlow />
        </Grid>

        <Grid
          size={{ xs: 12, md: 5, lg: 5 }}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: "100vh",
              bgcolor: ColorPallete.default.light,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Link to="/">
              <Box
                sx={{
                  mt: "1.5rem",
                  display: { xs: "flex", md: "none" },
                  justifyContent: "center",
                }}
              >
                <img src="/logo/logo2.png" height="50px" alt="Logo" />
              </Box>
            </Link>

            <HorizontalStepper activeStep={activeStep} onBack={handleBack} />

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                flex: 1,
                overflowY: "auto",
                px: { xs: "1.5rem", lg: "3rem" },
                pt: 2,
                pb: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {activeStep === 0 && (
                <StepOne
                  countryId={formValues.country_id}
                  setSelectedCountry={(value) =>
                    handleFormChange("country_id", value)
                  }
                />
              )}

              {activeStep === 1 && (
                <StepTwo
                  onSelect={handleRoleSelect}
                  defaultValue={formValues.role as UserRole | null}
                />
              )}

              {activeStep === 2 && (
                <StepThree
                  firstname={formValues.firstname}
                  lastname={formValues.lastname}
                  email={formValues.email}
                  phoneNumber={formValues.phoneNumber}
                  gender={formValues.gender}
                  referral={formValues.referral}
                  setFormValues={(field, value) =>
                    handleFormChange(field as keyof RegisterFormValues, value)
                  }
                />
              )}

              {activeStep === 3 && (
                <StepFour
                  password={formValues.password}
                  confirmPassword={formValues.confirmPassword}
                  setPassword={(value) => handleFormChange("password", value)}
                  setConfirmPassword={(value) =>
                    handleFormChange("confirmPassword", value)
                  }
                />
              )}

              {activeStep === 4 && (
                <OtpVerification
                  title="Verify your email address"
                  otpCode={formValues.otpCode}
                  handleOtpInput={(value) => handleFormChange("otpCode", value)}
                  handleResendOtp={() => {}}
                  otpError={otpError}
                  otpTimer={otpTimer}
                  setOtpTimer={setOtpTimer}
                  otpMethod={otpMethod}
                  setOtpMethod={setOtpMethod}
                  otpType="register"
                  _email={true}
                />
              )}

              {ctaConfig && (
                <AppButton
                  shape="rounded"
                  fullWidth
                  variant="primary"
                  sx={{ mt: "auto", pt: 3 }}
                  onClick={ctaConfig.onClick}
                  disabled={isNextDisabled}
                  loading={loading}
                >
                  {ctaConfig.label}
                </AppButton>
              )}
            </Box>

            <Box
              sx={{
                bgcolor: "#FFF",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 2, lg: 5 },
                py: 2,
                borderTop: "1px solid rgba(0,0,0,0.06)",
                flexShrink: 0,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, color: "#999" }}
              >
                &copy;&nbsp;Nexora 2026
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {[
                  {
                    label: "Terms & Conditions",
                    href: "https://advanztek.com",
                  },
                  { label: "Privacy Policies", href: "https://advanztek.com" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: ColorPallete.primary.main,
                      fontWeight: 300,
                      fontSize: "13px",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterPage;
