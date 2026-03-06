import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  alpha,
} from "@mui/material";
import { PlayArrowRounded, RocketLaunchRounded } from "@mui/icons-material";
import { FontFamily } from "../../config/fonts";

const HeroSection = () => {
  // Brand Colors based on your palette
  const COLORS = {
    background: "#0B0E14", // Deep Navy
    accent: "#EAB308", // Yellow Base
    textSecondary: "#94A3B8",
    glow: "rgba(234, 179, 8, 0.15)",
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.background,
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        pt: { xs: 12, md: 0 },
        // Subtle radial gradient for that "premium" look
        "&::before": {
          content: '""',
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${COLORS.glow} 0%, transparent 70%)`,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* 1. TOP BADGE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 0.8,
              borderRadius: "50px",
              border: `1px solid ${alpha(COLORS.accent, 0.3)}`,
              backgroundColor: alpha(COLORS.accent, 0.05),
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: COLORS.accent,
                boxShadow: `0 0 10px ${COLORS.accent}`,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: COLORS.accent,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontFamily: FontFamily.primary,
              }}
            >
              The Future of African Media
            </Typography>
          </Box>

          {/* 2. MAIN HEADING */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
              fontWeight: 850,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
              fontFamily: FontFamily.primary,
            }}
          >
            Scale Your Influence <br />
            <Box component="span" sx={{ color: COLORS.accent }}>
              Across Africa
            </Box>
          </Typography>

          {/* 3. SUBTEXT */}
          <Typography
            sx={{
              color: COLORS.textSecondary,
              fontSize: { xs: "1rem", md: "1.2rem" },
              lineHeight: 1.6,
              maxWidth: "700px",
              fontWeight: 400,
            }}
          >
            AfriScale provides the world-class infrastructure needed to bridge
            the gap between local talent and global markets. Empowering creators
            and businesses with next-gen tools tailored for the continent's
            unique digital landscape.
          </Typography>

          {/* 4. CALL TO ACTION BUTTONS */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<RocketLaunchRounded />}
              sx={{
                backgroundColor: COLORS.accent,
                color: "#000",
                px: 5,
                py: 2,
                borderRadius: "50px",
                fontWeight: 800,
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: `0 10px 30px ${alpha(COLORS.accent, 0.4)}`,
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                  transform: "translateY(-3px)",
                  boxShadow: `0 15px 35px ${alpha(COLORS.accent, 0.5)}`,
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Start Scaling Now
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrowRounded />}
              sx={{
                color: "#FFFFFF",
                borderColor: alpha("#FFFFFF", 0.2),
                px: 5,
                py: 2,
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
                backgroundColor: alpha("#FFFFFF", 0.03),
                "&:hover": {
                  borderColor: "#FFFFFF",
                  backgroundColor: alpha("#FFFFFF", 0.1),
                  transform: "translateY(-3px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              View Demo
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
