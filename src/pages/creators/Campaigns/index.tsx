import { useState } from "react";
import { Grid, Stack, Chip } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import { MOCK_CAMPAIGNS } from "./mockData";
import type { Campaign } from "../../../components/dashboard/types";
import { PageShell, StatTile } from "../../../components/dashboard/SharedUI";
import { ColorPallete } from "../../../config/colors";
import { CampaignCard, CampaignDrawer } from "../../../components/dashboard";

const statusFilters = [
  "All",
  "Pending",
  "Accepted",
  "Declined",
  "Completed",
] as const;
type FilterType = (typeof statusFilters)[number];

const CampaignsPage = () => {
  const [filter, setFilter] = useState<FilterType>("All");
  const [selected, setSelected] = useState<Campaign | null>(null);

  const filtered =
    filter === "All"
      ? MOCK_CAMPAIGNS
      : MOCK_CAMPAIGNS.filter(
          (c: { status: string }) => c.status === filter.toLowerCase(),
        );

  const pending = MOCK_CAMPAIGNS.filter(
    (c: { status: string }) => c.status === "pending",
  ).length;
  const totalValue = MOCK_CAMPAIGNS.filter(
    (c: { status: string }) => c.status !== "declined",
  ).reduce((sum: any, c: { budget: any }) => sum + c.budget, 0);

  return (
    <PageShell
      title="Campaigns"
      subtitle="Review and manage your brand collaboration invites."
    >
      {/* Stats */}
      <Grid container spacing={2} mb={3}>
        {[
          {
            label: "Total Invites",
            value: MOCK_CAMPAIGNS.length,
            sub: "All time",
          },
          {
            label: "Pending Review",
            value: pending,
            sub: `${pending} awaiting action`,
          },
          {
            label: "Total Value",
            value: `$${totalValue.toLocaleString()}`,
            sub: "Excluding declined",
          },
        ].map((s) => (
          <Grid size={{ xs: 12, md: 4 }} key={s.label}>
            <StatTile
              label={s.label}
              value={s.value}
              sub={s.sub}
              icon={<CampaignIcon fontSize="small" />}
            />
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
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
        {filtered.map((c: any) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={c.id}>
            <CampaignCard campaign={c} onView={setSelected} />
          </Grid>
        ))}
      </Grid>

      {/* Detail Drawer */}
      <CampaignDrawer campaign={selected} onClose={() => setSelected(null)} />
    </PageShell>
  );
};

export default CampaignsPage;
