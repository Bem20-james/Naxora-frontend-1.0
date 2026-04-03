import { Box, Typography } from "@mui/material";

export const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ background: "#0f0f1a", borderRadius: "10px", px: 1.5, py: 1 }}>
      <Typography sx={{ fontSize: "0.68rem", color: "#aaa", mb: 0.3 }}>
        {label}
      </Typography>
      {payload.map((p: any) => (
        <Typography
          key={p.dataKey}
          sx={{ fontSize: "0.8rem", fontWeight: 700, color: p.color || "#fff" }}
        >
          {p.name}:{" "}
          {p.value > 999 ? `${(p.value / 1000).toFixed(1)}K` : p.value}
        </Typography>
      ))}
    </Box>
  );
};
