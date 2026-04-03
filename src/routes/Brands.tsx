import { Routes, Route } from "react-router-dom";
import {
  Applications,
  BrandCampaign,
  BrandOverview,
  Analytics,
  Creators,
  Subscriptions,
  CreateCampaignPage,
  CampaignDetails,
  BrandProfilePage,
  BrandSettingsPage,
  NotificationsPage,
  TransactionsPage,
  Messaging,
} from "../pages/brands";
import { ProtectedRoute } from "./ProtectedRoute";

const BrandRoutes = () => {
  return (
    <Routes>
      <Route
        path="/brand/overview"
        element={
          <ProtectedRoute>
            <BrandOverview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/brand/campaigns"
        element={
          <ProtectedRoute>
            <BrandCampaign />
          </ProtectedRoute>
        }
      />

      <Route
        path="/brand/create/campaigns"
        element={
          <ProtectedRoute>
            <CreateCampaignPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/brand/campaigns/:campaignId"
        element={
          <ProtectedRoute>
            <CampaignDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/brand/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/creators-marketplace"
        element={
          <ProtectedRoute>
            <Creators />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/subscriptions"
        element={
          <ProtectedRoute>
            <Subscriptions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/brand/profile"
        element={
          <ProtectedRoute>
            <BrandProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/brand/settings"
        element={
          <ProtectedRoute>
            <BrandSettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/brand/transactions"
        element={
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/brand/messages"
        element={
          <ProtectedRoute>
            <Messaging />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default BrandRoutes;
