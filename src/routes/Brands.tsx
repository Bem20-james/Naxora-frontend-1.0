import { Routes, Route } from "react-router-dom";
import { BrandOverview } from "../pages/brands";

const BrandRoutes = () => {
  return (
    <Routes>
      <Route path="/brand/overview" element={<BrandOverview />} />
    </Routes>
  );
};

export default BrandRoutes;
