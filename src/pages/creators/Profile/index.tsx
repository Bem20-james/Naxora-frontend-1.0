import {
  Box,
  Typography,
  Grid,
  Stack,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState } from "react";
import {
  PageShell,
  Card,
  CardHeader,
  SectionLabel,
} from "../../../components/dashboard/SharedUI";
import { MOCK_PROFILE } from "./mockData";
import { ColorPallete } from "../../../config/colors";
import type { SocialLink } from "../../../components/dashboard/types";
import { TextField } from "../../../components/dashboard";

const PlatformIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Instagram: <InstagramIcon sx={{ fontSize: 16 }} />,
    YouTube: <YouTubeIcon sx={{ fontSize: 16 }} />,
    TikTok: (
      <Typography sx={{ fontSize: "11px", fontWeight: 900 }}>TK</Typography>
    ),
  };
  return <>{icons[platform] || <PersonOutlineIcon sx={{ fontSize: 16 }} />}</>;
};

const SocialRow = ({ link }: { link: SocialLink }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      py: 1.5,
      px: 3,
      borderBottom: "1px solid #f7f7fc",
      "&:last-child": { borderBottom: "none" },
    }}
  >
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: "8px",
        background: "#f7f7fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#555",
        flexShrink: 0,
      }}
    >
      <PlatformIcon platform={link.platform} />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography
        sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#0f0f1a" }}
      >
        {link.platform}
      </Typography>
      <Typography sx={{ fontSize: "0.7rem", color: "#aaa" }}>
        {link.handle}
      </Typography>
    </Box>
    <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f0f1a" }}>
      {link.followers >= 1000
        ? `${(link.followers / 1000).toFixed(1)}K`
        : link.followers}
    </Typography>
  </Box>
);

const ProfilePage = () => {
  const p = MOCK_PROFILE;
  const [editing, setEditing] = useState(false);

  return (
    <PageShell
      title="Profile"
      subtitle="Manage your creator identity and public information."
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
                      background: `linear-gradient(135deg, ${ColorPallete.primary.main}, ${ColorPallete.secondary?.main || "#6366f1"})`,
                      fontSize: "1.5rem",
                      fontWeight: 700,
                    }}
                  >
                    {p.avatar}
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
                  {p.firstName} {p.lastName}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.78rem", color: "#aaa", mb: 1.5 }}
                >
                  {p.location}
                </Typography>

                <Stack
                  direction="row"
                  gap={0.7}
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  {p.niche.map((n) => (
                    <Chip
                      key={n}
                      label={n}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        background: `${ColorPallete.primary.main}12`,
                        color: ColorPallete.primary.main,
                        border: "none",
                      }}
                    />
                  ))}
                </Stack>
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
              {p.socialLinks.map((link) => (
                <SocialRow key={link.platform} link={link} />
              ))}
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardHeader
              title="Personal Information"
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="First Name" value={p.firstName} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Last Name" value={p.lastName} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Email" value={p.email} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Phone" value={p.phone} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Location" value={p.location} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField label="Bio" value={p.bio} multiline />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, pt: 2.5, borderTop: "1px solid #f0f0f5" }}>
                <SectionLabel>Account Info</SectionLabel>
                <Typography sx={{ fontSize: "0.78rem", color: "#aaa" }}>
                  Member since{" "}
                  {new Date(p.joinedDate).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </PageShell>
  );
};

export default ProfilePage;
