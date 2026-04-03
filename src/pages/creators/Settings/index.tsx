import { Box, Typography, Grid, Switch, Button } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SecurityIcon from "@mui/icons-material/Security";
import PaletteIcon from "@mui/icons-material/Palette";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import {
  PageShell,
  Card,
  CardHeader,
} from "../../../components/dashboard/SharedUI";
import { ColorPallete } from "../../../config/colors";

const ToggleRow = ({
  label,
  description,
  checked,
  onChange,
  isLast = false,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  isLast?: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      py: 1.8,
      px: 3,
      borderBottom: isLast ? "none" : "1px solid #f7f7fc",
    }}
  >
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography
        sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f0f1a", mb: 0.2 }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: "0.72rem", color: "#aaa", lineHeight: 1.4 }}>
        {description}
      </Typography>
    </Box>
    <Switch
      checked={checked}
      onChange={onChange}
      size="small"
      sx={{
        "& .MuiSwitch-switchBase.Mui-checked": {
          color: ColorPallete.primary.main,
        },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
          background: ColorPallete.primary.main,
        },
      }}
    />
  </Box>
);

const ActionRow = ({
  icon,
  label,
  description,
  actionLabel,
  danger = false,
  isLast = false,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  actionLabel: string;
  danger?: boolean;
  isLast?: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      py: 2,
      px: 3,
      borderBottom: isLast ? "none" : "1px solid #f7f7fc",
    }}
  >
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: "10px",
        background: danger ? "#fee2e2" : "#f7f7fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: danger ? "#ef4444" : "#666",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography
        sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f0f1a", mb: 0.2 }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: "0.72rem", color: "#aaa" }}>
        {description}
      </Typography>
    </Box>
    <Button
      size="small"
      variant="outlined"
      disableElevation
      sx={{
        borderRadius: "8px",
        fontWeight: 600,
        fontSize: "0.75rem",
        textTransform: "none",
        py: 0.5,
        flexShrink: 0,
        ...(danger
          ? {
              color: "#ef4444",
              borderColor: "#fecaca",
              "&:hover": { background: "#fee2e2", borderColor: "#ef4444" },
            }
          : {
              color: ColorPallete.primary.main,
              borderColor: `${ColorPallete.primary.main}40`,
              "&:hover": { borderColor: ColorPallete.primary.main },
            }),
      }}
    >
      {actionLabel}
    </Button>
  </Box>
);

const SettingsPage = () => {
  const [notifs, setNotifs] = useState({
    campaigns: true,
    payments: true,
    updates: false,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    twoFactor: false,
    activityLog: true,
  });

  const toggle = (group: "notifs" | "privacy", key: string) => {
    if (group === "notifs")
      setNotifs((p) => ({ ...p, [key]: !p[key as keyof typeof p] }));
    else setPrivacy((p) => ({ ...p, [key]: !p[key as keyof typeof p] }));
  };

  return (
    <PageShell
      title="Settings"
      subtitle="Configure your notification preferences and account security."
    >
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              title="Notifications"
              action={
                <NotificationsNoneIcon sx={{ fontSize: 18, color: "#aaa" }} />
              }
            />
            <ToggleRow
              label="Campaign Invites"
              description="Get notified when a new brand invite arrives."
              checked={notifs.campaigns}
              onChange={() => toggle("notifs", "campaigns")}
            />
            <ToggleRow
              label="Payment Updates"
              description="Alerts for payouts, milestones and invoices."
              checked={notifs.payments}
              onChange={() => toggle("notifs", "payments")}
            />
            <ToggleRow
              label="Platform Updates"
              description="New features and product announcements."
              checked={notifs.updates}
              onChange={() => toggle("notifs", "updates")}
            />
            <ToggleRow
              label="Marketing Emails"
              description="Tips, case studies and creator resources."
              checked={notifs.marketing}
              onChange={() => toggle("notifs", "marketing")}
              isLast
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              title="Security"
              action={<SecurityIcon sx={{ fontSize: 18, color: "#aaa" }} />}
            />
            <ToggleRow
              label="Two-Factor Authentication"
              description="Protect your account with 2FA via SMS or app."
              checked={privacy.twoFactor}
              onChange={() => toggle("privacy", "twoFactor")}
            />
            <ToggleRow
              label="Login Activity Log"
              description="Track all devices that have accessed your account."
              checked={privacy.activityLog}
              onChange={() => toggle("privacy", "activityLog")}
              isLast
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader
              title="Account"
              action={<PaletteIcon sx={{ fontSize: 18, color: "#aaa" }} />}
            />
            <ActionRow
              icon={<SecurityIcon fontSize="small" />}
              label="Change Password"
              description="Update your account password."
              actionLabel="Update"
            />
            <ActionRow
              icon={<LogoutIcon fontSize="small" />}
              label="Log Out"
              description="Sign out from this device."
              actionLabel="Log Out"
            />
            <ActionRow
              icon={<DeleteOutlineIcon fontSize="small" />}
              label="Delete Account"
              description="Permanently delete your account and all data."
              actionLabel="Delete"
              danger
              isLast
            />
          </Card>
        </Grid>
      </Grid>
    </PageShell>
  );
};

export default SettingsPage;
