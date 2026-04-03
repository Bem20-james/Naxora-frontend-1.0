import { Box, Stack, Typography, Button, Chip } from "@mui/material";
import { Card, EntityAvatar, AppStatusChip } from "./SharedUI";
import { type Application } from "./types";
import { ColorPallete } from "../../config/colors";

const ApplicationCard = ({ app }: { app: Application }) => (
  <Card>
    <Box sx={{ p: 2.5 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={2}
        justifyContent="space-between"
        alignItems={{ sm: "flex-start" }}
      >
        <Stack direction="row" gap={1.5} flex={1}>
          <EntityAvatar
            initials={app.creatorAvatar}
            color={app.creatorColor}
            size={46}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
              <Typography
                sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f0f1a" }}
              >
                {app.creatorName}
              </Typography>
              <AppStatusChip status={app.status} />
            </Stack>
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: ColorPallete.primary.main,
                fontWeight: 600,
                mt: 0.2,
              }}
            >
              {app.campaignTitle}
            </Typography>
            <Stack direction="row" gap={0.6} mt={0.8} flexWrap="wrap">
              {app.niche.map((n) => (
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

            <Stack direction="row" gap={2} mt={1.2} flexWrap="wrap">
              {app.platforms.map((p) => (
                <Box key={p.name}>
                  <Typography
                    sx={{
                      fontSize: "0.62rem",
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {p.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "#0f0f1a",
                    }}
                  >
                    {p.followers >= 1000
                      ? `${(p.followers / 1000).toFixed(1)}K`
                      : p.followers}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>

        <Box sx={{ flexShrink: 0, textAlign: { sm: "right" } }}>
          <Typography
            sx={{
              fontSize: "0.65rem",
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Rate
          </Typography>
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "#0f0f1a",
              letterSpacing: "-0.03em",
            }}
          >
            ${app.proposedRate.toLocaleString()}
          </Typography>
          <Typography sx={{ fontSize: "0.7rem", color: "#aaa", mb: 1.5 }}>
            Applied{" "}
            {new Date(app.appliedDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </Typography>
          {app.status === "pending" && (
            <Stack direction="row" gap={1} justifyContent={{ sm: "flex-end" }}>
              <Button
                size="small"
                variant="outlined"
                disableElevation
                sx={{
                  borderRadius: "8px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  textTransform: "none",
                  py: 0.4,
                  color: "#6366f1",
                  borderColor: "#c7d2fe",
                  "&:hover": { background: "#ede9fe", borderColor: "#6366f1" },
                }}
              >
                Shortlist
              </Button>
              <Button
                size="small"
                variant="outlined"
                disableElevation
                sx={{
                  borderRadius: "8px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  textTransform: "none",
                  py: 0.4,
                  color: "#ef4444",
                  borderColor: "#fecaca",
                  "&:hover": { background: "#fee2e2", borderColor: "#ef4444" },
                }}
              >
                Reject
              </Button>
              <Button
                size="small"
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: "8px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "none",
                  py: 0.4,
                  background: ColorPallete.primary.main,
                  "&:hover": {
                    opacity: 0.9,
                    background: ColorPallete.primary.main,
                  },
                }}
              >
                Approve
              </Button>
            </Stack>
          )}
        </Box>
      </Stack>

      <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #f7f7fc" }}>
        <Typography
          sx={{
            fontSize: "0.65rem",
            color: "#aaa",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            mb: 0.5,
          }}
        >
          Pitch
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.7 }}>
          {app.pitch}
        </Typography>
      </Box>
    </Box>
  </Card>
);

export default ApplicationCard;
