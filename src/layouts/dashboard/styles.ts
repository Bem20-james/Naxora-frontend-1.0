import {
  drawerWidth,
  layoutPad,
  navHeight,
  layoutMargin,
} from "../../assets/data";
import { ColorPallete } from "../../config/colors";
import type { CSSProperties } from "react";

export const styles = {
  logo: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    marginTop: "10px",
  },
  mobileLogo: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    marginTop: "5px",
  } as CSSProperties,
  wrap: {
    display: "flex",
    backgroundImage:
      "linear-gradient(100deg, #ffffff 20%, rgb(244, 235, 239) 50%, #eaeaf1 100%)",
    width: "100vw",
    minHeight: "100vh",
  },
  contents: {
    flexGrow: 1,
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    pl: layoutPad + "px",
    pr: layoutPad + "px",
    pt: navHeight + layoutPad + "px",
    pb: layoutPad + "px",
    p: 3,
    ml: drawerWidth + "px",
  },
  navbar: {
    backgroundColor: "white",
    boxShadow: "0 0 8px rgba(180, 201, 211, 0.6)",
    borderRadius: "4px",
    position: "fixed",
    top: 0,
    left: 20,
    right: 10,
    pl: { xs: "30px", md: `${drawerWidth - 220}px` },
    pr: layoutPad + "px",
    margin: layoutMargin + "px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "width 0.3s ease-in-out",
    zIndex: 1990,
  },
  navRow: {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarOpen: {
    marginLeft: `${drawerWidth - 7}px`, // Adjusted to account for the Sidenav width
    width: `calc(100% - ${drawerWidth + 20}px)`, // Adjusted width to account for Sidenav and margins
  },
  navbarClosed: {
    marginLeft: "105px", // Adjusted to account for the closed Sidenav width and margins
    width: `calc(100% - 192px)`, // Adjusted width to account for closed Sidenav and margins
  },
  navLogo: {
    width: "50px",
  },
  children: {
    transition: "margin-left 0.3s",
    height: "100%",
    marginTop: -navHeight + 10 + "px",
    width: "100vw",
    minHeight: "100vh",
  },
  openChildren: {
    marginLeft: `${drawerWidth - 115}px`,
    width: `calc(100% + -120px)`,
  },
  closeChildren: {
    marginLeft: `${drawerWidth - 200}px`,
    width: `calc(100% + -32px)`,
  },

  btnDef: {
    borderRadius: 1,
    fontWeight: 300,
    fontSize: "12px",
    letterSpacing: ".3px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      "&:focus": {
        outline: "none",
        boxShadow: "none",
        border: "none",
      },
      "&:active": {
        outline: "none",
        boxShadow: "none",
        border: "none",
      },
    },
  },
  closeOpen: {
    color: ColorPallete.primary.default,
    mr: layoutMargin + "-5px",
    pr: layoutMargin + "-5px",
    border: "none",
  },
  hideUsrn: {
    display: "none",
  },
  footer: {
    position: "static",
    bottom: 5,
    left: `${drawerWidth + 3}`,
    width: "100%",
    borderRadius: "6px",
    backgroundColor: "white",
    boxShadow: "0 0 8px rgba(180, 201, 211, 0.6)",
    padding: "10px 20px",
    marginBottom: "-15px",
    transition: "width 0.3s",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: { xs: 2, lg: 5 },
    py: 2,
    flexShrink: 0,
  },

  footerOpen: {
    marginLeft: `${drawerWidth - 225}px`, // Adjusted to account for the Sidenav width
    width: `calc(100% - ${drawerWidth - 250}px)`, // Adjusted width to account for Sidenav and margins
  },
  footerClosed: {
    marginLeft: `${drawerWidth - 390}px`, // Adjusted to account for the closed Sidenav width and margins
    width: `calc(100% - ${drawerWidth - 260}px)`, // Adjusted width to account for closed Sidenav and margins
  },
  headerScrolled: {
    backgroundColor: "rgba(39, 38, 70, 0.8) !important",
    margin: { lg: "0 auto" },
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
    backdropFilter: "blur(5px)",
  },
};
