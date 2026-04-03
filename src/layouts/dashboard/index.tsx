import { useState } from "react";
import type { ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";

import NavBar from "./components/NavBar";
import SideNav, {
  DRAWER_WIDTH_OPEN,
  DRAWER_WIDTH_CLOSED,
} from "./components/SideNav";
import MobileSideNav from "./components/MobileMenu";
import Footer from "./components/Footer";

const NAV_HEIGHT = 70;

interface LayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);
  const toggleMobileDrawer = () => setMobileOpen((prev) => !prev);
  const closeMobileDrawer = () => setMobileOpen(false);

  const drawerWidth = open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f7f7fc" }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{
          display: { xs: "none", sm: "block" },
          flexShrink: 0,
          width: drawerWidth,
          transition: "width 0.3s ease",
        }}
      >
        <SideNav open={open} />
      </Box>

      <MobileSideNav open={mobileOpen} onClose={closeMobileDrawer} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          transition: "margin 0.3s ease",
        }}
      >
        <NavBar
          open={open}
          toggleDrawer={toggleDrawer}
          mobileToggle={toggleMobileDrawer}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            mt: `${NAV_HEIGHT}px`,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
            boxSizing: "border-box",
          }}
        >
          {children}
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
