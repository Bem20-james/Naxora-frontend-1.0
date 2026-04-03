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
import LanguageIcon from "@mui/icons-material/Language";
import ShareIcon from "@mui/icons-material/Share";
import { ColorPallete } from "../../config/colors";
import { useNavigate } from "react-router-dom";
import { footerLinks } from "./data";

const Footer = () => {
  const navigate = useNavigate();
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
        <Grid
          container
          spacing={{ xs: 5, md: 4 }}
          sx={{ pb: { xs: 6, md: 7 } }}
        >
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                ml: -7,
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Box
                component="img"
                src="/logo/logo2.png"
                sx={{ width: "100%", height: "100%" }}
              />
            </Box>

            <Typography
              sx={{
                color: "#6B7280",
                fontSize: "13px",
                lineHeight: 1.7,
                maxWidth: "200px",
              }}
            >
              Empowering the next generation of African digital giants.
            </Typography>

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

          {footerLinks.map((col) => (
            <Grid size={{ xs: 6, sm: 3, md: 3 }} key={col.heading}>
              <Typography
                sx={{
                  color: ColorPallete.warning.soft,
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
                        bgcolor: ColorPallete.warning.soft,
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
            © 2026 Nexora. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              size="small"
              sx={{
                color: "#4B5563",
                "&:hover": {
                  color: ColorPallete.warning.soft,
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
                  color: ColorPallete.warning.soft,
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
