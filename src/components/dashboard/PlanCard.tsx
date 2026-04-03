import { Box, Typography, Stack, Button, Divider } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import { Card } from "./SharedUI";
import type { Plan } from "./types";
import { ColorPallete } from "../../config/colors";

const PlanCard = ({ plan }: { plan: Plan }) => (
  <Card
    sx={{
      border: plan.isCurrent
        ? `2px solid ${ColorPallete.primary.main}`
        : "1px solid #f0f0f5",
      position: "relative",
    }}
  >
    {plan.isCurrent && (
      <Box
        sx={{
          position: "absolute",
          top: -1,
          right: 16,
          background: ColorPallete.primary.main,
          color: "#fff",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          px: 1.2,
          py: 0.3,
          borderRadius: "0 0 6px 6px",
        }}
      >
        CURRENT
      </Box>
    )}

    <Box sx={{ p: 2.5 }}>
      <Stack direction="row" alignItems="center" gap={1} mb={1}>
        {plan.id === "business" && (
          <StarIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
        )}
        <Typography
          sx={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f0f1a" }}
        >
          {plan.name}
        </Typography>
      </Stack>

      <Box sx={{ mb: 2 }}>
        <Typography
          component="span"
          sx={{
            fontSize: "1.7rem",
            fontWeight: 900,
            color: "#0f0f1a",
            letterSpacing: "-0.04em",
          }}
        >
          ${plan.price}
        </Typography>
        <Typography
          component="span"
          sx={{ fontSize: "0.75rem", color: "#aaa", ml: 0.5 }}
        >
          /mo
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#f0f0f5", mb: 2 }} />

      <Stack gap={1} mb={2.5}>
        {plan.features.map((f) => (
          <Stack key={f} direction="row" alignItems="flex-start" gap={1}>
            <CheckIcon
              sx={{
                fontSize: 13,
                color: ColorPallete.primary.main,
                mt: 0.15,
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{ fontSize: "0.78rem", color: "#555", lineHeight: 1.4 }}
            >
              {f}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Button
        fullWidth
        variant={plan.isCurrent ? "outlined" : "contained"}
        disableElevation
        size="small"
        sx={{
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "0.8rem",
          py: 0.8,
          ...(plan.isCurrent
            ? {
                color: ColorPallete.primary.main,
                borderColor: `${ColorPallete.primary.main}50`,
                "&:hover": { borderColor: ColorPallete.primary.main },
              }
            : {
                background: ColorPallete.primary.main,
                color: "#fff",
                "&:hover": {
                  opacity: 0.9,
                  background: ColorPallete.primary.main,
                },
              }),
        }}
      >
        {plan.isCurrent
          ? "Current Plan"
          : plan.price > 29
            ? "Upgrade"
            : "Downgrade"}
      </Button>
    </Box>
  </Card>
);

export default PlanCard;
