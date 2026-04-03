import { Box, Stack, Chip } from "@mui/material";
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
import { useState } from "react";
import { MOCK_BRAND_CAMPAIGNS } from "./data";

const TrendChart = () => {
  const buildAggregatedWeekly = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => {
      const totals = MOCK_BRAND_CAMPAIGNS.reduce(
        (acc, c) => {
          const d = c.analytics.weeklyData.find((w) => w.day === day);
          if (d) {
            acc.impressions += d.impressions;
            acc.clicks += d.clicks;
            acc.conversions += d.conversions;
          }
          return acc;
        },
        { day, impressions: 0, clicks: 0, conversions: 0 },
      );
      return totals;
    });
  };

  const [range, setRange] = useState<"7d" | "30d">("7d");
  const weeklyData = buildAggregatedWeekly();

  return (
    <div>
      <Card>
        <CardHeader
          title="Performance Over Time"
          subtitle="Impressions, clicks and conversions"
          action={
            <Stack direction="row" gap={0.5}>
              {(["7d", "30d"] as const).map((r) => (
                <Chip
                  key={r}
                  label={r.toUpperCase()}
                  size="small"
                  onClick={() => setRange(r)}
                  sx={{
                    height: 22,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    background:
                      range === r ? ColorPallete.primary.main : "#f7f7fc",
                    color: range === r ? "#fff" : "#666",
                    border: "none",
                  }}
                />
              ))}
            </Stack>
          }
        />
        <Box sx={{ px: 2, py: 2, height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyData}
              margin={{ top: 5, right: 8, left: -28, bottom: 0 }}
            >
              <defs>
                {[
                  { id: "impG", color: ColorPallete.primary.main },
                  { id: "clkG", color: "#f59e0b" },
                  { id: "conG", color: "#22c55e" },
                ].map(({ id, color }) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.12} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
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
              <Area
                type="monotone"
                dataKey="conversions"
                name="Conversions"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#conG)"
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 2,
                  stroke: "#fff",
                  fill: "#22c55e",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </div>
  );
};

export default TrendChart;
