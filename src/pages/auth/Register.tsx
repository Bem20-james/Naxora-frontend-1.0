import { useState, useEffect } from "react";
import { Box, Grid, Typography, Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";
import { showToast } from "../../utils/toast";
import { ColorPallete } from "../../config/colors";
import { HorizontalStepper } from "../../components/auth";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepThreeBrand from "./StepThreeBrand";
import StepFour from "./StepFour";
import OtpVerification from "./OtpVerification";
import authStyles from "../../styles/authStyles";
import { isValidEmail, removeKeys } from "../../utils/functions";
import { AppLoader, AppButton } from "../../components/dashboard";
import OnboardingFlow from "../../components/auth/CoverSection";
import type { UserRole } from "./StepTwo";
import { useRegister } from "../../hooks/useAuth";

export interface RegisterFormValues {
  country_id: string;
  role: UserRole | "";
  // creator
  name: string;
  username: string;
  // brand
  brand_name: string;
  contact_person: string;
  contact_person_number: string;
  // shared
  email: string;
  countryCode: string;
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
  const [otpMethod, setOtpMethod] = useState<"email" | "sms">("email");
  const [otpTimer, setOtpTimer] = useState<number>(60);

  /**
   * selectedRole is its own dedicated state — NOT derived from formValues.role.
   *
   * WHY THIS MATTERS:
   * handleRoleSelect calls setFormValues AND setActiveStep in the same tick.
   * React batches these updates, so when step 2 first renders, formValues.role
   * is still "" (stale closure). A separate state piece is set synchronously
   * first, so isBrand / isCreator are always correct on step 2's first render.
   */
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const isBrand = selectedRole === "brand";
  const isCreator = selectedRole === "creator";

  const { mutateAsync } = useRegister();

  const [formValues, setFormValues] = useState<RegisterFormValues>({
    country_id: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
    otpCode: "",
    name: "",
    username: "",
    countryCode: "",
    brand_name: "",
    contact_person: "",
    contact_person_number: "",
  });

  const handleFormChange = <K extends keyof RegisterFormValues>(
    field: K,
    value: RegisterFormValues[K],
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldChange = (field: string, value: string | boolean) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const isDisabled = (): boolean => {
      switch (activeStep) {
        case 0:
          return !formValues.country_id;

        case 1:
          return !selectedRole;

        case 2:
          if (isBrand) {
            return !(
              formValues.brand_name.trim() &&
              formValues.contact_person.trim() &&
              /^\d{10,14}$/.test(formValues.contact_person_number) &&
              isValidEmail(formValues.email)
            );
          }
          return !(
            formValues.name.trim() &&
            formValues.username.trim() &&
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
  }, [activeStep, formValues, selectedRole, isBrand]);

  const handleNext = () =>
    setActiveStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  /**
   * Sets selectedRole FIRST (synchronous — gates step 2 render immediately),
   * then writes to formValues.role (for payload), then advances the step.
   */
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    handleFormChange("role", role);
    setTimeout(handleNext, 320);
  };

  const buildPayload = () => {
    if (isBrand) {
      return {
        email: formValues.email,
        password: formValues.password,
        role: "brand" as const,
        username: formValues.username,
        brand_name: formValues.brand_name,
        contact_person: formValues.contact_person,
        contact_person_number: formValues.contact_person_number,
        country_id: formValues.country_id,
      };
    }

    const base = {
      ...formValues,
      role: "creator" as const,
    };

    return removeKeys(base, [
      "otpCode",
      "countryCode",
      "phoneNumber",
      "brand_name",
      "contact_person",
      "contact_person_number",
      "country",
    ]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = buildPayload();
      console.log("sending payload:", payload);
      await mutateAsync(payload);

      console.log("Submitting →", payload);
      handleNext();
    } catch (error) {
      console.error("Registration failed:", error);
      showToast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setLoading(true);
    try {
      // await verifyOtp({ email: formValues.email, otp: formValues.otpCode });
      showToast.success("Account created successfully!");
    } catch {
      setOtpError(true);
      showToast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCtaConfig = (): { label: string; onClick: () => void } | null => {
    switch (activeStep) {
      case 1:
        return null;
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
          sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
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
              {/* Step 0 — Country */}
              {activeStep === 0 && (
                <StepOne
                  countryId={formValues.country_id}
                  setSelectedCountry={(value) =>
                    handleFormChange("country_id", value)
                  }
                />
              )}

              {/* Step 1 — Role selection */}
              {activeStep === 1 && (
                <StepTwo
                  onSelect={handleRoleSelect}
                  defaultValue={selectedRole}
                />
              )}

              {/* Step 2 — Creator info */}
              {activeStep === 2 && isCreator && (
                <StepThree
                  name={formValues.name}
                  username={formValues.username}
                  email={formValues.email}
                  setFormValues={handleFieldChange}
                />
              )}

              {/* Step 2 — Brand info */}
              {activeStep === 2 && isBrand && (
                <StepThreeBrand
                  brand_name={formValues.brand_name}
                  contact_person={formValues.contact_person}
                  contact_person_number={formValues.contact_person_number}
                  email={formValues.email}
                  username={formValues.username}
                  setFormValues={handleFieldChange}
                />
              )}

              {/* Step 3 — Password */}
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

              {/* Step 4 — OTP */}
              {activeStep === 4 && (
                <OtpVerification
                  title="Verify your email address"
                  otpCode={formValues.otpCode}
                  destination={formValues.email}
                  handleOtpInput={(value) => handleFormChange("otpCode", value)}
                  handleResendOtp={() => {}}
                  otpError={otpError}
                  otpTimer={otpTimer}
                  setOtpTimer={setOtpTimer}
                  otpMethod={otpMethod}
                  setOtpMethod={setOtpMethod}
                  otpType="register"
                />
              )}

              {ctaConfig && (
                <AppButton
                  shape="rounded"
                  fullWidth
                  variant="primary"
                  sx={{ mt: "auto" }}
                  onClick={ctaConfig.onClick}
                  disabled={isNextDisabled}
                  loading={loading}
                >
                  {ctaConfig.label}
                </AppButton>
              )}
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                component="span"
                sx={{ color: "#AAAAAA", fontSize: "13.5px" }}
              >
                I have an account?{" "}
              </Typography>
              <MUILink
                href="/auth/login"
                underline="none"
                sx={{
                  color: ColorPallete.primary.main,
                  fontSize: "13.5px",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign In
              </MUILink>
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
