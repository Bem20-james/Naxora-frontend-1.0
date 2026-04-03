import { useState } from "react";
import { Box, Typography, Grid, Stack, Chip, Avatar } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  PageShell,
  Card,
  CardHeader,
  StatTile,
  AmountBadge,
} from "../../../components/dashboard/SharedUI";
import { MOCK_TRANSACTIONS } from "./mockData";
import type { Transaction } from "../../../components/dashboard/types";
import { ColorPallete } from "../../../config/colors";

const TransactionRow = ({
  tx,
  isLast,
}: {
  tx: Transaction;
  isLast: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      px: 3,
      py: 1.8,
      borderBottom: isLast ? "none" : "1px solid #f7f7fc",
      "&:hover": { background: "#fafafa" },
      transition: "background 0.15s",
    }}
  >
    <Avatar
      sx={{
        width: 36,
        height: 36,
        flexShrink: 0,
        background: tx.type === "credit" ? "#dcfce7" : "#fee2e2",
        color: tx.type === "credit" ? "#22c55e" : "#ef4444",
      }}
    >
      {tx.type === "credit" ? (
        <ArrowDownwardIcon sx={{ fontSize: 16 }} />
      ) : (
        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
      )}
    </Avatar>

    <Box sx={{ flex: 1, minWidth: 0 }}>
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
        {tx.description}
      </Typography>
      <Typography sx={{ fontSize: "0.7rem", color: "#aaa" }}>
        {new Date(tx.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Typography>
    </Box>

    <Chip
      label={tx.status}
      size="small"
      sx={{
        height: 20,
        fontSize: "0.65rem",
        fontWeight: 600,
        border: "none",
        background:
          tx.status === "completed"
            ? "#dcfce7"
            : tx.status === "pending"
              ? "#fef3c7"
              : "#fee2e2",
        color:
          tx.status === "completed"
            ? "#166534"
            : tx.status === "pending"
              ? "#92400e"
              : "#991b1b",
      }}
    />

    <AmountBadge amount={tx.amount} type={tx.type} />
  </Box>
);

type FilterType = "All" | "Credits" | "Debits";

const TransactionsPage = () => {
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered =
    filter === "All"
      ? MOCK_TRANSACTIONS
      : filter === "Credits"
        ? MOCK_TRANSACTIONS.filter((t) => t.type === "credit")
        : MOCK_TRANSACTIONS.filter((t) => t.type === "debit");

  const totalCredits = MOCK_TRANSACTIONS.filter(
    (t) => t.type === "credit",
  ).reduce((s, t) => s + t.amount, 0);
  const totalDebits = MOCK_TRANSACTIONS.filter(
    (t) => t.type === "debit",
  ).reduce((s, t) => s + t.amount, 0);
  const balance = totalCredits - totalDebits;

  return (
    <PageShell
      title="Transactions"
      subtitle="Your complete payment history and earnings."
    >
      <Grid container spacing={2} mb={3}>
        {[
          {
            label: "Balance",
            value: `$${balance.toLocaleString()}`,
            sub: "Available",
            color: ColorPallete.primary.main,
          },
          {
            label: "Total Earned",
            value: `$${totalCredits.toLocaleString()}`,
            sub: "Credits",
            color: "#22c55e",
          },
          {
            label: "Total Spent",
            value: `$${totalDebits.toLocaleString()}`,
            sub: "Debits",
            color: "#ef4444",
          },
        ].map((s) => (
          <Grid size={{ xs: 12, sm: 4 }} key={s.label}>
            <StatTile
              label={s.label}
              value={s.value}
              sub={s.sub}
              icon={<AccountBalanceWalletIcon fontSize="small" />}
              color={s.color}
            />
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" gap={1} mb={2.5}>
        {(["All", "Credits", "Debits"] as FilterType[]).map((f) => (
          <Chip
            key={f}
            label={f}
            onClick={() => setFilter(f)}
            size="small"
            sx={{
              height: 28,
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
              borderRadius: "8px",
              background: filter === f ? ColorPallete.primary.main : "#f7f7fc",
              color: filter === f ? "#fff" : "#666",
              border: "none",
              "&:hover": {
                background:
                  filter === f ? ColorPallete.primary.main : "#ebebf5",
              },
            }}
          />
        ))}
      </Stack>

      <Card>
        <CardHeader
          title="History"
          subtitle={`${filtered.length} transactions`}
        />
        {filtered.map((tx, i) => (
          <TransactionRow
            key={tx.id}
            tx={tx}
            isLast={i === filtered.length - 1}
          />
        ))}
      </Card>
    </PageShell>
  );
};

export default TransactionsPage;
