import { Box, Typography, Stack, Button, Chip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import type { Campaign } from "./types";
import { Card, BrandAvatar, CampaignStatusChip } from "./SharedUI";
import { ColorPallete } from "../../config/colors";

const CampaignCard = ({
  campaign,
  onView,
}: {
  campaign: Campaign;
  onView: (c: Campaign) => void;
}) => (
  <Card hoverable onClick={() => onView(campaign)}>
    <Box sx={{ p: 2.5 }}>
      <Stack direction="row" alignItems="flex-start" gap={1.5} mb={1.5}>
        <BrandAvatar
          initials={campaign.brandLogo}
          color={campaign.brandColor}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.88rem",
                color: "#0f0f1a",
                lineHeight: 1.2,
              }}
            >
              {campaign.brand}
            </Typography>
            <CampaignStatusChip status={campaign.status} />
          </Stack>
          <Typography sx={{ fontSize: "0.72rem", color: "#aaa", mt: 0.2 }}>
            {campaign.category}
          </Typography>
        </Box>
      </Stack>

      <Typography
        sx={{
          fontSize: "0.78rem",
          color: "#666",
          lineHeight: 1.55,
          mb: 2,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {campaign.description}
      </Typography>

      <Stack direction="row" gap={2} mb={2}>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <AttachMoneyIcon sx={{ fontSize: 13, color: "#aaa" }} />
          <Typography
            sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f0f1a" }}
          >
            ${campaign.budget.toLocaleString()}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <CalendarTodayIcon sx={{ fontSize: 12, color: "#aaa" }} />
          <Typography sx={{ fontSize: "0.72rem", color: "#aaa" }}>
            Due{" "}
            {new Date(campaign.deadline).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" gap={0.7} flexWrap="wrap" mb={2}>
        {campaign.platforms.map((p) => (
          <Chip
            key={p}
            label={p}
            size="small"
            sx={{
              height: 20,
              fontSize: "0.65rem",
              fontWeight: 600,
              background: "#f7f7fc",
              color: "#555",
              border: "none",
            }}
          />
        ))}
      </Stack>

      {campaign.status === "pending" && (
        <Stack direction="row" gap={1}>
          <Button
            size="small"
            variant="contained"
            disableElevation
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={{
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "none",
              py: 0.6,
              background: ColorPallete.primary.main,
              "&:hover": {
                opacity: 0.9,
                background: ColorPallete.primary.main,
              },
            }}
          >
            Accept
          </Button>
          <Button
            size="small"
            variant="outlined"
            disableElevation
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={{
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "none",
              py: 0.6,
              color: "#aaa",
              borderColor: "#e5e5f0",
              "&:hover": { borderColor: "#ccc", background: "#f7f7fc" },
            }}
          >
            Decline
          </Button>
        </Stack>
      )}
    </Box>
  </Card>
);

export default CampaignCard;
