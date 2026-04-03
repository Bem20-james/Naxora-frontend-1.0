import { Box, Grid, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  PageShell,
  Card,
  CardHeader,
  StatTile,
  CampaignStatusChip,
} from "../../../components/dashboard/SharedUI";
import { MOCK_BRAND_CAMPAIGNS } from "./data";
import { ColorPallete } from "../../../config/colors";
import TrendChart from "./TrendChart";
import Impressions from "./Impressions";
import { ChartTooltip } from "../../../components/dashboard";

const BrandAnalyticsPage = () => {
  const totalImpressions = MOCK_BRAND_CAMPAIGNS.reduce(
    (s, c) => s + c.analytics.impressions,
    0,
  );
  const totalReach = MOCK_BRAND_CAMPAIGNS.reduce(
    (s, c) => s + c.analytics.reach,
    0,
  );
  const totalClicks = MOCK_BRAND_CAMPAIGNS.reduce(
    (s, c) => s + c.analytics.clicks,
    0,
  );
  const totalConversions = MOCK_BRAND_CAMPAIGNS.reduce(
    (s, c) => s + c.analytics.conversions,
    0,
  );
  const avgEngagement = (
    MOCK_BRAND_CAMPAIGNS.filter((c) => c.analytics.engagementRate > 0).reduce(
      (s, c) => s + c.analytics.engagementRate,
      0,
    ) /
    MOCK_BRAND_CAMPAIGNS.filter((c) => c.analytics.engagementRate > 0).length
  ).toFixed(1);
  const avgROI = Math.round(
    MOCK_BRAND_CAMPAIGNS.filter((c) => c.analytics.roi > 0).reduce(
      (s, c) => s + c.analytics.roi,
      0,
    ) / MOCK_BRAND_CAMPAIGNS.filter((c) => c.analytics.roi > 0).length,
  );

  // Per-campaign performance table data
  const tableData = MOCK_BRAND_CAMPAIGNS.map((c) => ({
    title: c.title,
    status: c.status,
    impressions: c.analytics.impressions,
    clicks: c.analytics.clicks,
    conversions: c.analytics.conversions,
    engagement: c.analytics.engagementRate,
    roi: c.analytics.roi,
    budget: c.budget,
    spent: c.budgetSpent,
  }));

  return (
    <PageShell
      title="Analytics"
      subtitle="Aggregated performance metrics across all your campaigns."
    >
      {/* Top KPIs */}
      <Grid container spacing={2} mb={3}>
        {[
          {
            label: "Total Impressions",
            value: `${(totalImpressions / 1000).toFixed(0)}K`,
            trend: 18,
            icon: <VisibilityIcon fontSize="small" />,
          },
          {
            label: "Total Reach",
            value: `${(totalReach / 1000).toFixed(0)}K`,
            trend: 14,
            icon: <VisibilityIcon fontSize="small" />,
            color: "#6366f1",
          },
          {
            label: "Total Clicks",
            value: totalClicks.toLocaleString(),
            trend: 9,
            icon: <TouchAppIcon fontSize="small" />,
            color: "#f59e0b",
          },
          {
            label: "Total Conversions",
            value: totalConversions.toLocaleString(),
            trend: 22,
            icon: <CheckCircleIcon fontSize="small" />,
            color: "#22c55e",
          },
          {
            label: "Avg Engagement",
            value: `${avgEngagement}%`,
            trend: 3,
            icon: <TrendingUpIcon fontSize="small" />,
            color: "#ec4899",
          },
          {
            label: "Avg ROI",
            value: `${avgROI}%`,
            trend: 12,
            icon: <TrendingUpIcon fontSize="small" />,
            color: "#14b8a6",
          },
        ].map((s) => (
          <Grid size={{ xs: 12, sm: 4, lg: 2 }} key={s.label}>
            <StatTile {...s} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5} mb={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <TrendChart />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Impressions />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} mb={2.5}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader title="ROI by Campaign" />
            <Box sx={{ px: 2, py: 2, height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MOCK_BRAND_CAMPAIGNS.filter(
                    (c) => c.analytics.roi > 0,
                  ).map((c) => ({
                    name: c.title.split(" ").slice(0, 2).join(" "),
                    roi: c.analytics.roi,
                  }))}
                  margin={{ top: 5, right: 8, left: -28, bottom: 0 }}
                  barSize={16}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="#f0f0f5"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "#bbb" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#bbb" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={false} />
                  <Bar
                    dataKey="roi"
                    name="ROI %"
                    fill={ColorPallete.primary.main}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader title="Conversions by Campaign" />
            <Box sx={{ px: 2, py: 2, height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MOCK_BRAND_CAMPAIGNS.filter(
                    (c) => c.analytics.conversions > 0,
                  ).map((c) => ({
                    name: c.title.split(" ").slice(0, 2).join(" "),
                    conversions: c.analytics.conversions,
                  }))}
                  margin={{ top: 5, right: 8, left: -28, bottom: 0 }}
                  barSize={16}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="#f0f0f5"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "#bbb" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#bbb" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={false} />
                  <Bar
                    dataKey="conversions"
                    name="Conversions"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardHeader
          title="Campaign Breakdown"
          subtitle="Full performance summary"
        />
        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ minWidth: 800 }}>
            {/* Table header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                px: 3,
                py: 1.5,
                background: "#f7f7fc",
                borderBottom: "1px solid #f0f0f5",
              }}
            >
              {[
                "Campaign",
                "Status",
                "Impressions",
                "Clicks",
                "Conversions",
                "Engagement",
                "ROI",
              ].map((h) => (
                <Typography
                  key={h}
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#aaa",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {h}
                </Typography>
              ))}
            </Box>
            {/* Rows */}
            {tableData.map((row, i) => (
              <Box
                key={i}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                  px: 3,
                  py: 2,
                  borderBottom:
                    i < tableData.length - 1 ? "1px solid #f7f7fc" : "none",
                  "&:hover": { background: "#fafafa" },
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#0f0f1a",
                  }}
                >
                  {row.title}
                </Typography>
                <Box>
                  <CampaignStatusChip status={row.status} />
                </Box>
                <Typography sx={{ fontSize: "0.82rem", color: "#0f0f1a" }}>
                  {row.impressions > 0
                    ? `${(row.impressions / 1000).toFixed(0)}K`
                    : "—"}
                </Typography>
                <Typography sx={{ fontSize: "0.82rem", color: "#0f0f1a" }}>
                  {row.clicks > 0 ? row.clicks.toLocaleString() : "—"}
                </Typography>
                <Typography sx={{ fontSize: "0.82rem", color: "#0f0f1a" }}>
                  {row.conversions > 0 ? row.conversions : "—"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: row.engagement > 0 ? "#22c55e" : "#aaa",
                  }}
                >
                  {row.engagement > 0 ? `${row.engagement}%` : "—"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: row.roi > 0 ? ColorPallete.primary.main : "#aaa",
                  }}
                >
                  {row.roi > 0 ? `${row.roi}%` : "—"}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </PageShell>
  );
};

export default BrandAnalyticsPage;
