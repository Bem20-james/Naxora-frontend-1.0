import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Chip,
  Drawer,
  IconButton,
  LinearProgress,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  BrandAvatar,
  ProjectStatusChip,
  SectionLabel,
  ProgressBar,
} from "./SharedUI";
import type { Project } from "./types";
import { ColorPallete } from "../../config/colors";
import AnalyticPill from "./AnalyticPill";

const ProjectDrawer = ({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) => {
  const [tab, setTab] = useState(0);
  if (!project) return null;

  const { analytics } = project;

  return (
    <Drawer
      anchor="right"
      open={!!project}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 480 }, background: "#ffffff" },
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
              initials={project.brandLogo}
              color={project.brandColor}
              size={38}
            />
            <Box>
              <Typography
                sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f0f1a" }}
              >
                {project.brand}
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "#aaa" }}>
                {project.category}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <ProjectStatusChip status={project.status} />
            <IconButton
              size="small"
              onClick={onClose}
              sx={{ color: "#aaa", borderRadius: "8px" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        {/* Tabs */}
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
            "& .MuiTabs-indicator": { background: ColorPallete.primary.main },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Deliverables" />
          <Tab label="Analytics" />
        </Tabs>

        <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 2.5 }}>
          {tab === 0 && (
            <Box>
              <Grid container spacing={1.5} mb={3}>
                {[
                  {
                    label: "Budget",
                    value: `$${project.budget.toLocaleString()}`,
                  },
                  {
                    label: "Earned",
                    value: `$${project.amountEarned.toLocaleString()}`,
                  },
                  {
                    label: "Start",
                    value: new Date(project.startDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short" },
                    ),
                  },
                  {
                    label: "End",
                    value: new Date(project.endDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short" },
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

              <SectionLabel>Progress</SectionLabel>
              <Box mb={3}>
                <ProgressBar
                  value={project.progress}
                  color={project.brandColor}
                />
              </Box>

              <SectionLabel>Description</SectionLabel>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  color: "#555",
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                {project.description}
              </Typography>

              <SectionLabel>Platforms</SectionLabel>
              <Stack direction="row" gap={0.7} flexWrap="wrap">
                {project.platforms.map((p) => (
                  <Chip
                    key={p}
                    label={p}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      background: `${project.brandColor}15`,
                      color: project.brandColor,
                      border: "none",
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {tab === 1 && (
            <Box>
              <SectionLabel>Deliverables</SectionLabel>
              <Stack gap={1}>
                {project.deliverables.map((d) => (
                  <Stack
                    key={d.id}
                    direction="row"
                    alignItems="center"
                    gap={1.5}
                    sx={{
                      p: 1.5,
                      borderRadius: "10px",
                      background: d.done ? "#f0fdf4" : "#f7f7fc",
                      border: `1px solid ${d.done ? "#bbf7d0" : "#f0f0f5"}`,
                    }}
                  >
                    {d.done ? (
                      <CheckCircleIcon
                        sx={{ fontSize: 16, color: "#22c55e", flexShrink: 0 }}
                      />
                    ) : (
                      <RadioButtonUncheckedIcon
                        sx={{ fontSize: 16, color: "#ccc", flexShrink: 0 }}
                      />
                    )}
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        color: d.done ? "#166534" : "#555",
                        fontWeight: d.done ? 600 : 400,
                      }}
                    >
                      {d.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}

          {tab === 2 && (
            <Box>
              <SectionLabel>Performance</SectionLabel>
              <Stack direction="row" gap={1.5} flexWrap="wrap" mb={3}>
                <AnalyticPill
                  icon={<VisibilityIcon sx={{ fontSize: 14 }} />}
                  label="Views"
                  value={analytics.views.toLocaleString()}
                />
                <AnalyticPill
                  icon={<TouchAppIcon sx={{ fontSize: 14 }} />}
                  label="Clicks"
                  value={analytics.clicks.toLocaleString()}
                />
                <AnalyticPill
                  icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                  label="Conversions"
                  value={analytics.conversions}
                />
                <AnalyticPill
                  icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
                  label="Engagement"
                  value={`${analytics.engagement}%`}
                />
              </Stack>

              {/* Mini engagement bar */}
              <SectionLabel>Engagement Rate</SectionLabel>
              <Box sx={{ background: "#f7f7fc", borderRadius: "10px", p: 2 }}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography sx={{ fontSize: "0.78rem", color: "#555" }}>
                    Rate
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: project.brandColor,
                    }}
                  >
                    {analytics.engagement}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(analytics.engagement * 10, 100)}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: "#ebebf5",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      background: project.brandColor,
                    },
                  }}
                />
                <Typography
                  sx={{ fontSize: "0.68rem", color: "#aaa", mt: 0.8 }}
                >
                  Industry avg: 3.5% — You're above average 🎉
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default ProjectDrawer;
