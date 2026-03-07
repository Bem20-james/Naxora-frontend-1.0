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
  Divider,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
import { FontFamily } from "../../config/fonts";
import { menuItems } from "./data";
import { ColorPallete } from "../../config/colors";
import { AppButton } from "../dashboard";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => setMobileOpen((prev) => !prev);
  const handleGetStarted = () => navigate("/login");

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
                      color: isActive
                        ? ColorPallete.default.light
                        : ColorPallete.default.secondary,
                      fontWeight: 500,
                      fontSize: "0.80rem",
                      fontFamily: FontFamily.primary,
                      transition: "all 0.3s ease",
                      position: "relative",
                      "&:hover": {
                        color: ColorPallete.default.light,
                      },
                      "&::after": isActive
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: -8,
                            left: "20%",
                            width: "60%",
                            height: "2px",
                            backgroundColor: ColorPallete.warning.default,
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

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AppButton
                to={"/auth/onboarding"}
                shape="rounded"
                fullWidth
                variant="primary"
                sx={{ mt: "auto" }}
                onClick={() => {}}
              >
                Get Started
              </AppButton>

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

      {/* MOBILE DRAWER  */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleToggle}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 350,
            backgroundColor: ColorPallete.primary.default,
            color: "#FFFFFF",
            p: 3,
          },
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
              backgroundColor: ColorPallete.accent.default,
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
