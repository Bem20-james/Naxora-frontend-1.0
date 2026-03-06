import { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { theme } from "./themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoutes from "./routes/Public";
import DashboardRoutes from "./routes/Dashboard";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer />
          <Routes>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
