import { Box } from "@mui/material";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardHeader } from "../../../components/dashboard/SharedUI";
import { ColorPallete } from "../../../config/colors";
import { MOCK_BRAND_CAMPAIGNS } from "./data";

const PIE_COLORS = [ColorPallete.primary.main, "#6366f1", "#f59e0b", "#22c55e"];

const Impressions = () => {
  const pieData = MOCK_BRAND_CAMPAIGNS.filter(
    (c) => c.analytics.impressions > 0,
  ).map((c) => ({
    name: c.title.split(" ").slice(0, 2).join(" "),
    value: c.analytics.impressions,
  }));

  return (
    <div>
      <Card sx={{ height: "100%" }}>
        <CardHeader title="Impression Share" subtitle="By campaign" />
        <Box
          sx={{
            px: 2,
            py: 2,
            height: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => `${(v / 1000).toFixed(0)}K`} />
              <Legend
                iconSize={8}
                iconType="circle"
                formatter={(v) => (
                  <span style={{ fontSize: "0.7rem", color: "#555" }}>{v}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </div>
  );
};

export default Impressions;
