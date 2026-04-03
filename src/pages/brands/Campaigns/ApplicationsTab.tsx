import { Box, Stack, Typography, Button, Chip } from "@mui/material";
import {
  Card,
  AppStatusChip,
  EntityAvatar,
} from "../../../components/dashboard/SharedUI";
import { ColorPallete } from "../../../config/colors";
import { MOCK_APPLICATIONS, MOCK_BRAND_CAMPAIGNS } from "./data";

const ApplicationsTab = ({ id }: { id: any }) => {
  const campaign =
    MOCK_BRAND_CAMPAIGNS.find((c) => c.id === id) ?? MOCK_BRAND_CAMPAIGNS[0];
  const applications = MOCK_APPLICATIONS.filter(
    (a) => a.campaignId === campaign.id,
  );

  return (
    <div>
      <Box>
        {applications.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography sx={{ fontSize: "0.9rem", color: "#aaa" }}>
              No applications yet
            </Typography>
          </Box>
        ) : (
          <Stack gap={2}>
            {applications.map((a) => (
              <Card key={a.id}>
                <Box sx={{ p: 2.5 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ sm: "flex-start" }}
                    gap={2}
                    justifyContent="space-between"
                  >
                    <Stack direction="row" gap={1.5} flex={1}>
                      <EntityAvatar
                        initials={a.creatorAvatar}
                        color={a.creatorColor}
                        size={46}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          flexWrap="wrap"
                        >
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.9rem",
                              color: "#0f0f1a",
                            }}
                          >
                            {a.creatorName}
                          </Typography>
                          <AppStatusChip status={a.status} />
                        </Stack>
                        <Stack
                          direction="row"
                          gap={0.7}
                          mt={0.5}
                          flexWrap="wrap"
                        >
                          {a.niche.map((n) => (
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
                        <Stack direction="row" gap={2} mt={1} flexWrap="wrap">
                          {a.platforms.map((p) => (
                            <Box key={p.name}>
                              <Typography
                                sx={{ fontSize: "0.65rem", color: "#aaa" }}
                              >
                                {p.name}: {p.handle}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  color: "#0f0f1a",
                                }}
                              >
                                {p.followers >= 1000
                                  ? `${(p.followers / 1000).toFixed(1)}K`
                                  : p.followers}{" "}
                                followers
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    </Stack>

                    <Box sx={{ flexShrink: 0, textAlign: { sm: "right" } }}>
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          color: "#aaa",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Proposed Rate
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 800,
                          color: "#0f0f1a",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        ${a.proposedRate.toLocaleString()}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.7rem", color: "#aaa", mb: 1.5 }}
                      >
                        Applied{" "}
                        {new Date(a.appliedDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </Typography>
                      {a.status === "pending" && (
                        <Stack
                          direction="row"
                          gap={1}
                          justifyContent={{ sm: "flex-end" }}
                        >
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
                              color: "#aaa",
                              borderColor: "#e5e5f0",
                            }}
                          >
                            Shortlist
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
                        fontSize: "0.68rem",
                        color: "#aaa",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        mb: 0.5,
                      }}
                    >
                      Pitch
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: "#555",
                        lineHeight: 1.65,
                      }}
                    >
                      {a.pitch}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </div>
  );
};

export default ApplicationsTab;
