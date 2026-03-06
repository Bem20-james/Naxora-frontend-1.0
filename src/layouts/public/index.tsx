import { useLocation } from "react-router-dom";
import { Header, Footer } from "../../components/public";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function PublicLayout({ children }: LayoutProps) {
  const location = useLocation();

  const noLayoutRoutes = [
    "/auth/login",
    "/auth/onboarding",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/verify-email",
    "/auth/otp-verify",
  ];

  const hideLayout = noLayoutRoutes.includes(location.pathname);
  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

export default PublicLayout;
