import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MenuRounded, CloseRounded } from "@mui/icons-material";
import { FontFamily } from "../../config/fonts";
import { menuItems } from "./data";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => setMobileOpen((prev) => !prev);

  const handleGetStarted = () => navigate("/login");

  // Custom styles to match the image precisely
  const COLORS = {
    background: "#0B0E14", // Deep dark navy from image
    accent: "#EAB308", // Vibrant yellow from image
    textSecondary: "#94A3B8",
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "rgba(11, 14, 20, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          height: "80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Box
                component="img"
                src="/logo/logo1.png"
                sx={{ width: 150, height: 150 }}
              />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Box
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      textDecoration: "none",
                      color: isActive ? "#FFFFFF" : COLORS.textSecondary,
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      fontFamily: FontFamily.primary,
                      transition: "all 0.3s ease",
                      position: "relative",
                      "&:hover": {
                        color: "#FFFFFF",
                      },
                      "&::after": isActive
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: -8,
                            left: "20%",
                            width: "60%",
                            height: "2px",
                            backgroundColor: COLORS.accent,
                            borderRadius: "10px",
                          }
                        : {},
                    }}
                  >
                    {item.label}
                  </Box>
                );
              })}
            </Box>

            {/* ACTION BUTTONS */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                onClick={handleGetStarted}
                variant="contained"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  backgroundColor: COLORS.accent,
                  color: "#000000",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  px: 4,
                  py: 1.2,
                  borderRadius: "50px", // Pill shape from image
                  fontFamily: FontFamily.primary,
                  boxShadow: `0 8px 20px ${COLORS.accent}33`,
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                    boxShadow: `0 8px 25px ${COLORS.accent}55`,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Get Started
              </Button>

              {/* Mobile Menu Toggle */}
              <IconButton
                onClick={handleToggle}
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "#FFFFFF",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                }}
              >
                <MenuRounded />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER - Refactored for Professional Dark Look */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleToggle}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 350,
            backgroundColor: COLORS.background,
            color: "#FFFFFF",
            p: 3,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
          <Typography variant="h6" fontWeight={800}>
            AfriScale
          </Typography>
          <IconButton onClick={handleToggle} sx={{ color: "#FFFFFF" }}>
            <CloseRounded />
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={handleToggle}
                sx={{ py: 2, borderRadius: 2 }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: "auto", pb: 4 }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />
          <Button
            fullWidth
            variant="contained"
            onClick={handleGetStarted}
            sx={{
              backgroundColor: COLORS.accent,
              color: "#000",
              py: 2,
              borderRadius: "50px",
              fontWeight: 700,
            }}
          >
            Get Started
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
