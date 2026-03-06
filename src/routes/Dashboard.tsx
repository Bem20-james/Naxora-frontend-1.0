import BrandRoutes from "./Brands";
import CreatorRoutes from "./Creators";
import AdminRoutes from "./Admin";
import DashboardLayout from "../layouts/dashboard";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <AdminRoutes />
      <BrandRoutes />
      <CreatorRoutes />
    </DashboardLayout>
  );
};

export default DashboardRoutes;
