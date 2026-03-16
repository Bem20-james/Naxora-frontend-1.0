import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import type { SvgIconComponent } from "@mui/icons-material";
import { COLOR_MAP } from "./data";

export type StatCardColor =
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "red"
  | "teal"
  | "gold";

export type TrendDirection = "up" | "down" | "neutral";

export interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  trendDirection?: TrendDirection;
  trendLabel?: string;
  subValue?: string;
  icon: SvgIconComponent;
  color?: StatCardColor;
  loading?: boolean;
  onClick?: () => void;
}

const resolveTrendDirection = (
  trend: number,
  override?: TrendDirection,
): TrendDirection => {
  if (override) return override;
  if (trend > 0) return "up";
  if (trend < 0) return "down";
  return "neutral";
};

const TREND_STYLE: Record<TrendDirection, { color: string }> = {
  up: { color: "#16A34A" },
  down: { color: "#DC2626" },
  neutral: { color: "#6B7280" },
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  trendDirection,
  trendLabel = "vs last week",
  subValue,
  icon: Icon,
  color = "blue",
  loading = false,
  onClick,
}) => {
  const tokens = COLOR_MAP[color];
  const direction = resolveTrendDirection(trend, trendDirection);
  const trendStyle = TREND_STYLE[direction];
  const isClickable = Boolean(onClick);

  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid #F1F5F9",
          p: 3,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Skeleton
            variant="rounded"
            width={40}
            height={40}
            sx={{ borderRadius: "10px" }}
          />
          <Skeleton variant="text" width={100} height={18} />
        </Box>
        <Skeleton variant="text" width={120} height={40} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width={80} height={16} />
      </Box>
    );
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        bgcolor: "#FFFFFF",
        borderRadius: "10px",
        border: "1px solid #F1F5F9",
        p: { xs: "20px", sm: "24px" },
        boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        overflow: "hidden",
        cursor: isClickable ? "pointer" : "default",
        transition: "all 0.22s ease",
        "&:hover": isClickable
          ? {
              transform: "translateY(-3px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              borderColor: tokens.border,
            }
          : {
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: -8,
          right: -8,
          pointerEvents: "none",
          opacity: 0.055,
          color: tokens.ghost,
        }}
      >
        <Icon sx={{ fontSize: 90 }} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            bgcolor: tokens.bg,
            border: `1px solid ${tokens.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon sx={{ color: tokens.icon, fontSize: 20 }} />
        </Box>

        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 500,
            color: "#6B7280",
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: { xs: "26px", sm: "30px" },
            fontWeight: 800,
            color: "#111827",
            letterSpacing: "-0.8px",
            lineHeight: 1.1,
            mb: subValue ? "4px" : 0,
          }}
        >
          {value}
        </Typography>

        {subValue && (
          <Typography
            sx={{ fontSize: "12.5px", color: "#9CA3AF", fontWeight: 400 }}
          >
            {subValue}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
        {direction === "up" && (
          <TrendingUpIcon sx={{ fontSize: 15, color: trendStyle.color }} />
        )}
        {direction === "down" && (
          <TrendingDownIcon sx={{ fontSize: 15, color: trendStyle.color }} />
        )}

        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: trendStyle.color,
          }}
        >
          {direction === "down" ? "" : "+"}
          {trend}%
        </Typography>

        <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>
          {trendLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatCard;
