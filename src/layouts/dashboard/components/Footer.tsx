import { Box, Typography } from "@mui/material";
import { ColorPallete } from "../../../config/colors";
import { styles } from "../styles";

const Footer = () => {
  return (
    <Box sx={[styles.footer]}>
      <Typography variant="body2" sx={{ fontWeight: 300, color: "#999" }}>
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
  );
};

export default Footer;
