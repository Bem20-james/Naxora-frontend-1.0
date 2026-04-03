import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CampaignIcon from "@mui/icons-material/Campaign";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  PageShell,
  Card,
  CardHeader,
  StatTile,
  EntityAvatar,
} from "../../../components/dashboard/SharedUI";
import {
  MOCK_BRAND_CAMPAIGNS,
  MOCK_APPLICATIONS,
  MOCK_BRAND,
} from "./mockData";
import { ColorPallete } from "../../../config/colors";
import { AppButton } from "../../../components/dashboard";
import ImpressionsChart from "./ImpressionsChart";
import SpendingBar from "./SpendingBar";
import CampaignSummary from "./CampaignSummary";

const BrandOverview = () => {
  const navigate = useNavigate();
  const activeCampaigns = MOCK_BRAND_CAMPAIGNS.filter(
    (c) => c.status === "active",
  );
  const pendingApps = MOCK_APPLICATIONS.filter((a) => a.status === "pending");

  const totalImpressions = MOCK_BRAND_CAMPAIGNS.reduce(
    (s, c) => s + c.analytics.impressions,
    0,
  );
  const totalSpent = MOCK_BRAND_CAMPAIGNS.reduce(
    (s, c) => s + c.budgetSpent,
    0,
  );

  const avgROI = Math.round(
    MOCK_BRAND_CAMPAIGNS.filter((c) => c.analytics.roi > 0).reduce(
      (s, c) => s + c.analytics.roi,
      0,
    ) / MOCK_BRAND_CAMPAIGNS.filter((c) => c.analytics.roi > 0).length,
  );

  return (
    <PageShell
      title={`Welcome back, ${MOCK_BRAND.companyName} 👋`}
      subtitle="Here's your campaign performance at a glance."
      action={
        <AppButton
          shape="rounded"
          fullWidth
          variant="primary"
          disableElevation
          startIcon={<AddIcon />}
          sx={{
            fontWeight: 700,
            fontSize: "0.82rem",
            textTransform: "none",
            py: 1,
            px: 2,
            background: ColorPallete.primary.main,
            "&:hover": { opacity: 0.9, background: ColorPallete.primary.main },
          }}
          onClick={() => navigate("/brand/campaigns/create")}
        >
          New Campaign
        </AppButton>
      }
    >
      {/* KPI row */}
      <Grid container spacing={2} mb={3}>
        {[
          {
            label: "Total Impressions",
            value: `${(totalImpressions / 1000).toFixed(0)}K`,
            trend: 18,
            icon: <VisibilityIcon fontSize="small" />,
            color: ColorPallete.primary.main,
          },
          {
            label: "Active Campaigns",
            value: activeCampaigns.length,
            trend: 0,
            icon: <CampaignIcon fontSize="small" />,
            color: "#6366f1",
          },
          {
            label: "Total Spent",
            value: `$${totalSpent.toLocaleString()}`,
            trend: -4,
            icon: <AttachMoneyIcon fontSize="small" />,
            color: "#f59e0b",
          },
          {
            label: "Avg. ROI",
            value: `${avgROI}%`,
            trend: 12,
            icon: <TrendingUpIcon fontSize="small" />,
            color: "#22c55e",
          },
        ].map((s) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={s.label}>
            <StatTile {...s} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5} mb={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ImpressionsChart />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <SpendingBar />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <CampaignSummary />
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card>
            <CardHeader
              title="New Applications"
              subtitle={`${pendingApps.length} pending review`}
              action={
                <Button
                  size="small"
                  variant="text"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                  onClick={() => navigate("/dashboard/brand/applications")}
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: ColorPallete.primary.main,
                    textTransform: "none",
                  }}
                >
                  View all
                </Button>
              }
            />
            {pendingApps.length === 0 ? (
              <Box sx={{ py: 5, textAlign: "center" }}>
                <Typography sx={{ fontSize: "0.82rem", color: "#aaa" }}>
                  No pending applications
                </Typography>
              </Box>
            ) : (
              pendingApps.map((a, i) => (
                <Box
                  key={a.id}
                  onClick={() => navigate("/brand/applications")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 3,
                    py: 1.8,
                    borderBottom:
                      i < pendingApps.length - 1 ? "1px solid #f7f7fc" : "none",
                    cursor: "pointer",
                    "&:hover": { background: "#fafafa" },
                    transition: "background 0.15s",
                  }}
                >
                  <EntityAvatar
                    initials={a.creatorAvatar}
                    color={a.creatorColor}
                    size={36}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#0f0f1a",
                      }}
                    >
                      {a.creatorName}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        color: "#aaa",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {a.campaignTitle}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#0f0f1a",
                      flexShrink: 0,
                    }}
                  >
                    ${a.proposedRate.toLocaleString()}
                  </Typography>
                </Box>
              ))
            )}
          </Card>
        </Grid>
      </Grid>
    </PageShell>
  );
};

export default BrandOverview;
