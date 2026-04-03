import { Box, Typography, Stack } from "@mui/material";
import { ColorPallete } from "../../../config/colors";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        px: 3,
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
        borderTop: "1px solid #f0f0f5",
        background: "#ffffff",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.75rem",
          color: "#bbb",
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}
      >
        &copy; Nexora 2026 — All rights reserved
      </Typography>

      <Stack direction="row" gap={2.5}>
        {[
          { label: "Terms & Conditions", href: "https://advanztek.com" },
          { label: "Privacy Policy", href: "https://advanztek.com" },
          { label: "Support", href: "https://advanztek.com" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: ColorPallete.primary.main,
              fontSize: "0.75rem",
              fontWeight: 500,
              textDecoration: "none",
              opacity: 0.8,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.opacity = "1")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.opacity = "0.8")
            }
          >
            {label}
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default Footer;
