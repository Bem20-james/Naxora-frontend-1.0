import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  CssBaseline,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { drawerWidth } from "../../../assets/data";
import { ColorPallete } from "../../../config/colors";
import { Link, useLocation } from "react-router-dom";
import { getNav } from "../../../utils/getNav";
import { MOCK_USER } from "../../../utils/mockUser";
import { useNavigate } from "react-router-dom";

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : theme.spacing(9),
    boxSizing: "border-box",
    backgroundColor: "white",
    boxShadow: "0 0 8px rgba(180, 201, 211, 0.6)",
    height: "98vh",
    borderRadius: "6px",
    p: 2,
    margin: "6px",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: "hidden",
  },
}));

const SideNav = ({ open }: { open: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // temporary mock authentication
  const user = MOCK_USER;

  const navItems = getNav({ role: user?.role });

  return (
    <Drawer variant="permanent" open={open}>
      <CssBaseline />

      <Box sx={{ px: 3, mt: 2, display: open ? "block" : "none" }}>
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
            src="/logo/logo2.png"
            sx={{ width: 150, height: 64 }}
          />
        </Box>
      </Box>

      <Divider />
      <List>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link
                to={item.path}
                style={{
                  textDecoration: "none",
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    my: 0.5,
                    mx: 1,
                    borderRadius: 2,
                    backgroundColor: isActive
                      ? ColorPallete.primary.main
                      : "white",
                    transform: isActive ? "scale(1.02)" : "none",
                    "&:hover": {
                      backgroundColor: ColorPallete.primary.soft,
                      my: 1,
                      mx: 1,
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: isActive
                        ? ColorPallete.default.light
                        : ColorPallete.primary.main,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: isActive
                          ? ColorPallete.primary.default
                          : ColorPallete.primary.soft,
                        p: 1,
                        borderRadius: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {Icon && <Icon fontSize="small" />}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: ".8rem",
                        fontWeight: isActive ? "bold" : "normal",
                        color: isActive
                          ? ColorPallete.default.light
                          : ColorPallete.default.dark,
                      },
                    }}
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideNav;
