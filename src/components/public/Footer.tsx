import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LanguageIcon from "@mui/icons-material/Language";
import ShareIcon from "@mui/icons-material/Share";

const footerLinks: { heading: string; links: string[] }[] = [
  {
    heading: "PRODUCT",
    links: ["Features", "Integrations", "Enterprise"],
  },
  {
    heading: "SUPPORT",
    links: ["Help Center", "Contact Us", "Security"],
  },
  {
    heading: "LEGAL",
    links: ["Privacy", "Terms", "Cookies"],
  },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0D0E1C",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        pt: { xs: 6, md: 8 },
        pb: 0,
        position: "relative",
        overflow: "hidden",
        // Subtle radial glow top-left
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-10%",
          width: "420px",
          height: "260px",
          background:
            "radial-gradient(ellipse at top left, rgba(245,197,24,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Main grid */}
        <Grid
          container
          spacing={{ xs: 5, md: 4 }}
          sx={{ pb: { xs: 6, md: 7 } }}
        >
          {/* Brand column */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "9px",
                  bgcolor: "#F5C518",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 1.25,
                  boxShadow: "0 4px 14px rgba(245,197,24,0.30)",
                }}
              >
                <TrendingUpIcon sx={{ color: "#1A1A0E", fontSize: 20 }} />
              </Box>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "18px",
                  letterSpacing: "-0.3px",
                }}
              >
                AfriScale
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "#6B7280",
                fontSize: "13.5px",
                lineHeight: 1.7,
                maxWidth: "200px",
              }}
            >
              Empowering the next generation of African digital giants.
            </Typography>

            {/* Optional social pills */}
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              {["X", "Li", "Gh"].map((s) => (
                <Box
                  key={s}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    bgcolor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "rgba(245,197,24,0.12)",
                      borderColor: "rgba(245,197,24,0.3)",
                    },
                  }}
                >
                  <Typography
                    sx={{ color: "#9CA3AF", fontSize: "11px", fontWeight: 700 }}
                  >
                    {s}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <Grid size={{ xs: 6, sm: 3, md: 3 }} key={col.heading}>
              <Typography
                sx={{
                  color: "#F5C518",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  mb: 2.5,
                }}
              >
                {col.heading}
              </Typography>
              <Stack spacing={1.75}>
                {col.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="none"
                    sx={{
                      color: "#9CA3AF",
                      fontSize: "14px",
                      fontWeight: 400,
                      transition: "color 0.18s",
                      "&:hover": { color: "#FFFFFF" },
                      display: "inline-block",
                      width: "fit-content",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-2px",
                        left: 0,
                        width: 0,
                        height: "1px",
                        bgcolor: "#F5C518",
                        transition: "width 0.2s ease",
                      },
                      "&:hover::after": { width: "100%" },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        {/* Bottom bar */}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.07)" }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2.5,
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Typography sx={{ color: "#4B5563", fontSize: "12.5px" }}>
            © 2024 AfriScale Technologies. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              size="small"
              sx={{
                color: "#4B5563",
                "&:hover": {
                  color: "#F5C518",
                  bgcolor: "rgba(245,197,24,0.08)",
                },
                transition: "all 0.2s",
                borderRadius: "8px",
              }}
            >
              <LanguageIcon sx={{ fontSize: 17 }} />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: "#4B5563",
                "&:hover": {
                  color: "#F5C518",
                  bgcolor: "rgba(245,197,24,0.08)",
                },
                transition: "all 0.2s",
                borderRadius: "8px",
              }}
            >
              <ShareIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
