import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Button,
  Drawer,
  Chip,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import type { Campaign } from "./types";
import { BrandAvatar, CampaignStatusChip, SectionLabel } from "./SharedUI";
import { ColorPallete } from "../../config/colors";

const CampaignDrawer = ({
  campaign,
  onClose,
}: {
  campaign: Campaign | null;
  onClose: () => void;
}) => {
  const [tab, setTab] = useState(0);

  if (!campaign) return null;

  return (
    <Drawer
      anchor="right"
      open={!!campaign}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 460 },
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
            borderBottom: "1px solid #f0f0f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" alignItems="center" gap={1.5}>
            <BrandAvatar
              initials={campaign.brandLogo}
              color={campaign.brandColor}
              size={38}
            />
            <Box>
              <Typography
                sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f0f1a" }}
              >
                {campaign.brand}
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "#aaa" }}>
                {campaign.category}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <CampaignStatusChip status={campaign.status} />
            <IconButton
              size="small"
              onClick={onClose}
              sx={{ color: "#aaa", borderRadius: "8px" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            px: 3,
            borderBottom: "1px solid #f0f0f5",
            minHeight: 44,
            "& .MuiTab-root": {
              fontSize: "0.78rem",
              fontWeight: 600,
              textTransform: "none",
              minHeight: 44,
              color: "#aaa",
            },
            "& .Mui-selected": { color: ColorPallete.primary.main },
            "& .MuiTabs-indicator": {
              background: ColorPallete.primary.main,
              height: 2,
            },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Requirements" />
          <Tab label="Apply" />
        </Tabs>

        <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 2.5 }}>
          {tab === 0 && (
            <Box>
              <Grid container spacing={1.5} mb={3}>
                {[
                  {
                    label: "Budget",
                    value: `$${campaign.budget.toLocaleString()}`,
                  },
                  {
                    label: "Deadline",
                    value: new Date(campaign.deadline).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" },
                    ),
                  },
                ].map((item) => (
                  <Grid size={{ xs: 6 }} key={item.label}>
                    <Box
                      sx={{
                        background: "#f7f7fc",
                        borderRadius: "10px",
                        p: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.65rem",
                          color: "#aaa",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: 800,
                          color: "#0f0f1a",
                          mt: 0.3,
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <SectionLabel>About the Campaign</SectionLabel>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  color: "#555",
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                {campaign.description}
              </Typography>

              <SectionLabel>Deliverables</SectionLabel>
              <Stack gap={0.7} mb={3}>
                {campaign.deliverables.map((d) => (
                  <Stack key={d} direction="row" alignItems="center" gap={1}>
                    <CheckCircleOutlineIcon
                      sx={{ fontSize: 14, color: ColorPallete.primary.main }}
                    />
                    <Typography sx={{ fontSize: "0.8rem", color: "#555" }}>
                      {d}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <SectionLabel>Platforms</SectionLabel>
              <Stack direction="row" gap={0.7} flexWrap="wrap">
                {campaign.platforms.map((p) => (
                  <Chip
                    key={p}
                    label={p}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      background: `${campaign.brandColor}15`,
                      color: campaign.brandColor,
                      border: "none",
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {tab === 1 && (
            <Box>
              <SectionLabel>Requirements</SectionLabel>
              <Stack gap={1} mb={3}>
                {campaign.requirements.map((r) => (
                  <Stack
                    key={r}
                    direction="row"
                    alignItems="flex-start"
                    gap={1}
                  >
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: ColorPallete.primary.main,
                        mt: 0.7,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        color: "#555",
                        lineHeight: 1.5,
                      }}
                    >
                      {r}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}

          {tab === 2 && (
            <Box>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  color: "#555",
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                By accepting this campaign you agree to deliver all listed
                content by the deadline. Once accepted, you'll receive a brief
                with further details.
              </Typography>
              <Stack gap={1.5}>
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  disabled={campaign.status !== "pending"}
                  sx={{
                    borderRadius: "10px",
                    py: 1.2,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textTransform: "none",
                    background: ColorPallete.primary.main,
                    "&:hover": {
                      opacity: 0.9,
                      background: ColorPallete.primary.main,
                    },
                  }}
                >
                  Accept Campaign
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  disableElevation
                  disabled={campaign.status !== "pending"}
                  sx={{
                    borderRadius: "10px",
                    py: 1.2,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textTransform: "none",
                    color: "#aaa",
                    borderColor: "#e5e5f0",
                    "&:hover": { borderColor: "#ccc" },
                  }}
                >
                  Decline
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default CampaignDrawer;
