import { Box, Stack, Typography, Button, Chip } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import type { PaymentMethod } from "./types";
import { ColorPallete } from "../../config/colors";

const PaymentMethodRow = ({
  pm,
  isLast,
}: {
  pm: PaymentMethod;
  isLast: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      px: 3,
      py: 2,
      borderBottom: isLast ? "none" : "1px solid #f7f7fc",
    }}
  >
    <Box
      sx={{
        width: 38,
        height: 38,
        borderRadius: "10px",
        background: "#f7f7fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#666",
        flexShrink: 0,
      }}
    >
      {pm.type === "card" ? (
        <CreditCardIcon fontSize="small" />
      ) : (
        <AccountBalanceIcon fontSize="small" />
      )}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography
          sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f0f1a" }}
        >
          {pm.label} •••• {pm.last4}
        </Typography>
        {pm.isDefault && (
          <Chip
            label="Default"
            size="small"
            sx={{
              height: 18,
              fontSize: "0.62rem",
              fontWeight: 700,
              background: `${ColorPallete.primary.main}15`,
              color: ColorPallete.primary.main,
              border: "none",
            }}
          />
        )}
      </Stack>
      {pm.expiry && (
        <Typography sx={{ fontSize: "0.7rem", color: "#aaa" }}>
          Expires {pm.expiry}
        </Typography>
      )}
    </Box>
    <Button
      size="small"
      variant="text"
      sx={{
        fontSize: "0.72rem",
        color: "#aaa",
        textTransform: "none",
        "&:hover": { color: "#ef4444" },
      }}
    >
      Remove
    </Button>
  </Box>
);

export default PaymentMethodRow;
