import { ColorPallete } from "../config/colors";

const authStyles = () => ({
  wrapper: {
    position: "static",
    display: "flex",
    justifyContent: "center",
    zIndex: 99,
    height: "100vh",
    boxSizing: "border-box",
  },

  logoImg: {
    display: "flex",
    justifyContent: "center",
  },

  gradient: {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "225px",
      left: "7%",
      height: "200px",
      width: "200px",
      bgcolor: ColorPallete.primary.default,
      filter: "blur(70px)",
      zIndex: 1,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "305px",
      left: "10%",
      height: "200px",
      width: "200px",
      bgcolor: ColorPallete.primary.default + "bb",
      filter: "blur(70px)",
      zIndex: 0,
    },
  },

  loginImg: {
    width: "250px",
    height: "300px",
    objectFit: "cover",
  },
});

export default authStyles;
