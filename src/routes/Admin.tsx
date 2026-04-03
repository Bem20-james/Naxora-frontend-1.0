import { Routes, Route } from "react-router-dom";
import { AdminOverview } from "../pages/dashboard";
import { ProtectedRoute } from "./ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="admin/overview"
        element={
          <ProtectedRoute>
            <AdminOverview />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
