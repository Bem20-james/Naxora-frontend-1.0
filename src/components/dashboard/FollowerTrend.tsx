import {
  Box,
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { ColorPallete } from "../../config/colors";

const weekData = [
  { day: "Mon", followers: 4200 },
  { day: "Tue", followers: 5800 },
  { day: "Wed", followers: 5200 },
  { day: "Thu", followers: 6700 },
  { day: "Fri", followers: 9100 },
  { day: "Sat", followers: 7500 },
  { day: "Sun", followers: 8200 },
];

const monthData = [
  { day: "Week 1", followers: 18000 },
  { day: "Week 2", followers: 22000 },
  { day: "Week 3", followers: 19500 },
  { day: "Week 4", followers: 31000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: "#0f0f1a",
          borderRadius: "10px",
          px: 1.5,
          py: 1,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        <Typography sx={{ fontSize: "0.7rem", color: "#aaa", mb: 0.3 }}>
          {label}
        </Typography>
        <Typography
          sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}
        >
          {payload[0].value.toLocaleString()} followers
        </Typography>
      </Box>
    );
  }
  return null;
};

const FollowerTrends = () => {
  const [range, setRange] = useState<"week" | "month">("week");

  const data = range === "week" ? weekData : monthData;
  const total = range === "week" ? "47.7K" : "90.5K";
  const growth = range === "week" ? "+12.4%" : "+34.8%";

  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #f0f0f5",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Header */}
      <Box sx={{ px: 3, pt: 2.5, pb: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "#0f0f1a",
                letterSpacing: "-0.02em",
              }}
            >
              Follower Trends
            </Typography>
            <Stack direction="row" alignItems="center" gap={0.7} mt={0.5}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#0f0f1a",
                  lineHeight: 1,
                }}
              >
                {total}
              </Typography>
              <Stack direction="row" alignItems="center" gap={0.3}>
                <TrendingUpIcon sx={{ fontSize: 14, color: "#22c55e" }} />
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#22c55e",
                  }}
                >
                  {growth}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <ToggleButtonGroup
            value={range}
            exclusive
            onChange={(_, val) => val && setRange(val)}
            size="small"
            sx={{
              background: "#f7f7fc",
              borderRadius: "8px",
              border: "1px solid #f0f0f5",
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: "7px !important",
                fontSize: "0.72rem",
                fontWeight: 600,
                px: 1.5,
                py: 0.4,
                color: "#aaa",
                textTransform: "none",
                "&.Mui-selected": {
                  background: ColorPallete.primary.main,
                  color: "#fff",
                  "&:hover": { background: ColorPallete.primary.main },
                },
              },
            }}
          >
            <ToggleButton value="week">7D</ToggleButton>
            <ToggleButton value="month">30D</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Chart */}
      <Box sx={{ px: 1, pb: 2, height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: -30, bottom: 0 }}
          >
            <defs>
              <linearGradient id="followerGradient" x1="0" y1="0" x2="0" y2="1">
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
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#f0f0f5"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "#bbb", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#bbb" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: any) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="followers"
              stroke={ColorPallete.primary.main}
              strokeWidth={2.5}
              fill="url(#followerGradient)"
              dot={{ r: 3, fill: ColorPallete.primary.main, strokeWidth: 0 }}
              activeDot={{
                r: 5,
                fill: ColorPallete.primary.main,
                strokeWidth: 2,
                stroke: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default FollowerTrends;
