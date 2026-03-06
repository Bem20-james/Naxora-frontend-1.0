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
      main: ColorPallete.primary.default,
    },
    secondary: {
      main: ColorPallete.secondary.default,
    },
    success: {
      main: ColorPallete.success.default,
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
          color: "#FFFFFF",
          fontWeight: 500,
          textTransform: "none",
          borderRadius: 999,
          fontSize: "12px",
        },
        sizeMedium: {
          padding: "8px 40px",
        },
        containedPrimary: {
          backgroundColor: ColorPallete.secondary.default,
        },
        containedInfo: {
          backgroundColor: "#FFF",
          color: "#000",
          "&:hover": {
            color: "red",
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
