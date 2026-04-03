import { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Chip,
  InputBase,
  MenuItem,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { PageShell, StatTile } from "../../../components/dashboard/SharedUI";
import { MOCK_CREATORS, NICHE_OPTIONS } from "./data";
import { ColorPallete } from "../../../config/colors";
import { CreatorCard } from "../../../components/dashboard";

const CreatorDiscoveryPage = () => {
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("All");
  const [sortBy, setSortBy] = useState("followers");

  const filtered = MOCK_CREATORS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.bio.toLowerCase().includes(search.toLowerCase());
    const matchNiche = niche === "All" || c.niche.includes(niche);
    return matchSearch && matchNiche;
  }).sort((a, b) => {
    if (sortBy === "followers") return b.totalFollowers - a.totalFollowers;
    if (sortBy === "engagement") return b.avgEngagement - a.avgEngagement;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "campaigns")
      return b.completedCampaigns - a.completedCampaigns;
    return 0;
  });

  return (
    <PageShell
      title="Creator Discovery"
      subtitle="Find and invite the right creators for your campaigns."
    >
      <Grid container spacing={2} mb={3}>
        {[
          {
            label: "Creators Available",
            value: MOCK_CREATORS.length,
            icon: <PeopleIcon fontSize="small" />,
          },
          {
            label: "Avg Engagement",
            value: `${(MOCK_CREATORS.reduce((s, c) => s + c.avgEngagement, 0) / MOCK_CREATORS.length).toFixed(1)}%`,
            icon: <TrendingUpIcon fontSize="small" />,
            color: "#22c55e",
          },
          {
            label: "Top Rating",
            value: Math.max(...MOCK_CREATORS.map((c) => c.rating)),
            icon: <StarIcon fontSize="small" />,
            color: "#f59e0b",
          },
        ].map((s) => (
          <Grid size={{ xs: 12, sm: 4 }} key={s.label}>
            <StatTile {...s} />
          </Grid>
        ))}
      </Grid>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={1.5}
        mb={3}
        alignItems={{ sm: "center" }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "#fff",
            border: "1px solid #f0f0f5",
            borderRadius: "10px",
            px: 1.5,
            py: 0.8,
            "&:focus-within": {
              border: `1px solid ${ColorPallete.primary.main}`,
              boxShadow: `0 0 0 3px ${ColorPallete.primary.main}15`,
            },
          }}
        >
          <SearchIcon sx={{ fontSize: 17, color: "#aaa" }} />
          <InputBase
            placeholder="Search by name, bio or niche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              fontSize: "0.85rem",
              "& input::placeholder": { color: "#bbb" },
            }}
          />
        </Box>

        {/* Niche filter */}
        <Stack direction="row" gap={0.7} flexWrap="wrap">
          {NICHE_OPTIONS.slice(0, 5).map((n) => (
            <Chip
              key={n}
              label={n}
              size="small"
              onClick={() => setNiche(n)}
              sx={{
                height: 28,
                fontSize: "0.73rem",
                fontWeight: 600,
                cursor: "pointer",
                borderRadius: "8px",
                background: niche === n ? ColorPallete.primary.main : "#f7f7fc",
                color: niche === n ? "#fff" : "#666",
                border: "none",
                "&:hover": {
                  background:
                    niche === n ? ColorPallete.primary.main : "#ebebf5",
                },
              }}
            />
          ))}
        </Stack>

        {/* Sort */}
        <Select
          size="small"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{
            minWidth: 140,
            borderRadius: "10px",
            fontSize: "0.82rem",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#f0f0f5" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: `${ColorPallete.primary.main}50`,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: ColorPallete.primary.main,
            },
          }}
        >
          <MenuItem value="followers" sx={{ fontSize: "0.82rem" }}>
            By Followers
          </MenuItem>
          <MenuItem value="engagement" sx={{ fontSize: "0.82rem" }}>
            By Engagement
          </MenuItem>
          <MenuItem value="rating" sx={{ fontSize: "0.82rem" }}>
            By Rating
          </MenuItem>
          <MenuItem value="campaigns" sx={{ fontSize: "0.82rem" }}>
            By Campaigns
          </MenuItem>
        </Select>
      </Stack>

      {/* Results */}
      <Typography sx={{ fontSize: "0.75rem", color: "#aaa", mb: 2 }}>
        Showing {filtered.length} creator{filtered.length !== 1 ? "s" : ""}
      </Typography>
      <Grid container spacing={2}>
        {filtered.map((c) => (
          <Grid size={{ xs: 12, sm: 6, xl: 4 }} key={c.id}>
            <CreatorCard creator={c} />
          </Grid>
        ))}
      </Grid>
    </PageShell>
  );
};

export default CreatorDiscoveryPage;
