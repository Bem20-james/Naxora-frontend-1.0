import { Box, Typography, Stack } from "@mui/material";

import { Card, BrandAvatar, ProjectStatusChip, ProgressBar } from "./SharedUI";
import type { Project } from "./types";

const ProjectCard = ({
  project,
  onView,
}: {
  project: Project;
  onView: (p: Project) => void;
}) => {
  const completed = project.deliverables.filter((d) => d.done).length;
  return (
    <Card hoverable onClick={() => onView(project)}>
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" alignItems="flex-start" gap={1.5} mb={1.5}>
          <BrandAvatar
            initials={project.brandLogo}
            color={project.brandColor}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f0f1a" }}
              >
                {project.brand}
              </Typography>
              <ProjectStatusChip status={project.status} />
            </Stack>
            <Typography sx={{ fontSize: "0.72rem", color: "#aaa", mt: 0.2 }}>
              {project.category}
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
          {project.description}
        </Typography>

        <ProgressBar value={project.progress} color={project.brandColor} />

        <Stack direction="row" justifyContent="space-between" mt={1.5}>
          <Typography sx={{ fontSize: "0.72rem", color: "#aaa" }}>
            {completed}/{project.deliverables.length} deliverables
          </Typography>
          <Typography
            sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f0f1a" }}
          >
            ${project.amountEarned.toLocaleString()} / $
            {project.budget.toLocaleString()}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
};

export default ProjectCard;
