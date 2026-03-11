import { Routes, Route } from "react-router-dom";
import { AdminOverview } from "../pages/dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="admin/overview" element={<AdminOverview />} />
    </Routes>
  );
};

export default AdminRoutes;
