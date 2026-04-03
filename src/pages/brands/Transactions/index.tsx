import { useState } from "react";
import { Box, Grid, Stack, Typography, Chip, Avatar } from "@mui/material";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  PageShell,
  Card,
  StatTile,
} from "../../../components/dashboard/SharedUI";
import { MOCK_TRANSACTIONS } from "./data";
import type { Transaction } from "../../../components/dashboard/types";
import { ColorPallete } from "../../../config/colors";
import TransactionDrawer from "./TransactionDrawer";
import { DataTable } from "../../../components/dashboard";
import type {
  FilterConfig,
  ColumnDef,
  RowAction,
} from "../../../components/dashboard/types";
import {
  renderAmountCell,
  renderDateCell,
  renderStatusCell,
} from "../../../components/dashboard/SharedUI";

const SPARKLINE_DATA = [
  { day: "21 Feb", net: 900 },
  { day: "22 Feb", net: 900 },
  { day: "1 Mar", net: 3900 },
  { day: "10 Mar", net: 4200 },
  { day: "15 Mar", net: 4171 },
  { day: "18 Mar", net: 3721 },
  { day: "20 Mar", net: 5721 },
  { day: "30 Mar", net: 5643 },
];

const statusColors: Record<string, { dot: string; text: string }> = {
  completed: { dot: "#22c55e", text: "#16a34a" },
  pending: { dot: "#f59e0b", text: "#b45309" },
  failed: { dot: "#ef4444", text: "#dc2626" },
};

type FilterType = "All" | "Credits" | "Debits";

const TransactionsPage = () => {
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [typeFilter, setTypeFilter] = useState<FilterType>("All");

  const totalCredits = MOCK_TRANSACTIONS.filter(
    (t) => t.type === "credit",
  ).reduce((s, t) => s + t.amount, 0);
  const totalDebits = MOCK_TRANSACTIONS.filter(
    (t) => t.type === "debit",
  ).reduce((s, t) => s + t.amount, 0);
  const balance = totalCredits - totalDebits;
  const pending = MOCK_TRANSACTIONS.filter(
    (t) => t.status === "pending",
  ).length;

  const tableRows = MOCK_TRANSACTIONS.filter((t) =>
    typeFilter === "Credits"
      ? t.type === "credit"
      : typeFilter === "Debits"
        ? t.type === "debit"
        : true,
  );

  const columns: ColumnDef<Transaction>[] = [
    {
      key: "description",
      label: "Description",
      width: "2fr",
      render: (row) => (
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              flexShrink: 0,
              background: row.type === "credit" ? "#dcfce7" : "#fee2e2",
              color: row.type === "credit" ? "#22c55e" : "#ef4444",
            }}
          >
            {row.type === "credit" ? (
              <ArrowDownwardIcon sx={{ fontSize: 14 }} />
            ) : (
              <ArrowUpwardIcon sx={{ fontSize: 14 }} />
            )}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#0f0f1a",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {row.description}
            </Typography>
            {row.brand && (
              <Typography sx={{ fontSize: "0.68rem", color: "#aaa" }}>
                {row.brand}
              </Typography>
            )}
          </Box>
        </Stack>
      ),
    },
    {
      key: "date",
      label: "Date",
      width: "130px",
      render: renderDateCell<Transaction>("date"),
    },
    {
      key: "status",
      label: "Status",
      width: "110px",
      render: renderStatusCell<Transaction>("status", statusColors),
    },
    {
      key: "type",
      label: "Type",
      width: "80px",
      render: (row) => (
        <Chip
          label={row.type === "credit" ? "Credit" : "Debit"}
          size="small"
          sx={{
            height: 20,
            fontSize: "0.65rem",
            fontWeight: 700,
            border: "none",
            background: row.type === "credit" ? "#dcfce7" : "#fee2e2",
            color: row.type === "credit" ? "#166534" : "#991b1b",
          }}
        />
      ),
    },
    {
      key: "amount",
      label: "Amount",
      width: "100px",
      align: "right",
      render: renderAmountCell<Transaction>("amount", "type"),
    },
  ];

  const actions: RowAction<Transaction>[] = [
    {
      label: "View Details",
      icon: <VisibilityOutlinedIcon sx={{ fontSize: 17 }} />,
      onClick: (row) => setSelected(row),
      color: "#bbb",
      hoverColor: ColorPallete.primary.main,
    },
  ];

  const tableFilters: FilterConfig[] = [
    {
      rowKey: "status",
      allLabel: "All Status",
      options: ["completed", "pending", "failed"],
    },
  ];

  return (
    <PageShell
      title="Transactions"
      subtitle="Your complete earnings history and payment activity."
    >
      {/* KPI tiles */}
      <Grid container spacing={2} mb={3}>
        {[
          {
            label: "Net Balance",
            value: `$${balance.toLocaleString()}`,
            sub: "Available",
            icon: <AccountBalanceWalletIcon fontSize="small" />,
            color: ColorPallete.primary.main,
          },
          {
            label: "Total Earned",
            value: `$${totalCredits.toLocaleString()}`,
            sub: "All credits",
            icon: <TrendingUpIcon fontSize="small" />,
            color: "#22c55e",
          },
          {
            label: "Total Paid",
            value: `$${totalDebits.toLocaleString()}`,
            sub: "All debits",
            icon: <TrendingDownIcon fontSize="small" />,
            color: "#ef4444",
          },
          {
            label: "Pending",
            value: pending,
            sub: `${pending} awaiting`,
            icon: <ReceiptLongIcon fontSize="small" />,
            color: "#f59e0b",
          },
        ].map((s) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={s.label}>
            <StatTile {...s} />
          </Grid>
        ))}
      </Grid>

      {/* Balance sparkline */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "#aaa",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  mb: 0.3,
                }}
              >
                Balance Over Time
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  color: "#0f0f1a",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                ${balance.toLocaleString()}
              </Typography>
              <Stack direction="row" alignItems="center" gap={0.5} mt={0.5}>
                <TrendingUpIcon sx={{ fontSize: 14, color: "#22c55e" }} />
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#22c55e",
                  }}
                >
                  +34% this month
                </Typography>
              </Stack>
            </Box>
            <Chip
              label="Last 30 days"
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
          </Stack>
        </Box>
        <Box sx={{ height: 100, px: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={SPARKLINE_DATA}
              margin={{ top: 5, right: 8, left: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
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
              <XAxis dataKey="day" hide />
              <Tooltip
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Balance"]}
                contentStyle={{
                  background: "#0f0f1a",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "0.75rem",
                }}
                labelStyle={{ color: "#aaa", fontSize: "0.68rem" }}
                itemStyle={{ color: "#fff" }}
                cursor={false}
              />
              <Area
                type="monotone"
                dataKey="net"
                stroke={ColorPallete.primary.main}
                strokeWidth={2.5}
                fill="url(#balGrad)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: ColorPallete.primary.main,
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      <Stack direction="row" gap={1} mb={2.5}>
        {(["All", "Credits", "Debits"] as FilterType[]).map((f) => (
          <Chip
            key={f}
            label={f}
            onClick={() => setTypeFilter(f)}
            size="small"
            sx={{
              height: 28,
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
              borderRadius: "8px",
              border: "none",
              background:
                typeFilter === f ? ColorPallete.primary.main : "#f7f7fc",
              color: typeFilter === f ? "#fff" : "#666",
              "&:hover": {
                background:
                  typeFilter === f ? ColorPallete.primary.main : "#ebebf5",
              },
            }}
          />
        ))}
      </Stack>

      <DataTable<Transaction>
        title="Transaction History"
        subtitle={`${tableRows.length} transactions`}
        columns={columns}
        rows={tableRows}
        actions={actions}
        filters={tableFilters}
        searchable
        pageSize={8}
        onRowClick={(row) => setSelected(row)}
        emptyMessage="No transactions match your filters."
      />

      <TransactionDrawer tx={selected} onClose={() => setSelected(null)} />
    </PageShell>
  );
};

export default TransactionsPage;
