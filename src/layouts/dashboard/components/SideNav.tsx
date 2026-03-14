import { styled } from "@mui/material/styles";
import { Box, Divider, CssBaseline } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { drawerWidth } from "../../../assets/data";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "./NavMenu";

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
  const navigate = useNavigate();

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
      <NavigationMenu open={open} />
      <Divider />
    </Drawer>
  );
};

export default SideNav;
