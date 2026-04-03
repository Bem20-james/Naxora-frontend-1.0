import { useState } from "react";
import { Box, Grid, Stack, Typography, Chip } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import StarIcon from "@mui/icons-material/Star";
import { PageShell, StatTile } from "../../../components/dashboard/SharedUI";
import { MOCK_APPLICATIONS } from "./data";
import { type ApplicationStatus } from "../../../components/dashboard/types";
import { ColorPallete } from "../../../config/colors";
import { ApplicationCard } from "../../../components/dashboard";

const statusFilters = [
  "All",
  "Pending",
  "Shortlisted",
  "Approved",
  "Rejected",
] as const;
type FilterType = (typeof statusFilters)[number];

const BrandApplicationsPage = () => {
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered =
    filter === "All"
      ? MOCK_APPLICATIONS
      : MOCK_APPLICATIONS.filter(
          (a) => a.status === (filter.toLowerCase() as ApplicationStatus),
        );

  const pending = MOCK_APPLICATIONS.filter(
    (a) => a.status === "pending",
  ).length;
  const approved = MOCK_APPLICATIONS.filter(
    (a) => a.status === "approved",
  ).length;
  const shortlisted = MOCK_APPLICATIONS.filter(
    (a) => a.status === "shortlisted",
  ).length;

  return (
    <PageShell
      title="Applications"
      subtitle="Review and manage all creator applications to your campaigns."
    >
      <Grid container spacing={2} mb={3}>
        {[
          {
            label: "Total Applications",
            value: MOCK_APPLICATIONS.length,
            icon: <PeopleIcon fontSize="small" />,
          },
          {
            label: "Pending Review",
            value: pending,
            icon: <HourglassEmptyIcon fontSize="small" />,
            color: "#f59e0b",
          },
          {
            label: "Shortlisted",
            value: shortlisted,
            icon: <StarIcon fontSize="small" />,
            color: "#6366f1",
          },
          {
            label: "Approved",
            value: approved,
            icon: <CheckCircleIcon fontSize="small" />,
            color: "#22c55e",
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

      <Stack gap={2}>
        {filtered.map((a) => (
          <ApplicationCard key={a.id} app={a} />
        ))}
        {filtered.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography sx={{ fontSize: "0.9rem", color: "#aaa" }}>
              No applications in this category
            </Typography>
          </Box>
        )}
      </Stack>
    </PageShell>
  );
};

export default BrandApplicationsPage;
