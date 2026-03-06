import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import PublicLayout from "../layouts/public";
import { HomePage } from "../pages/public";

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/onboarding" element={<RegisterPage />} />
        <Route index path="/" element={<HomePage />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
