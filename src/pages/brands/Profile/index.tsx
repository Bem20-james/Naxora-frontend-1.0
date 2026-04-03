import { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from "@mui/icons-material/Link";
import {
  PageShell,
  Card,
  CardHeader,
  InfoRow,
} from "../../../components/dashboard/SharedUI";
import { MOCK_BRAND } from "./data";
import { ColorPallete } from "../../../config/colors";
import { TextField } from "../../../components/dashboard";

const BrandProfilePage = () => {
  const b = MOCK_BRAND;
  const [editing, setEditing] = useState(false);

  return (
    <PageShell
      title="Brand Profile"
      subtitle="Manage your company identity visible to creators."
    >
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack gap={2.5}>
            <Card>
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Box
                  sx={{ position: "relative", display: "inline-block", mb: 2 }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      background: `${b.logoColor}25`,
                      color: b.logoColor,
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      border: `3px solid ${b.logoColor}30`,
                    }}
                  >
                    {b.logo}
                  </Avatar>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: ColorPallete.primary.main,
                      border: "2px solid #fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <EditIcon sx={{ fontSize: 12, color: "#fff" }} />
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "#0f0f1a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {b.companyName}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.78rem", color: "#aaa", mb: 0.5 }}
                >
                  {b.industry}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.75rem", color: "#aaa", mb: 1.5 }}
                >
                  {b.location}
                </Typography>
                <Chip
                  label={`Est. ${b.foundedYear}`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    background: `${b.logoColor}15`,
                    color: b.logoColor,
                    border: "none",
                  }}
                />
              </Box>
            </Card>

            <Card>
              <CardHeader title="Company Info" />
              <Box sx={{ px: 3, py: 1 }}>
                <InfoRow label="Team Size" value={b.teamSize} />
                <InfoRow label="Founded" value={b.foundedYear} />
                <InfoRow label="Industry" value={b.industry} />
                <InfoRow
                  label="Member Since"
                  value={new Date(b.joinedDate).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                />
              </Box>
            </Card>

            <Card>
              <CardHeader
                title="Social Channels"
                action={
                  <Button
                    size="small"
                    variant="text"
                    sx={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: ColorPallete.primary.main,
                      textTransform: "none",
                    }}
                  >
                    + Add
                  </Button>
                }
              />
              <Box sx={{ px: 3, py: 1 }}>
                {b.socialLinks.map((link, i) => (
                  <Box
                    key={link.platform}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      py: 1.5,
                      borderBottom:
                        i < b.socialLinks.length - 1
                          ? "1px solid #f7f7fc"
                          : "none",
                    }}
                  >
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "8px",
                        background: "#f7f7fc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LinkIcon sx={{ fontSize: 14, color: "#666" }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#0f0f1a",
                        }}
                      >
                        {link.platform}
                      </Typography>
                      <Typography sx={{ fontSize: "0.7rem", color: "#aaa" }}>
                        {link.handle}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardHeader
              title="Company Details"
              action={
                <Button
                  size="small"
                  variant={editing ? "contained" : "outlined"}
                  disableElevation
                  onClick={() => setEditing(!editing)}
                  sx={{
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "none",
                    py: 0.5,
                    ...(editing
                      ? {
                          background: ColorPallete.primary.main,
                          color: "#fff",
                          "&:hover": {
                            opacity: 0.9,
                            background: ColorPallete.primary.main,
                          },
                        }
                      : {
                          color: ColorPallete.primary.main,
                          borderColor: `${ColorPallete.primary.main}50`,
                        }),
                  }}
                >
                  {editing ? "Save Changes" : "Edit Profile"}
                </Button>
              }
            />
            <Box sx={{ p: 3 }}>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Company Name" value={b.companyName} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Industry" value={b.industry} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Email" value={b.email} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Phone" value={b.phone} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Website" value={b.website} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Location" value={b.location} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField label="About the Brand" value={b.bio} multiline />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </PageShell>
  );
};

export default BrandProfilePage;
