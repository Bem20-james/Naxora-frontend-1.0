import { Box, Container, Paper, Grid, alpha } from "@mui/material";
import { FontFamily } from "../../config/fonts";

const DashboardShowcase = () => {
  // Brand Colors
  const COLORS = {
    background: "#0B0E14",
    accent: "#00F5D4", // Neon Aqua from your palette
    border: "#1E293B",
    cardBg: "#F8FAFC",
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.background,
        pb: 15,
        perspective: "1500px", // Adds depth for the 3D tilt
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* THE OUTER GLOWING FRAME */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            backgroundColor: alpha(COLORS.accent, 0.1),
            borderRadius: "40px",
            p: { xs: 2, md: 6 },
            border: `1px solid ${alpha(COLORS.accent, 0.2)}`,
            boxShadow: `0 0 80px ${alpha(COLORS.accent, 0.05)}`,
            transform: "rotateX(10deg) rotateY(-5deg)", // Subtle 3D tilt
            transition: "all 0.5s ease-in-out",
            "&:hover": {
              transform: "rotateX(0deg) rotateY(0deg) scale(1.02)",
              boxShadow: `0 0 100px ${alpha(COLORS.accent, 0.15)}`,
            },
          }}
        >
          {/* THE ACTUAL DASHBOARD MOCKUP */}
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              overflow: "hidden",
              border: "8px solid #E2E8F0",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Mock Header */}
            <Box
              sx={{
                height: 40,
                borderBottom: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                px: 2,
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "#FF5F56",
                }}
              />
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "#FFBD2E",
                }}
              />
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "#27C93F",
                }}
              />
            </Box>

            {/* Dashboard Content Grid */}
            <Box sx={{ p: 3, bgcolor: COLORS.cardBg }}>
              <Grid container spacing={3}>
                {/* Top Left: Growth Chart */}
                <Grid item xs={12} md={5}>
                  <CardMockup
                    title="Audience Growth"
                    type="line"
                    color={COLORS.accent}
                  />
                </Grid>
                {/* Top Right: Bar Chart */}
                <Grid item xs={12} md={7}>
                  <CardMockup
                    title="Revenue Distribution"
                    type="bars"
                    color={COLORS.accent}
                  />
                </Grid>
                {/* Bottom Left: Small Stats */}
                <Grid item xs={12} md={4}>
                  <CardMockup
                    title="Active Sessions"
                    type="small-bars"
                    color={COLORS.accent}
                  />
                </Grid>
                {/* Bottom Right: World Map */}
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      height: 240,
                      borderRadius: 4,
                      bgcolor: "white",
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    {/* Simplified Map Visualization */}
                    <Box
                      component="img"
                      src="/Images/map_placeholder.png"
                      sx={{ width: "80%", opacity: 0.3 }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        width: 60,
                        height: 60,
                        bgcolor: alpha(COLORS.accent, 0.4),
                        borderRadius: "50%",
                        border: `2px solid ${COLORS.accent}`,
                        boxShadow: `0 0 20px ${COLORS.accent}`,
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

// Helper component for the chart mockups
const CardMockup = ({ title, type, color }) => (
  <Box
    sx={{
      bgcolor: "white",
      p: 2,
      borderRadius: 4,
      border: "1px solid #E2E8F0",
      height: "100%",
    }}
  >
    <Box
      sx={{
        width: "40%",
        height: 10,
        bgcolor: "#E2E8F0",
        borderRadius: 1,
        mb: 2,
      }}
    />
    <Box
      sx={{
        width: "100%",
        height: 120,
        display: "flex",
        alignItems: "flex-end",
        gap: 1,
        pt: 2,
      }}
    >
      {type === "line" ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderLeft: `2px solid ${color}`,
            borderBottom: `2px solid ${color}`,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: 10,
              width: "80%",
              height: 2,
              bgcolor: color,
              transform: "rotate(-30deg)",
              transformOrigin: "left",
            }}
          />
        </Box>
      ) : (
        [...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: `${Math.random() * 80 + 20}%`,
              bgcolor: alpha(color, 0.8),
              borderRadius: "4px 4px 0 0",
            }}
          />
        ))
      )}
    </Box>
  </Box>
);

export default DashboardShowcase;
