import { Routes, Route } from "react-router-dom";
import {
  CreatorOverview,
  CampaignsPage,
  TransactionsPage,
  ProjectsPage,
  SubscriptionPage,
  SettingsPage,
  ProfilePage,
  Messaging,
} from "../pages/creators";
import { ProtectedRoute } from "./ProtectedRoute";

const CreatorRoutes = () => {
  return (
    <Routes>
      <Route
        path="/creator/overview"
        element={
          <ProtectedRoute>
            <CreatorOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/campaigns"
        element={
          <ProtectedRoute>
            <CampaignsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/projects"
        element={
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/messages"
        element={
          <ProtectedRoute>
            <Messaging />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/transactions"
        element={
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/subscriptions"
        element={
          <ProtectedRoute>
            <SubscriptionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default CreatorRoutes;
