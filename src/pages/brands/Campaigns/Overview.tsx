import { Box, Grid, Stack, Typography, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Card,
  CardHeader,
  SectionLabel,
  ProgressBar,
} from "../../../components/dashboard/SharedUI";
import { MOCK_BRAND_CAMPAIGNS } from "./data";
import { ColorPallete } from "../../../config/colors";

const Overview = ({ id }: { id: any }) => {
  const campaign =
    MOCK_BRAND_CAMPAIGNS.find((c) => c.id === id) ?? MOCK_BRAND_CAMPAIGNS[0];

  const { analytics } = campaign;

  return (
    <div>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack gap={2.5}>
            <Grid container spacing={2}>
              {[
                {
                  label: "Impressions",
                  value:
                    analytics.impressions > 0
                      ? `${(analytics.impressions / 1000).toFixed(0)}K`
                      : "—",
                },
                {
                  label: "Reach",
                  value:
                    analytics.reach > 0
                      ? `${(analytics.reach / 1000).toFixed(0)}K`
                      : "—",
                },
                { label: "Conversions", value: analytics.conversions || "—" },
                {
                  label: "ROI",
                  value: analytics.roi > 0 ? `${analytics.roi}%` : "—",
                },
              ].map((m) => (
                <Grid size={{ xs: 6, sm: 3 }} key={m.label}>
                  <Box
                    sx={{
                      background: "#f7f7fc",
                      borderRadius: "12px",
                      p: 1.8,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.65rem",
                        color: "#aaa",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        mb: 0.5,
                      }}
                    >
                      {m.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 800,
                        color: "#0f0f1a",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {m.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Card>
              <CardHeader title="Budget" />
              <Box sx={{ px: 3, py: 2 }}>
                <ProgressBar
                  value={
                    campaign.budget > 0
                      ? Math.round(
                          (campaign.budgetSpent / campaign.budget) * 100,
                        )
                      : 0
                  }
                  label="Spent"
                  color={ColorPallete.primary.main}
                />
                <Stack direction="row" justifyContent="space-between" mt={1.5}>
                  <Typography sx={{ fontSize: "0.78rem", color: "#aaa" }}>
                    Allocated:{" "}
                    <strong style={{ color: "#0f0f1a" }}>
                      ${campaign.budget.toLocaleString()}
                    </strong>
                  </Typography>
                  <Typography sx={{ fontSize: "0.78rem", color: "#aaa" }}>
                    Spent:{" "}
                    <strong style={{ color: "#0f0f1a" }}>
                      ${campaign.budgetSpent.toLocaleString()}
                    </strong>
                  </Typography>
                  <Typography sx={{ fontSize: "0.78rem", color: "#aaa" }}>
                    Remaining:{" "}
                    <strong style={{ color: "#22c55e" }}>
                      $
                      {(
                        campaign.budget - campaign.budgetSpent
                      ).toLocaleString()}
                    </strong>
                  </Typography>
                </Stack>
              </Box>
            </Card>

            <Card>
              <CardHeader title="Platforms & Niches" />
              <Box sx={{ px: 3, py: 2 }}>
                <SectionLabel>Platforms</SectionLabel>
                <Stack direction="row" gap={0.7} mb={2.5} flexWrap="wrap">
                  {campaign.platforms.map((p) => (
                    <Chip
                      key={p}
                      label={p}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: `${ColorPallete.primary.main}12`,
                        color: ColorPallete.primary.main,
                        border: "none",
                      }}
                    />
                  ))}
                </Stack>
                <SectionLabel>Target Niches</SectionLabel>
                <Stack direction="row" gap={0.7} flexWrap="wrap">
                  {campaign.targetNiches.map((n) => (
                    <Chip
                      key={n}
                      label={n}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: "#f7f7fc",
                        color: "#555",
                        border: "none",
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack gap={2.5}>
            <Card>
              <CardHeader title="Campaign Brief" />
              <Box sx={{ px: 3, py: 2 }}>
                <Typography
                  sx={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.75 }}
                >
                  {campaign.brief}
                </Typography>
              </Box>
            </Card>

            <Card>
              <CardHeader title="Deliverables" />
              <Box sx={{ px: 3, py: 2 }}>
                <Stack gap={0.8}>
                  {campaign.deliverables.map((d) => (
                    <Stack
                      key={d}
                      direction="row"
                      alignItems="flex-start"
                      gap={1}
                    >
                      <CheckCircleIcon
                        sx={{
                          fontSize: 13,
                          color: ColorPallete.primary.main,
                          mt: 0.2,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.78rem",
                          color: "#555",
                          lineHeight: 1.5,
                        }}
                      >
                        {d}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Card>

            <Card>
              <CardHeader title="Requirements" />
              <Box sx={{ px: 3, py: 2 }}>
                <Stack gap={0.8}>
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
                          background: "#aaa",
                          mt: 0.6,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.78rem",
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
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Overview;
