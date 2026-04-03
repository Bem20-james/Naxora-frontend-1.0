import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  Chip,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CampaignIcon from "@mui/icons-material/Campaign";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  PageShell,
  Card,
  StatTile,
  CampaignStatusChip,
} from "../../../components/dashboard/SharedUI";
import { MOCK_BRAND_CAMPAIGNS } from "./data";
import type {
  BrandCampaign,
  BrandCampaignStatus,
} from "../../../components/dashboard/types";
import { ColorPallete } from "../../../config/colors";

const CampaignCard = ({ campaign }: { campaign: BrandCampaign }) => {
  const navigate = useNavigate();
  const spendPct =
    campaign.budget > 0
      ? Math.round((campaign.budgetSpent / campaign.budget) * 100)
      : 0;

  return (
    <Card
      hoverable
      onClick={() => navigate(`/dashboard/brand/campaigns/${campaign.id}`)}
    >
      <Box sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={1}
          mb={1.5}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#0f0f1a",
                lineHeight: 1.3,
                mb: 0.3,
              }}
            >
              {campaign.title}
            </Typography>
            <Stack direction="row" gap={0.7} flexWrap="wrap">
              {campaign.targetNiches.slice(0, 2).map((n) => (
                <Chip
                  key={n}
                  label={n}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    background: "#f7f7fc",
                    color: "#666",
                    border: "none",
                  }}
                />
              ))}
            </Stack>
          </Box>
          <CampaignStatusChip status={campaign.status} />
        </Stack>

        <Typography
          sx={{
            fontSize: "0.78rem",
            color: "#666",
            lineHeight: 1.6,
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {campaign.description}
        </Typography>

        {campaign.budget > 0 && (
          <Box mb={2}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography sx={{ fontSize: "0.68rem", color: "#aaa" }}>
                Budget utilised
              </Typography>
              <Typography
                sx={{ fontSize: "0.68rem", fontWeight: 700, color: "#0f0f1a" }}
              >
                ${campaign.budgetSpent.toLocaleString()} / $
                {campaign.budget.toLocaleString()}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={spendPct}
              sx={{
                height: 5,
                borderRadius: 3,
                background: "#f0f0f5",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 3,
                  background: ColorPallete.primary.main,
                },
              }}
            />
          </Box>
        )}

        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography
              sx={{
                fontSize: "0.68rem",
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Applications
            </Typography>
            <Typography
              sx={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f0f1a" }}
            >
              {campaign.applicationsCount}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "0.68rem",
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Hired
            </Typography>
            <Typography
              sx={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f0f1a" }}
            >
              {campaign.creatorsHired}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "0.68rem",
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              ROI
            </Typography>
            <Typography
              sx={{
                fontSize: "0.88rem",
                fontWeight: 800,
                color: campaign.analytics.roi > 0 ? "#22c55e" : "#aaa",
              }}
            >
              {campaign.analytics.roi > 0 ? `${campaign.analytics.roi}%` : "—"}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "0.68rem",
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Deadline
            </Typography>
            <Typography
              sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f0f1a" }}
            >
              {new Date(campaign.endDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          px: 2.5,
          pb: 2,
          pt: 1.5,
          borderTop: "1px solid #f7f7fc",
          display: "flex",
          gap: 1,
        }}
      >
        <Button
          size="small"
          variant="outlined"
          fullWidth
          disableElevation
          onClick={(e) => {
            e.stopPropagation();
          }}
          sx={{
            borderRadius: "8px",
            fontSize: "0.72rem",
            fontWeight: 600,
            textTransform: "none",
            py: 0.5,
            color: ColorPallete.primary.main,
            borderColor: `${ColorPallete.primary.main}40`,
            "&:hover": { borderColor: ColorPallete.primary.main },
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          fullWidth
          disableElevation
          onClick={(e) => {
            e.stopPropagation();
          }}
          sx={{
            borderRadius: "8px",
            fontSize: "0.72rem",
            fontWeight: 700,
            textTransform: "none",
            py: 0.5,
            background: ColorPallete.primary.main,
            "&:hover": { opacity: 0.9, background: ColorPallete.primary.main },
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

const statusFilters = [
  "All",
  "Active",
  "Draft",
  "Paused",
  "Completed",
] as const;
type FilterType = (typeof statusFilters)[number];

const statusMap: Record<FilterType, BrandCampaignStatus | "all"> = {
  All: "all",
  Active: "active",
  Draft: "draft",
  Paused: "paused",
  Completed: "completed",
};

const BrandCampaignsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered =
    filter === "All"
      ? MOCK_BRAND_CAMPAIGNS
      : MOCK_BRAND_CAMPAIGNS.filter((c) => c.status === statusMap[filter]);

  const totalBudget = MOCK_BRAND_CAMPAIGNS.reduce((s, c) => s + c.budget, 0);
  const totalSpent = MOCK_BRAND_CAMPAIGNS.reduce(
    (s, c) => s + c.budgetSpent,
    0,
  );
  const totalHired = MOCK_BRAND_CAMPAIGNS.reduce(
    (s, c) => s + c.creatorsHired,
    0,
  );

  return (
    <PageShell
      title="Campaigns"
      subtitle="Create and manage all your influencer campaigns."
      action={
        <Button
          variant="contained"
          disableElevation
          startIcon={<AddIcon />}
          onClick={() => navigate("/dashboard/brand/create/campaigns")}
          sx={{
            borderRadius: "10px",

            fontWeight: 700,
            fontSize: "0.82rem",
            textTransform: "none",
            py: 1,
            px: 2,
            background: ColorPallete.primary.main,
            "&:hover": { opacity: 0.9, background: ColorPallete.primary.main },
          }}
        >
          New Campaign
        </Button>
      }
    >
      <Grid container spacing={2} mb={3}>
        {[
          {
            label: "Total Campaigns",
            value: MOCK_BRAND_CAMPAIGNS.length,
            icon: <CampaignIcon fontSize="small" />,
          },
          {
            label: "Creators Hired",
            value: totalHired,
            icon: <PeopleIcon fontSize="small" />,
          },
          {
            label: "Total Budget",
            value: `$${totalBudget.toLocaleString()}`,
            icon: <AttachMoneyIcon fontSize="small" />,
          },
          {
            label: "Total Spent",
            value: `$${totalSpent.toLocaleString()}`,
            icon: <AttachMoneyIcon fontSize="small" />,
            color: "#f59e0b",
          },
        ].map((s) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={s.label}>
            <StatTile {...s} />
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" gap={1} mb={2.5} flexWrap="wrap">
        {statusFilters.map((f) => (
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

      <Grid container spacing={2}>
        {filtered.map((c) => (
          <Grid size={{ xs: 12, sm: 6, xl: 3 }} key={c.id}>
            <CampaignCard campaign={c} />
          </Grid>
        ))}
      </Grid>
    </PageShell>
  );
};

export default BrandCampaignsPage;
