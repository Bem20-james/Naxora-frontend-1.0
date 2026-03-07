import { createTheme, responsiveFontSizes } from "@mui/material";
import { ColorPallete } from "../config/colors";

const baseTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1300,
      xl: 1536,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1D1E73",
      light: "#2E3094",
      dark: "#3F42B5",
      contrastText: "#7D87FF",
    },
    secondary: {
      dark: "#090E1A",
      light: "#060912",
      main: "#03050A",
      contrastText: "#455469",
    },
    error: {
      main: "#7F1D1D",
      light: "#991B1B",
      dark: "#B91C1C",
      contrastText: "#F87171",
    },
    warning: {
      main: "#713F12",
      light: "#854D0E",
      dark: "#A16207",
      contrastText: "#FBBF24",
    },
    success: {
      main: "#14532D",
      light: "#166534",
      dark: "#15803D",
      contrastText: "#32D583",
    },
  },
  typography: {
    fontFamily: "Rubik",
    h1: {
      fontFamily: "Raleway",
      fontSize: "56px",
    },
    h2: {
      fontFamily: "Raleway",
      fontSize: "48px",
    },
    h3: {
      fontFamily: "Raleway",
      fontSize: "40px",
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "32px",
    },
    h5: {
      fontFamily: "Raleway",
      fontSize: "24px",
    },
    h6: {
      fontFamily: "Raleway",
      fontSize: "20px",
    },
    body2: {
      fontFamily: "Rubik",
      fontSize: "14px",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
          outline: "none",
          overflowX: "hidden",
        },
        body: {
          fontFamily: "Rubik",
          margin: 0,
          padding: 0,
          outline: "none",
          lineHeight: 1.1,
          fontWeight: 400,
        },
        p: {
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: "none",
          borderRadius: 999,
          fontSize: "12px",
        },

        containedPrimary: {
          background: "linear-gradient(135deg, #2196F3 0%, #1565C0 100%)",
          color: "#FFFFFF",
          boxShadow: "0 4px 16px rgba(33,150,243,0.25)",
          "&:hover": {
            background: "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
            boxShadow: "0 6px 22px rgba(33,150,243,0.38)",
            transform: "translateY(-1px)",
          },
          "&:active": { transform: "translateY(0px)" },
        },

        containedSecondary: {
          background: "rgba(255,255,255,0.06)",
          color: "#FFF",
          border: "1px solid rgba(255,255,255,0.12)",

          "&:hover": {
            background: "rgba(255,255,255,0.10)",
          },
        },

        containedError: {
          background: "linear-gradient(135deg,#E53935 0%,#B71C1C 100%)",
          color: "#FFF",
        },

        containedInfo: {
          background: "linear-gradient(135deg,#2196F3 0%,#1565C0 100%)",
          color: "#FFF",

          "&:hover": {
            background: "linear-gradient(135deg,#42A5F5 0%,#1E88E5 100%)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: 9,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderWidth: "1.5px",
            },
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&.Mui-focused": {
            backgroundColor: "transparent",
          },
        },
        input: {
          padding: "13px 15px",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          color: "#FFF",
          backgroundColor: "transparent",
          boxShadow: "none",
          "& .Mui-expanded": {
            backgroundColor: ColorPallete.secondary.default,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: "#180D2C",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFF",
          borderRadius: "20px",
          padding: "10px",
          boxSizing: "border-box",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          fontFamily: "Raleway",
          fontWeight: 700,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          fontWeight: 700,
          fontFamily: "Raleway",
          boxSizing: "border-box",
        },
        paper: {
          backgroundColor: "#FFF",
          borderRadius: "20px",
          padding: "10px",
          boxSizing: "border-box",
        },
      },
    },
  },
});

export const theme = responsiveFontSizes(baseTheme);
