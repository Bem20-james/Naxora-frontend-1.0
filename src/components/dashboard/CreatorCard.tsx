import { useState } from "react";
import { Box, Grid, Stack, Typography, Button, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Card, EntityAvatar } from "./SharedUI";
import type { DiscoverableCreator } from "./types";
import { ColorPallete } from "../../config/colors";

const CreatorCard = ({ creator }: { creator: DiscoverableCreator }) => {
  const [invited, setInvited] = useState(false);

  return (
    <Card hoverable>
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" alignItems="flex-start" gap={1.5} mb={1.5}>
          <EntityAvatar
            initials={creator.avatar}
            color={creator.color}
            size={46}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f0f1a" }}
              >
                {creator.name}
              </Typography>
              <Stack direction="row" alignItems="center" gap={0.3}>
                <StarIcon sx={{ fontSize: 12, color: "#f59e0b" }} />
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#0f0f1a",
                  }}
                >
                  {creator.rating}
                </Typography>
              </Stack>
            </Stack>
            <Typography sx={{ fontSize: "0.72rem", color: "#aaa" }}>
              {creator.location}
            </Typography>
          </Box>
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
          {creator.bio}
        </Typography>

        <Stack direction="row" gap={0.6} flexWrap="wrap" mb={2}>
          {creator.niche.map((n) => (
            <Chip
              key={n}
              label={n}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 600,
                background: `${creator.color}15`,
                color: creator.color,
                border: "none",
              }}
            />
          ))}
        </Stack>

        <Box
          sx={{ background: "#f7f7fc", borderRadius: "10px", p: 1.5, mb: 2 }}
        >
          <Grid container spacing={1}>
            {[
              {
                label: "Followers",
                value:
                  creator.totalFollowers >= 1000
                    ? `${(creator.totalFollowers / 1000).toFixed(1)}K`
                    : creator.totalFollowers,
              },
              { label: "Engagement", value: `${creator.avgEngagement}%` },
              { label: "Campaigns", value: creator.completedCampaigns },
            ].map((m) => (
              <Grid size={{ xs: 4 }} key={m.label}>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: "#0f0f1a",
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.62rem",
                    color: "#aaa",
                    mt: 0.2,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {m.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Stack direction="row" gap={0.6} flexWrap="wrap" mb={2}>
          {creator.platforms.map((p) => (
            <Chip
              key={p.name}
              label={`${p.name}: ${p.followers >= 1000 ? `${(p.followers / 1000).toFixed(1)}K` : p.followers}`}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.62rem",
                fontWeight: 600,
                background: "#f0f0f5",
                color: "#666",
                border: "none",
              }}
            />
          ))}
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              sx={{
                fontSize: "0.62rem",
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Rate Range
            </Typography>
            <Typography
              sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f0f1a" }}
            >
              {creator.priceRange}
            </Typography>
          </Box>
          <Button
            size="small"
            variant={invited ? "outlined" : "contained"}
            disableElevation
            onClick={() => setInvited(!invited)}
            sx={{
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "none",
              py: 0.6,
              px: 1.5,
              ...(invited
                ? {
                    color: "#22c55e",
                    borderColor: "#bbf7d0",
                    "&:hover": {
                      background: "#f0fdf4",
                      borderColor: "#22c55e",
                    },
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
            {invited ? "✓ Invited" : "Invite"}
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default CreatorCard;
