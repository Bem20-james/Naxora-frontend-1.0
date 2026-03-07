import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import PublicLayout from "../layouts/public";
import { AboutUs, HomePage, Pricing } from "../pages/public";

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/onboarding" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />

        <Route index path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/pricing-and-plans" element={<Pricing />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
