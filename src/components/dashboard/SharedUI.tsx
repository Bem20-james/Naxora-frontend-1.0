import React from "react";
import {
  Box,
  Typography,
  Chip,
  Avatar,
  LinearProgress,
  Stack,
} from "@mui/material";
import type { SxProps } from "@mui/material";
import type {
  CampaignStatus,
  ProjectStatus,
  ApplicationStatus,
  TransactionType,
} from "./types";
import { ColorPallete } from "../../config/colors";
import type { ColumnDef } from "./types";

export function renderAvatarCell<T>(
  nameKey: keyof T,
  subKey?: keyof T,
  colorKey?: keyof T,
): ColumnDef<T>["render"] {
  return (row) => {
    const name = String(row[nameKey] ?? "");
    const sub = subKey ? String(row[subKey] ?? "") : undefined;
    const color = colorKey
      ? String(row[colorKey] ?? ColorPallete.primary.main)
      : ColorPallete.primary.main;
    const initials = name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return (
      <Stack direction="row" alignItems="center" gap={1.2}>
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: "0.65rem",
            fontWeight: 700,
            background: `${color}22`,
            color,
            border: `1.5px solid ${color}33`,
            flexShrink: 0,
          }}
        >
          {initials}
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#0f0f1a",
              lineHeight: 1.2,
            }}
          >
            {name}
          </Typography>
          {sub && (
            <Typography sx={{ fontSize: "0.68rem", color: "#aaa" }}>
              {sub}
            </Typography>
          )}
        </Box>
      </Stack>
    );
  };
}

export function renderStatusCell<T>(
  statusKey: keyof T,
  map: Record<string, { dot: string; text: string }>,
): ColumnDef<T>["render"] {
  return (row) => {
    const status = String(row[statusKey] ?? "");
    const style = map[status] ?? { dot: "#9ca3af", text: "#6b7280" };
    return (
      <Stack direction="row" alignItems="center" gap={0.7}>
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: style.dot,
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{ fontSize: "0.78rem", fontWeight: 600, color: style.text }}
        >
          {status}
        </Typography>
      </Stack>
    );
  };
}

export function renderAmountCell<T>(
  amountKey: keyof T,
  typeKey?: keyof T,
): ColumnDef<T>["render"] {
  return (row) => {
    const amount = Number(row[amountKey] ?? 0);
    const type = typeKey ? String(row[typeKey] ?? "") : undefined;
    const color =
      type === "credit" ? "#22c55e" : type === "debit" ? "#ef4444" : "#0f0f1a";
    const prefix = type === "credit" ? "+" : type === "debit" ? "−" : "";
    return (
      <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color }}>
        {prefix}${amount.toLocaleString()}
      </Typography>
    );
  };
}

export function renderDateCell<T>(dateKey: keyof T): ColumnDef<T>["render"] {
  return (row) => {
    const raw = String(row[dateKey] ?? "");
    if (!raw)
      return (
        <Typography sx={{ fontSize: "0.78rem", color: "#aaa" }}>—</Typography>
      );
    return (
      <Typography sx={{ fontSize: "0.78rem", color: "#555" }}>
        {new Date(raw).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Typography>
    );
  };
}

interface PageShellProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}
export const PageShell = ({
  title,
  subtitle,
  action,
  children,
}: PageShellProps) => (
  <Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        mb: 3,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "1.35rem",
            fontWeight: 800,
            color: "#0f0f1a",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              fontSize: "0.82rem",
              color: "#aaa",
              mt: 0.4,
              fontWeight: 400,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box>{action}</Box>}
    </Box>
    {children}
  </Box>
);

interface CardProps {
  children: React.ReactNode;
  sx?: SxProps;
  onClick?: () => void;
  hoverable?: boolean;
}
export const Card = ({ children, sx = {}, onClick, hoverable }: CardProps) => (
  <Box
    onClick={onClick}
    sx={{
      background: "#ffffff",
      borderRadius: "14px",
      border: "1px solid #f0f0f5",
      overflow: "hidden",
      cursor: onClick || hoverable ? "pointer" : "default",
      transition: "box-shadow 0.2s, transform 0.15s",
      ...(hoverable || onClick
        ? {
            "&:hover": {
              boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
              transform: "translateY(-1px)",
            },
          }
        : {}),
      ...sx,
    }}
  >
    {children}
  </Box>
);

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}
export const CardHeader = ({ title, subtitle, action }: CardHeaderProps) => (
  <Box
    sx={{
      px: 3,
      py: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #f7f7fc",
    }}
  >
    <Box>
      <Typography
        sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f0f1a" }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ fontSize: "0.72rem", color: "#aaa", mt: 0.2 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
    {action}
  </Box>
);

interface BrandAvatarProps {
  initials: string;
  color: string;
  size?: number;
}
export const BrandAvatar = ({
  initials,
  color,
  size = 42,
}: BrandAvatarProps) => (
  <Avatar
    sx={{
      width: size,
      height: size,
      background: `${color}20`,
      color,
      fontSize: size < 36 ? "0.6rem" : "0.72rem",
      fontWeight: 700,
      border: `2px solid ${color}30`,
      flexShrink: 0,
    }}
  >
    {initials}
  </Avatar>
);

const campaignStatusMap: Record<
  CampaignStatus,
  { label: string; color: string; bg: string }
> = {
  pending: { label: "Pending", color: "#f59e0b", bg: "#fef3c7" },
  accepted: { label: "Accepted", color: "#22c55e", bg: "#dcfce7" },
  declined: { label: "Declined", color: "#ef4444", bg: "#fee2e2" },
  completed: { label: "Completed", color: "#6366f1", bg: "#ede9fe" },
  active: { label: "Active", color: "#0ea5e9", bg: "#e0f2fe" },
  draft: { label: "Active", color: "#0ea5e9", bg: "#e0f2fe" },
  in_review: { label: "Active", color: "#0ea5e9", bg: "#e0f2fe" },
  paused: { label: "Active", color: "#0ea5e9", bg: "#e0f2fe" },
};

const projectStatusMap: Record<
  ProjectStatus,
  { label: string; color: string; bg: string }
> = {
  active: { label: "Active", color: "#22c55e", bg: "#dcfce7" },
  in_review: { label: "In Review", color: "#f59e0b", bg: "#fef3c7" },
  completed: { label: "Completed", color: "#6366f1", bg: "#ede9fe" },
  paused: { label: "Paused", color: "#94a3b8", bg: "#f1f5f9" },
};

export const CampaignStatusChip = ({ status }: { status: CampaignStatus }) => {
  const s = campaignStatusMap[status];
  return (
    <Chip
      label={s.label}
      size="small"
      sx={{
        fontSize: "0.7rem",
        fontWeight: 600,
        height: 22,
        background: s.bg,
        color: s.color,
        border: "none",
      }}
    />
  );
};

export const ProjectStatusChip = ({ status }: { status: ProjectStatus }) => {
  const s = projectStatusMap[status];
  return (
    <Chip
      label={s.label}
      size="small"
      sx={{
        fontSize: "0.7rem",
        fontWeight: 600,
        height: 22,
        background: s.bg,
        color: s.color,
        border: "none",
      }}
    />
  );
};

interface StatTileProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  color?: string;
}
export const StatTile = ({
  label,
  value,
  sub,
  icon,
  color = ColorPallete.primary.main,
}: StatTileProps) => (
  <Card>
    <Box
      sx={{
        p: 2.5,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "#aaa",
            fontWeight: 500,
            mb: 0.5,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#0f0f1a",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {value}
        </Typography>
        {sub && (
          <Typography
            sx={{
              fontSize: "0.72rem",
              color: "#22c55e",
              fontWeight: 600,
              mt: 0.5,
            }}
          >
            {sub}
          </Typography>
        )}
      </Box>
      {icon && (
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            background: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </Box>
      )}
    </Box>
  </Card>
);

interface ProgressBarProps {
  value: number;
  color?: string;
  label?: string;
}
export const ProgressBar = ({
  value,
  color = ColorPallete.primary.main,
}: ProgressBarProps) => (
  <Box>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
      <Typography sx={{ fontSize: "0.7rem", color: "#aaa" }}>
        Progress
      </Typography>
      <Typography
        sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#0f0f1a" }}
      >
        {value}%
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 6,
        borderRadius: 3,
        background: "#f0f0f5",
        "& .MuiLinearProgress-bar": { borderRadius: 3, background: color },
      }}
    />
  </Box>
);

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}
export const EmptyState = ({
  icon,
  title,
  subtitle,
  action,
}: EmptyStateProps) => (
  <Box sx={{ textAlign: "center", py: 8, px: 4 }}>
    <Box sx={{ fontSize: "2.5rem", mb: 2, opacity: 0.3 }}>{icon}</Box>
    <Typography
      sx={{ fontWeight: 700, fontSize: "1rem", color: "#0f0f1a", mb: 0.5 }}
    >
      {title}
    </Typography>
    <Typography sx={{ fontSize: "0.82rem", color: "#aaa", mb: 2 }}>
      {subtitle}
    </Typography>
    {action}
  </Box>
);

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: "0.7rem",
      fontWeight: 700,
      color: "#aaa",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      mb: 1.5,
    }}
  >
    {children}
  </Typography>
);

export const AmountBadge = ({
  amount,
  type,
}: {
  amount: number;
  type?: TransactionType;
}) => (
  <Typography
    sx={{
      fontSize: "0.82rem",
      fontWeight: 700,
      color:
        type === "debit"
          ? "#ef4444"
          : type === "credit"
            ? "#22c55e"
            : ColorPallete.primary.main,
    }}
  >
    {type === "debit" ? "−" : type === "credit" ? "+" : ""}$
    {amount.toLocaleString()}
  </Typography>
);

interface EntityAvatarProps {
  initials: string;
  color: string;
  size?: number;
}
export const EntityAvatar = ({
  initials,
  color,
  size = 42,
}: EntityAvatarProps) => (
  <Avatar
    sx={{
      width: size,
      height: size,
      background: `${color}20`,
      color,
      fontSize: size < 36 ? "0.6rem" : "0.72rem",
      fontWeight: 700,
      border: `2px solid ${color}30`,
      flexShrink: 0,
    }}
  >
    {initials}
  </Avatar>
);

const appStatusMap: Record<
  ApplicationStatus,
  { label: string; color: string; bg: string }
> = {
  pending: { label: "Pending", color: "#f59e0b", bg: "#fef3c7" },
  approved: { label: "Approved", color: "#22c55e", bg: "#dcfce7" },
  rejected: { label: "Rejected", color: "#ef4444", bg: "#fee2e2" },
  shortlisted: { label: "Shortlisted", color: "#6366f1", bg: "#ede9fe" },
};
export const AppStatusChip = ({ status }: { status: ApplicationStatus }) => {
  const s = appStatusMap[status];
  return (
    <Chip
      label={s.label}
      size="small"
      sx={{
        fontSize: "0.7rem",
        fontWeight: 600,
        height: 22,
        background: s.bg,
        color: s.color,
        border: "none",
      }}
    />
  );
};

interface MetricPillProps {
  label: string;
  value: string | number;
  color?: string;
}
export const MetricPill = ({
  label,
  value,
  color = "#f7f7fc",
}: MetricPillProps) => (
  <Box
    sx={{
      background: color,
      borderRadius: "10px",
      px: 1.5,
      py: 1,
      flex: 1,
      minWidth: 80,
    }}
  >
    <Typography
      sx={{
        fontSize: "0.95rem",
        fontWeight: 800,
        color: "#0f0f1a",
        lineHeight: 1,
      }}
    >
      {value}
    </Typography>
    <Typography
      sx={{
        fontSize: "0.65rem",
        color: "#aaa",
        mt: 0.3,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </Typography>
  </Box>
);

export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      py: 1.2,
      borderBottom: "1px solid #f7f7fc",
      "&:last-child": { borderBottom: "none" },
    }}
  >
    <Typography sx={{ fontSize: "0.78rem", color: "#aaa", fontWeight: 500 }}>
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: "0.78rem",
        color: "#0f0f1a",
        fontWeight: 600,
        textAlign: "right",
        maxWidth: "60%",
      }}
    >
      {value}
    </Typography>
  </Box>
);
