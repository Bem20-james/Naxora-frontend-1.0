import { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ColorPallete } from "../../config/colors";
import { HorizontalStepper, CoverSection } from "../../components/auth";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import OtpVerification from "./OtpVerification";
import authStyles from "../../styles/authStyles";
import { isValidEmail, removeKeys } from "../../utils/functions";
import { AppLoader } from "../../components/dashboard";
import OnboardingFlow from "../../components/auth/CoverSection";

interface RegisterFormValues {
  country_id: string;
  firstname: string;
  lastname: string;
  gender: string;
  referral?: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  password: string;
  confirmPassword: string;
  otpCode: string;
}

const RegisterPage: React.FC = () => {
  const styles = authStyles();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [_email] = useState<boolean>(true);
  const [otpMethod, setOtpMethod] = useState<"email" | "sms">("email");
  const [otpTimer, setOtpTimer] = useState<number>(60);

  const [formValues, setFormValues] = useState<RegisterFormValues>({
    country_id: "",
    firstname: "",
    lastname: "",
    gender: "",
    referral: "",
    phoneNumber: "",
    countryCode: "",
    email: "",
    password: "",
    confirmPassword: "",
    otpCode: "",
  });

  /**
   * Handles controlled form updates
   */
  const handleFormChange = (field: keyof RegisterFormValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Step validation logic
   */
  useEffect(() => {
    const validateStep = (): boolean => {
      switch (activeStep) {
        case 0:
          return !formValues.country_id;

        case 2:
          return !(
            formValues.password &&
            formValues.password === formValues.confirmPassword
          );

        case 1:
          return !(
            formValues.firstname &&
            formValues.lastname &&
            formValues.gender &&
            /^\d{10}$/.test(formValues.phoneNumber) &&
            isValidEmail(formValues.email)
          );

        case 2:
          return !(
            formValues.password &&
            formValues.password === formValues.confirmPassword
          );

        default:
          return true;
      }
    };

    setIsNextDisabled(validateStep());
  }, [activeStep, formValues]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleStepClick = (step: number) => setActiveStep(step);

  /**
   * Registration submission
   */
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

      // const response = await submit(cleanedPayload);
      // if (response) setActiveStep(3);

      setActiveStep(3);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppLoader open={loading} title="Processing...." />

      <Grid container spacing={0} sx={styles.wrapper}>
        <Grid
          size={{ xs: 12, md: 7, lg: 7 }}
          sx={{
            maxHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <OnboardingFlow />
        </Grid>

        <Grid
          size={{ xs: 12, md: 5, lg: 5 }}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ height: "100vh", bgcolor: ColorPallete.default.light }}>
            <Link to="/">
              <Box
                sx={{
                  ...styles.logoImg,
                  mt: "2rem",
                  display: { xs: "flex", justifyContent: "center", lg: "none" },
                }}
              >
                <img src="/logo/logo2.png" height="50px" alt="Logo" />
              </Box>
            </Link>

            <HorizontalStepper
              activeStep={activeStep}
              handleBack={handleBack}
              handleStepClick={handleStepClick}
            />

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ px: { xs: "2rem", lg: "4rem" } }}
            >
              {activeStep === 0 && (
                <StepOne
                  country_id={formValues.country_id}
                  setSelectedCountry={(value: string) =>
                    handleFormChange("country_id", value)
                  }
                />
              )}

              {activeStep === 1 && (
                <StepTwo
                  formValues={formValues}
                  handleChange={handleFormChange}
                />
              )}

              {activeStep === 2 && (
                <StepThree
                  password={formValues.password}
                  confirmPassword={formValues.confirmPassword}
                  setPassword={(value: string) =>
                    handleFormChange("password", value)
                  }
                  setConfirmPassword={(value: string) =>
                    handleFormChange("confirmPassword", value)
                  }
                />
              )}

              {activeStep === 3 && (
                <OtpVerification
                  title="Verify your email address"
                  otpCode={formValues.otpCode}
                  handleOtpInput={(value: string) =>
                    handleFormChange("otpCode", value)
                  }
                  handleResendOtp={() => {}}
                  otpError={otpError}
                  otpTimer={otpTimer}
                  setOtpTimer={setOtpTimer}
                  otpMethod={otpMethod}
                  setOtpMethod={setOtpMethod}
                  otpType="register"
                  _email={_email}
                />
              )}

              {activeStep !== 4 && (
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3 }}
                  onClick={activeStep === 2 ? handleSubmit : handleNext}
                  disabled={isNextDisabled}
                >
                  <Typography variant="h6">
                    {activeStep === 2 ? "Submit" : "Continue"}
                  </Typography>
                </Button>
              )}
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              bgcolor: "#FFF",
              display: "flex",
              justifyContent: "space-between",
              px: { xs: 2, lg: 5 },
              py: 2,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 300 }}>
              &copy;&nbsp;Nexora 2026
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <a
                href="https://advanztek.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: ColorPallete.primary.main,
                  fontWeight: 300,
                  fontSize: "14px",
                }}
              >
                Terms & Conditions
              </a>

              <a
                href="https://advanztek.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: ColorPallete.primary.main,
                  fontWeight: 300,
                  fontSize: "14px",
                }}
              >
                Privacy Policies
              </a>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterPage;
