import { Box, Chip } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader } from "../../../components/dashboard/SharedUI";
import { ColorPallete } from "../../../config/colors";
import { ChartTooltip } from "../../../components/dashboard";
import { MOCK_BRAND_CAMPAIGNS } from "../Campaigns/data";

const ImpressionsChart = () => {
  // aggregate weekly data from active campaign
  const weeklyData = MOCK_BRAND_CAMPAIGNS[0].analytics.weeklyData;

  return (
    <div>
      <Card sx={{ height: "100%" }}>
        <CardHeader
          title="Weekly Performance"
          subtitle="Impressions and conversions from active campaigns"
          action={
            <Chip
              label="Last 7 days"
              size="small"
              sx={{
                height: 22,
                fontSize: "0.68rem",
                fontWeight: 600,
                background: "#f7f7fc",
                color: "#666",
                border: "none",
              }}
            />
          }
        />
        <Box sx={{ px: 2, py: 2, height: 230 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyData}
              margin={{ top: 5, right: 8, left: -28, bottom: 0 }}
            >
              <defs>
                <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
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
                <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
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
                strokeWidth={2}
                fill="url(#impGrad)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: ColorPallete.primary.main,
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="conversions"
                name="Conversions"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#convGrad)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#22c55e",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </div>
  );
};

export default ImpressionsChart;
