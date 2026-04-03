import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  MetricPill,
} from "../../../components/dashboard/SharedUI";
import { ColorPallete } from "../../../config/colors";
import { MOCK_BRAND_CAMPAIGNS } from "./data";

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ background: "#0f0f1a", borderRadius: "10px", px: 1.5, py: 1 }}>
      <Typography sx={{ fontSize: "0.68rem", color: "#aaa", mb: 0.3 }}>
        {label}
      </Typography>
      {payload.map((p: any) => (
        <Typography
          key={p.dataKey}
          sx={{ fontSize: "0.8rem", fontWeight: 700, color: p.color }}
        >
          {p.name}:{" "}
          {p.value > 999 ? `${(p.value / 1000).toFixed(1)}K` : p.value}
        </Typography>
      ))}
    </Box>
  );
};
const AnalyticsTab = ({ id }: { id: any }) => {
  const campaign =
    MOCK_BRAND_CAMPAIGNS.find((c) => c.id === id) ?? MOCK_BRAND_CAMPAIGNS[0];

  const { analytics } = campaign;

  return (
    <div>
      <Box>
        <Stack direction="row" gap={1.5} mb={3} flexWrap="wrap">
          {[
            {
              label: "Impressions",
              value:
                analytics.impressions > 0
                  ? `${(analytics.impressions / 1000).toFixed(0)}K`
                  : "—",
            },
            {
              label: "Reach",
              value:
                analytics.reach > 0
                  ? `${(analytics.reach / 1000).toFixed(0)}K`
                  : "—",
            },
            {
              label: "Clicks",
              value:
                analytics.clicks > 0 ? analytics.clicks.toLocaleString() : "—",
            },
            {
              label: "Conversions",
              value: analytics.conversions > 0 ? analytics.conversions : "—",
            },
            {
              label: "Eng. Rate",
              value:
                analytics.engagementRate > 0
                  ? `${analytics.engagementRate}%`
                  : "—",
            },
            {
              label: "ROI",
              value: analytics.roi > 0 ? `${analytics.roi}%` : "—",
            },
          ].map((m) => (
            <MetricPill key={m.label} label={m.label} value={m.value} />
          ))}
        </Stack>

        {analytics.weeklyData.length === 0 ? (
          <Card>
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography sx={{ fontSize: "0.9rem", color: "#aaa" }}>
                No analytics data yet — campaign hasn't started.
              </Typography>
            </Box>
          </Card>
        ) : (
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card>
                <CardHeader
                  title="Impressions & Clicks"
                  subtitle="Daily breakdown"
                />
                <Box sx={{ px: 2, py: 2, height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={analytics.weeklyData}
                      margin={{ top: 5, right: 8, left: -28, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="impG" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor={ColorPallete.primary.main}
                            stopOpacity={0.15}
                          />
                          <stop
                            offset="95%"
                            stopColor={ColorPallete.primary.main}
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient id="clkG" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="#f59e0b"
                            stopOpacity={0.15}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f59e0b"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        vertical={false}
                        stroke="#f0f0f5"
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        dataKey="day"
                        tick={{ fontSize: 11, fill: "#bbb" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: "#bbb" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) =>
                          v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
                        }
                      />
                      <Tooltip content={<ChartTooltip />} cursor={false} />
                      <Area
                        type="monotone"
                        dataKey="impressions"
                        name="Impressions"
                        stroke={ColorPallete.primary.main}
                        strokeWidth={2.5}
                        fill="url(#impG)"
                        dot={false}
                        activeDot={{
                          r: 4,
                          strokeWidth: 2,
                          stroke: "#fff",
                          fill: ColorPallete.primary.main,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="clicks"
                        name="Clicks"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        fill="url(#clkG)"
                        dot={false}
                        activeDot={{
                          r: 4,
                          strokeWidth: 2,
                          stroke: "#fff",
                          fill: "#f59e0b",
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Conversions" subtitle="Daily" />
                <Box sx={{ px: 2, py: 2, height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analytics.weeklyData}
                      margin={{ top: 5, right: 8, left: -28, bottom: 0 }}
                      barSize={14}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="#f0f0f5"
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        dataKey="day"
                        tick={{ fontSize: 11, fill: "#bbb" }}
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
        )}
      </Box>
    </div>
  );
};

export default AnalyticsTab;
