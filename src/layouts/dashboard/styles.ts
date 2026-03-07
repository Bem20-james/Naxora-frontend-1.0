import {
  drawerWidth,
  layoutPad,
  navHeight,
  layoutMargin,
} from "../../assets/data";
import { FontFamily } from "../../config/fonts";
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
      "linear-gradient(100deg, #22234B 20%, #0b2039ff 50%, #22234B 100%)",
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
    //backgroundColor: ColorPallete.primary.disabled,
    backgroundImage: "linear-gradient(180deg, #060B26 0%, #1A1F37 100%)",

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
  footer: {
    position: "static",
    bottom: 11,
    left: `${drawerWidth + 3}`,
    width: "100%",
    borderRadius: "6px",
    backgroundImage: "linear-gradient(150deg, #060B26 0%, #1A1F37 100%)",
    padding: "10px 20px",
    marginBottom: "-15px",
    boxShadow: `0 -1px 3px rgba(0, 0, 0, 0.1)`,
    transition: "width 0.3s",
  },

  footerOpen: {
    marginRight: 1.3,
    marginLeft: `${drawerWidth - 126}px`, // Adjusted to account for the Sidenav width
    width: `calc(100% - ${drawerWidth - 140}px)`, // Adjusted width to account for Sidenav and margins
  },
  footerClosed: {
    marginRight: 1.3,
    marginLeft: `${drawerWidth - 210}px`, // Adjusted to account for the closed Sidenav width and margins
    width: `calc(100% - ${drawerWidth - 224}px)`, // Adjusted width to account for closed Sidenav and margins
  },
  headerScrolled: {
    backgroundColor: "rgba(39, 38, 70, 0.8) !important",
    margin: { lg: "0 auto" },
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
    backdropFilter: "blur(5px)",
  },
};
