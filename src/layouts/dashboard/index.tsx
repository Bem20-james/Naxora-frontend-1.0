import { useState } from "react";
import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { ColorPallete } from "../../config/colors";
import { styles } from "./styles";

import NavBar from "./components/NavBar";
import SideNav from "./components/SideNav";
import MobileSideNav from "./components/MobileMenu";

const SIDE_NAV_WIDTH = 210;
const LAYOUT_PADDING = 20;
const NAV_HEIGHT = 80;

interface LayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleSideNavTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <Box
      component="main"
      sx={[styles.contents, open ? styles.footerOpen : styles.footerClosed]}
    >
      {" "}
      {/* Top Navigation Bar */}
      <NavBar open={open} toggleDrawer={toggleDrawer} />
      {/* Side Navigation */}
      <Box
        component="nav"
        sx={{
          width: { sm: SIDE_NAV_WIDTH },
          flexShrink: { sm: 0 },
        }}
        aria-label="side-navigation"
      >
        {/* Mobile Drawer */}
        <MobileSideNav
          open={mobileOpen}
          width={SIDE_NAV_WIDTH}
          onClose={handleDrawerClose}
          onTransitionEnd={handleSideNavTransitionEnd}
        />

        {/* Desktop Drawer */}
        <SideNav open={open} />
      </Box>
      {/* Main Content Area */}
      <Box
        flex={1}
        component="main"
        sx={[
          styles.children,
          open ? styles.openChildren : styles.closeChildren,
          {
            boxSizing: "border-box",
            pl: `${LAYOUT_PADDING + 0}px`,
            pr: `${LAYOUT_PADDING}px`,
            pt: `${NAV_HEIGHT + LAYOUT_PADDING}px`,
            pb: `${LAYOUT_PADDING}px`,
          },
        ]}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
