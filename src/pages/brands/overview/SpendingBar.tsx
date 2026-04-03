import { Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader } from "../../../components/dashboard/SharedUI";
import { MOCK_BRAND_CAMPAIGNS } from "./mockData";
import { ColorPallete } from "../../../config/colors";
import { ChartTooltip } from "../../../components/dashboard";

const SpendingBar = () => {
  return (
    <div>
      <Card sx={{ height: "100%" }}>
        <CardHeader title="Budget Utilisation" subtitle="Spent vs allocated" />
        <Box sx={{ px: 2, py: 2, height: 230 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={MOCK_BRAND_CAMPAIGNS.map((c) => ({
                name: c.title.split(" ").slice(0, 2).join(" "),
                budget: c.budget,
                spent: c.budgetSpent,
              }))}
              margin={{ top: 5, right: 8, left: -28, bottom: 0 }}
              barSize={10}
            >
              <CartesianGrid
                vertical={false}
                stroke="#f0f0f5"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: "#bbb" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#bbb" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar
                dataKey="budget"
                name="Budget"
                fill={`${ColorPallete.primary.main}25`}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="spent"
                name="Spent"
                fill={ColorPallete.primary.main}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </div>
  );
};

export default SpendingBar;
