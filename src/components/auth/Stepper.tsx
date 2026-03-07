import React, { useEffect, useState } from "react";
import { Box, Typography, Button, keyframes, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { styled } from "@mui/material/styles";
import { ColorPallete } from "../../config/colors";
import { STEPS } from "../../assets/data";

export interface StepperProps {
  activeStep: number;
  onBack: () => void;
}

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const ProgressTrack = styled(Box)({
  width: "100%",
  height: 3,
  borderRadius: 99,
  background: "rgba(0,0,0,0.07)",
  overflow: "hidden",
  position: "relative",
});

const ProgressFill = styled(Box)<{ width: number; animating: boolean }>(
  ({ width, animating }) => ({
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: `${width}%`,
    borderRadius: 99,
    background: "linear-gradient(90deg, #6C63FF, #A78BFA)",
    transition: animating ? "width 0.9s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
    boxShadow: "0 0 10px rgba(108,99,255,0.35)",
    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#A78BFA",
      boxShadow: "0 0 6px rgba(167,139,250,0.8)",
    },
  }),
);

const BackBtn = styled(Button)({
  minWidth: 0,
  padding: "6px",
  borderRadius: "8px",
  color: "#555",
  "&:hover": {
    background: "rgba(0,0,0,0.05)",
    color: "#000",
  },
});

const HorizontalStepper: React.FC<StepperProps> = ({ activeStep, onBack }) => {
  const total = STEPS.length;
  const current = STEPS[activeStep];
  const stepNumber = activeStep + 1;
  const [displayedWidth, setDisplayedWidth] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [key, setKey] = useState(0); // force re-anim on step change

  const targetWidth = (stepNumber / total) * 100;

  useEffect(() => {
    // Trigger fill animation on every step change
    setAnimating(true);
    setKey((k) => k + 1);

    // Small delay so React renders with 0 width first, then animates
    const t = setTimeout(() => setDisplayedWidth(targetWidth), 60);
    return () => clearTimeout(t);
  }, [activeStep]);

  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        px: { xs: 3, sm: 5, md: 4 },
        py: { xs: "20px", md: "24px" },
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"row"}>
            <Box sx={{ width: 32 }}>
              {activeStep > 0 && (
                <BackBtn onClick={onBack} aria-label="Go back" disableRipple>
                  <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                </BackBtn>
              )}
            </Box>

            <Box
              key={activeStep}
              sx={{
                textAlign: "center",
                animation: `${slideUp} 0.4s ease both`,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "17px", md: "19px" },
                  fontWeight: 700,
                  color: "#0D0D0D",
                  letterSpacing: "-0.3px",
                  lineHeight: 1.2,
                  mb: "4px",
                }}
              >
                {current.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#AAAAAA",
                  fontWeight: 400,
                }}
              >
                {current.description}
              </Typography>
            </Box>
          </Stack>

          <Box>
            <Typography
              sx={{
                fontSize: 10,
                letterSpacing: "3px",
                color: ColorPallete.warning.default,
                textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {String(stepNumber).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </Typography>
          </Box>
        </Box>

        <ProgressTrack>
          <ProgressFill
            key={key}
            width={displayedWidth}
            animating={animating}
          />
        </ProgressTrack>
      </Box>
    </Box>
  );
};

export default HorizontalStepper;
