import { Box, Container, Typography, alpha } from "@mui/material";
import { FontFamily } from "../../config/fonts";

const AboutHero = () => {
  // Brand Colors from your palette
  const COLORS = {
    background: "#0B0E14", // Deep Navy
    accent: "#EAB308", // Yellow Base
    textSecondary: "#CBD5E1",
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: COLORS.background,
      }}
    >
      {/* BACKGROUND IMAGE WITH ZOOM ANIMATION */}
      <Box
        sx={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundImage: `url('/about-hero.png')`, // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          "@keyframes softZoom": {
            "0%": { transform: "scale(1)" },
            "100%": { transform: "scale(1.1)" },
          },
        }}
      />

      {/* MULTI-LAYERED OVERLAY FOR DEPTH */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          background: `linear-gradient(to bottom, 
            ${alpha(COLORS.background, 0.4)} 0%, 
            ${alpha(COLORS.background, 0.8)} 60%, 
            ${COLORS.background} 100%)`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{ textAlign: "center", maxWidth: "900px", mx: "auto" }}>
          {/* 1. IDENTITY TAG */}
          <Typography
            variant="overline"
            sx={{
              color: COLORS.accent,
              fontWeight: 800,
              letterSpacing: "3px",
              fontSize: "0.9rem",
              fontFamily: FontFamily.primary,
              mb: 2,
              display: "block",
            }}
          >
            OUR IDENTITY
          </Typography>

          {/* 2. MAIN TITLE */}
          <Typography
            variant="h1"
            sx={{
              color: "#FFFFFF",
              fontWeight: 850,
              fontSize: { xs: "2.5rem", md: "4.5rem" },
              lineHeight: 1.1,
              mb: 3,
              fontFamily: FontFamily.primary,
              letterSpacing: "-0.02em",
            }}
          >
            Empowering Africa’s{" "}
            <Box
              component="span"
              sx={{
                color: COLORS.accent,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "10%",
                  left: 0,
                  width: "100%",
                  height: "8px",
                  backgroundColor: alpha(COLORS.accent, 0.2),
                  zIndex: -1,
                },
              }}
            >
              Digital Economy
            </Box>
          </Typography>

          {/* 3. SUBTEXT */}
          <Typography
            sx={{
              color: COLORS.textSecondary,
              fontSize: { xs: "1.1rem", md: "1.4rem" },
              lineHeight: 1.6,
              maxWidth: "750px",
              mx: "auto",
              fontWeight: 400,
              opacity: 0.9,
            }}
          >
            We are building the bridges between local innovation and global
            scalability, one connection at a time.
          </Typography>
        </Box>
      </Container>

      {/* DECORATIVE BOTTOM BLUR */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100px",
          background: `linear-gradient(to top, ${COLORS.background}, transparent)`,
          zIndex: 3,
        }}
      />
    </Box>
  );
};

export default AboutHero;
