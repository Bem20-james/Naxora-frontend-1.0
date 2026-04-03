import { Box, Container, Typography, Stack, alpha } from "@mui/material";
import { RocketLaunchRounded } from "@mui/icons-material";
import { FontFamily } from "../../config/fonts";
import { AppButton } from "../dashboard";
import { COLORS } from "../../config/colors";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.background,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        pt: { xs: 12, md: 0 },
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

          <Typography
            sx={{
              color: COLORS.textSecondary,
              fontSize: { xs: "1rem", md: "1.2rem" },
              lineHeight: 1.6,
              maxWidth: "700px",
              fontWeight: 400,
            }}
          >
            Nexora provides the world-class infrastructure needed to bridge the
            gap between local talent and global markets. Empowering creators and
            businesses with next-gen tools tailored for the continent's unique
            digital landscape.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <AppButton
              to={"/auth/onboarding"}
              shape="pill"
              fullWidth
              size="md"
              variant="primary"
              sx={{ mt: "auto" }}
              onClick={() => {}}
              startIcon={<RocketLaunchRounded />}
            >
              Start Scaling Now
            </AppButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
