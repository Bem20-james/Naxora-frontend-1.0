import { Box, Typography, Grid, Stack, Button, Chip } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {
  PageShell,
  Card,
  CardHeader,
  SectionLabel,
} from "../../../components/dashboard/SharedUI";
import { MOCK_PLANS, MOCK_PAYMENT_METHODS } from "./mockData";
import type { PaymentMethod } from "../../../components/dashboard/types";
import { ColorPallete } from "../../../config/colors";
import { PlanCard } from "../../../components/dashboard";

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

const SubscriptionPage = () => {
  const current = MOCK_PLANS.find((p) => p.isCurrent)!;

  return (
    <PageShell
      title="Subscription & Billing"
      subtitle="Manage your plan, payment methods and billing history."
    >
      <Box
        sx={{
          background: `linear-gradient(135deg, ${ColorPallete.primary.main}12, ${ColorPallete.secondary?.main || "#6366f1"}12)`,
          border: `1px solid ${ColorPallete.primary.main}25`,
          borderRadius: "14px",
          p: 2.5,
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "0.72rem",
              color: "#aaa",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              mb: 0.3,
            }}
          >
            Active Plan
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography
              sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f0f1a" }}
            >
              {current.name} Plan
            </Typography>
            <Chip
              label="ACTIVE"
              size="small"
              sx={{
                height: 18,
                fontSize: "0.6rem",
                fontWeight: 700,
                background: "#dcfce7",
                color: "#166534",
                border: "none",
              }}
            />
          </Stack>
          <Typography sx={{ fontSize: "0.78rem", color: "#666", mt: 0.3 }}>
            ${current.price}/month · Renews April 15, 2026
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "0.8rem",
            color: ColorPallete.primary.main,
            borderColor: `${ColorPallete.primary.main}50`,
            "&:hover": { borderColor: ColorPallete.primary.main },
          }}
        >
          Manage
        </Button>
      </Box>

      <SectionLabel>Plans</SectionLabel>
      <Grid container spacing={2} mb={4}>
        {MOCK_PLANS.map((plan) => (
          <Grid size={{ xs: 12, sm: 4 }} key={plan.id}>
            <PlanCard plan={plan} />
          </Grid>
        ))}
      </Grid>

      <SectionLabel>Payment Methods</SectionLabel>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="Saved Methods"
          action={
            <Button
              size="small"
              variant="text"
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: ColorPallete.primary.main,
                textTransform: "none",
              }}
            >
              + Add New
            </Button>
          }
        />
        {MOCK_PAYMENT_METHODS.map((pm, i) => (
          <PaymentMethodRow
            key={pm.id}
            pm={pm}
            isLast={i === MOCK_PAYMENT_METHODS.length - 1}
          />
        ))}
      </Card>
    </PageShell>
  );
};

export default SubscriptionPage;
