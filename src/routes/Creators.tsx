import { Routes, Route } from "react-router-dom";
import { CreatorOverview } from "../pages/creators";

const CreatorRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard/creator/overview" element={<CreatorOverview />} />
    </Routes>
  );
};

export default CreatorRoutes;
