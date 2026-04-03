import { useState } from "react";
import { Box, Grid, Typography, Switch, Button } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SecurityIcon from "@mui/icons-material/Security";
import GroupIcon from "@mui/icons-material/Group";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LogoutIcon from "@mui/icons-material/Logout";
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
    <Box>
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

const BrandSettingsPage = () => {
  const [notifs, setNotifs] = useState({
    applications: true,
    approvals: true,
    payments: true,
    updates: false,
    marketing: false,
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    activityLog: true,
    teamNotifs: true,
  });

  const toggle = (group: "notifs" | "security", key: string) => {
    if (group === "notifs")
      setNotifs((p) => ({ ...p, [key]: !p[key as keyof typeof p] }));
    else setSecurity((p) => ({ ...p, [key]: !p[key as keyof typeof p] }));
  };

  return (
    <PageShell
      title="Settings"
      subtitle="Manage notifications, security and account preferences."
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
              label="New Applications"
              description="Alert when a creator applies to any campaign."
              checked={notifs.applications}
              onChange={() => toggle("notifs", "applications")}
            />
            <ToggleRow
              label="Application Approvals"
              description="Notifications when you approve or reject a creator."
              checked={notifs.approvals}
              onChange={() => toggle("notifs", "approvals")}
            />
            <ToggleRow
              label="Payment Updates"
              description="Creator payouts, wallet top-ups and invoices."
              checked={notifs.payments}
              onChange={() => toggle("notifs", "payments")}
            />
            <ToggleRow
              label="Platform Updates"
              description="New platform features and product releases."
              checked={notifs.updates}
              onChange={() => toggle("notifs", "updates")}
            />
            <ToggleRow
              label="Marketing Emails"
              description="Tips, brand insights and case studies."
              checked={notifs.marketing}
              onChange={() => toggle("notifs", "marketing")}
              isLast
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              title="Security & Team"
              action={<SecurityIcon sx={{ fontSize: 18, color: "#aaa" }} />}
            />
            <ToggleRow
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account."
              checked={security.twoFactor}
              onChange={() => toggle("security", "twoFactor")}
            />
            <ToggleRow
              label="Login Activity Log"
              description="Track sign-ins across all devices."
              checked={security.activityLog}
              onChange={() => toggle("security", "activityLog")}
            />
            <ToggleRow
              label="Team Activity Notifications"
              description="Get notified of actions by team members."
              checked={security.teamNotifs}
              onChange={() => toggle("security", "teamNotifs")}
              isLast
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader title="Account" />
            <ActionRow
              icon={<GroupIcon fontSize="small" />}
              label="Manage Team"
              description="Invite, remove, and set roles for team members."
              actionLabel="Manage"
            />
            <ActionRow
              icon={<SecurityIcon fontSize="small" />}
              label="Change Password"
              description="Update your account login credentials."
              actionLabel="Update"
            />
            <ActionRow
              icon={<LogoutIcon fontSize="small" />}
              label="Log Out"
              description="Sign out of all devices."
              actionLabel="Log Out"
            />
            <ActionRow
              icon={<DeleteOutlineIcon fontSize="small" />}
              label="Delete Account"
              description="Permanently delete this brand account and all data."
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

export default BrandSettingsPage;
