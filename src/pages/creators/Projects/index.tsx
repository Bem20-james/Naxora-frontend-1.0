import { useState } from "react";
import { Grid, Stack, Chip } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { PageShell, StatTile } from "../../../components/dashboard/SharedUI";
import { MOCK_PROJECTS } from "./mockData";
import type { Project } from "../../../components/dashboard/types";
import { ColorPallete } from "../../../config/colors";
import { ProjectDrawer, ProjectCard } from "../../../components/dashboard";

const statusFilters = [
  "All",
  "Active",
  "In Review",
  "Completed",
  "Paused",
] as const;
type FilterType = (typeof statusFilters)[number];

const ProjectsPage = () => {
  const [filter, setFilter] = useState<FilterType>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    filter === "All"
      ? MOCK_PROJECTS
      : MOCK_PROJECTS.filter((p: { status: string }) => {
          const map: Record<FilterType, string> = {
            All: "",
            Active: "active",
            "In Review": "in_review",
            Completed: "completed",
            Paused: "paused",
          };
          return p.status === map[filter];
        });

  const totalEarned = MOCK_PROJECTS.reduce(
    (s: any, p: { amountEarned: any }) => s + p.amountEarned,
    0,
  );
  const active = MOCK_PROJECTS.filter(
    (p: { status: string }) => p.status === "active",
  ).length;

  return (
    <PageShell
      title="Projects"
      subtitle="Track your active collaborations, deliverables and earnings."
    >
      {/* Stats */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: "Total Projects", value: MOCK_PROJECTS.length },
          { label: "Active", value: active },
          { label: "Total Earned", value: `$${totalEarned.toLocaleString()}` },
        ].map((s) => (
          <Grid size={{ xs: 12, sm: 4 }} key={s.label}>
            <StatTile
              label={s.label}
              value={s.value}
              icon={<FolderOpenIcon fontSize="small" />}
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
        {filtered.map((p: any) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={p.id}>
            <ProjectCard project={p} onView={setSelected} />
          </Grid>
        ))}
      </Grid>

      <ProjectDrawer project={selected} onClose={() => setSelected(null)} />
    </PageShell>
  );
};

export default ProjectsPage;
