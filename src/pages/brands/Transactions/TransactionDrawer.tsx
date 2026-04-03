import {
  Box,
  Stack,
  Typography,
  Avatar,
  Drawer,
  IconButton,
  Button,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CloseIcon from "@mui/icons-material/Close";
import type { Transaction } from "../../../components/dashboard/types";
import { ColorPallete } from "../../../config/colors";

const statusColors: Record<string, { dot: string; text: string }> = {
  completed: { dot: "#22c55e", text: "#16a34a" },
  pending: { dot: "#f59e0b", text: "#b45309" },
  failed: { dot: "#ef4444", text: "#dc2626" },
};

const TransactionDrawer = ({
  tx,
  onClose,
}: {
  tx: Transaction | null;
  onClose: () => void;
}) => {
  if (!tx) return null;
  const isCredit = tx.type === "credit";
  const statusStyle = statusColors[tx.status] ?? statusColors.completed;

  return (
    <Drawer
      anchor="right"
      open={!!tx}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 420 },
          background: "#ffffff",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f5",
          }}
        >
          <Typography
            sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f0f1a" }}
          >
            Transaction Details
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "#aaa",
              borderRadius: "8px",
              "&:hover": { background: "#f7f7fc" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 3 }}>
          {/* Amount hero */}
          <Box
            sx={{
              background: isCredit ? "#f0fdf4" : "#fff5f5",
              border: `1px solid ${isCredit ? "#bbf7d0" : "#fecaca"}`,
              borderRadius: "14px",
              p: 3,
              textAlign: "center",
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 52,
                height: 52,
                mx: "auto",
                mb: 1.5,
                background: isCredit ? "#dcfce7" : "#fee2e2",
                color: isCredit ? "#22c55e" : "#ef4444",
              }}
            >
              {isCredit ? (
                <ArrowDownwardIcon sx={{ fontSize: 22 }} />
              ) : (
                <ArrowUpwardIcon sx={{ fontSize: 22 }} />
              )}
            </Avatar>
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: isCredit ? "#16a34a" : "#dc2626",
                lineHeight: 1,
              }}
            >
              {isCredit ? "+" : "−"}${tx.amount.toLocaleString()}
            </Typography>
            <Typography sx={{ fontSize: "0.78rem", color: "#888", mt: 0.5 }}>
              {isCredit ? "Amount Received" : "Amount Paid"}
            </Typography>
          </Box>

          {/* Info rows */}
          {[
            { label: "Transaction ID", value: `TXN-${tx.id.toUpperCase()}` },
            { label: "Description", value: tx.description },
            { label: "Type", value: isCredit ? "Credit" : "Debit" },
            {
              label: "Date",
              value: new Date(tx.date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            },
            ...(tx.brand ? [{ label: "Brand", value: tx.brand }] : []),
          ].map(({ label, value }) => (
            <Box
              key={label}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                py: 1.5,
                borderBottom: "1px solid #f7f7fc",
              }}
            >
              <Typography
                sx={{ fontSize: "0.78rem", color: "#aaa", fontWeight: 500 }}
              >
                {label}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  color: "#0f0f1a",
                  fontWeight: 600,
                  textAlign: "right",
                  maxWidth: "60%",
                }}
              >
                {value}
              </Typography>
            </Box>
          ))}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.5,
            }}
          >
            <Typography
              sx={{ fontSize: "0.78rem", color: "#aaa", fontWeight: 500 }}
            >
              Status
            </Typography>
            <Stack direction="row" alignItems="center" gap={0.7}>
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: statusStyle.dot,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: statusStyle.text,
                  textTransform: "capitalize",
                }}
              >
                {tx.status}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ px: 3, py: 2.5, borderTop: "1px solid #f0f0f5" }}>
          <Button
            fullWidth
            variant="outlined"
            disableElevation
            sx={{
              borderRadius: "10px",
              fontWeight: 600,
              textTransform: "none",
              color: ColorPallete.primary.main,
              borderColor: `${ColorPallete.primary.main}50`,
              "&:hover": { borderColor: ColorPallete.primary.main },
            }}
          >
            Download Receipt
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default TransactionDrawer;
