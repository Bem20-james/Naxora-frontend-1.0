import { Box, Stack, Typography, Avatar, IconButton } from "@mui/material";
import SegmentIcon from "@mui/icons-material/Segment";
import { useEffect, useState } from "react";
import { styles } from "../styles";
import { FontFamily } from "../../../config/fonts";
import { LogoutRounded } from "@mui/icons-material";
import { ColorPallete } from "../../../config/colors";

interface NavBarProps {
  open: boolean;
  toggleDrawer: any;
}

const NavBar = ({ open, toggleDrawer }: NavBarProps) => {
  const [scrolled, setScrolled] = useState(false);

  /**
   * Handle scroll state
   * Uses passive listener for performance
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position="fixed"
      sx={[
        styles.navbar,
        open ? styles.navbarOpen : styles.navbarClosed,
        scrolled && styles.headerScrolled,
        {
          marginLeft: { lg: open ? "15%" : "4%" },
          width: {
            lg: open ? "calc(100% - 255px)" : "calc(100% - 87px)",
          },
        },
      ]}
    >
      {/* Drawer Toggle */}
      <IconButton onClick={toggleDrawer}>
        <SegmentIcon sx={{ ...styles.closeOpen, fontSize: "30px" }} />
      </IconButton>

      {/* Welcome Section */}
      <Stack direction="row" gap={1} alignItems="baseline">
        <Typography
          variant="body2"
          sx={{ fontFamily: FontFamily.primary }}
          color="#fff"
        >
          Hi Temitope,
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          Welcome
        </Typography>
      </Stack>

      {/* Actions */}
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <IconButton sx={{ color: "#FFFFFF" }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: `linear-gradient(135deg, ${ColorPallete.primary.main} 0%, ${ColorPallete.secondary.main} 100%)`,
              fontWeight: 700,
            }}
          >
            {"T"}
          </Avatar>
        </IconButton>
        <IconButton sx={{ color: "#FFFFFF" }}>
          <LogoutRounded />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default NavBar;
