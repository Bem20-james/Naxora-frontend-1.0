import { useState } from "react";
import { Box, Grid, Stack, Typography, Chip, Button } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { MOCK_NOTIFICATIONS } from "./data";
import type {
  AppNotification,
  NotificationType,
} from "../../../components/dashboard/types";
import { ColorPallete } from "../../../config/colors";
import GroupSection from "./GroupSection";

type FilterType =
  | "All"
  | "Unread"
  | "Campaign"
  | "Payment"
  | "Reminder"
  | "System";

const filterMap: Record<FilterType, NotificationType[] | null> = {
  All: null,
  Unread: null,
  Campaign: ["campaign_invite", "application"],
  Payment: ["payment"],
  Reminder: ["reminder", "approval"],
  System: ["system"],
};

const groupByTime = (items: AppNotification[]) => {
  const now = Date.now();
  const today: AppNotification[] = [];
  const yesterday: AppNotification[] = [];
  const older: AppNotification[] = [];

  items.forEach((n) => {
    const diff = now - new Date(n.timestamp).getTime();
    if (diff < 86400000) today.push(n);
    else if (diff < 172800000) yesterday.push(n);
    else older.push(n);
  });

  return { today, yesterday, older };
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<FilterType>("All");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkRead = (id: string) =>
    setNotifications((p) =>
      p.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const handleMarkAllRead = () =>
    setNotifications((p) => p.map((n) => ({ ...n, read: true })));

  const filtered = notifications.filter((n) => {
    if (filter === "Unread") return !n.read;
    const types = filterMap[filter];
    if (types) return types.includes(n.type);
    return true;
  });

  const { today, yesterday, older } = groupByTime(filtered);
  const isEmpty = filtered.length === 0;

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Typography
              sx={{
                fontSize: "1.35rem",
                fontWeight: 800,
                color: "#0f0f1a",
                letterSpacing: "-0.03em",
              }}
            >
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Box
                sx={{
                  background: ColorPallete.primary.main,
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  height: 22,
                  minWidth: 22,
                  borderRadius: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 0.8,
                }}
              >
                {unreadCount}
              </Box>
            )}
          </Stack>
          <Typography sx={{ fontSize: "0.82rem", color: "#aaa", mt: 0.4 }}>
            Stay on top of your campaigns, payments and updates.
          </Typography>
        </Box>

        {unreadCount > 0 && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<DoneAllIcon />}
            onClick={handleMarkAllRead}
            sx={{
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "0.8rem",
              textTransform: "none",
              color: ColorPallete.primary.main,
              borderColor: `${ColorPallete.primary.main}50`,
              "&:hover": { borderColor: ColorPallete.primary.main },
            }}
          >
            Mark all as read
          </Button>
        )}
      </Stack>

      <Stack direction="row" gap={1} mb={3} flexWrap="wrap">
        {(
          [
            "All",
            "Unread",
            "Campaign",
            "Payment",
            "Reminder",
            "System",
          ] as FilterType[]
        ).map((f) => {
          const count =
            f === "Unread"
              ? notifications.filter((n) => !n.read).length
              : f === "All"
                ? notifications.length
                : notifications.filter((n) => {
                    const types = filterMap[f];
                    return types ? types.includes(n.type) : true;
                  }).length;

          return (
            <Chip
              key={f}
              label={count > 0 ? `${f} (${count})` : f}
              onClick={() => setFilter(f)}
              size="small"
              sx={{
                height: 28,
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                borderRadius: "8px",
                background:
                  filter === f ? ColorPallete.primary.main : "#f7f7fc",
                color: filter === f ? "#fff" : "#666",
                border: "none",
                "&:hover": {
                  background:
                    filter === f ? ColorPallete.primary.main : "#ebebf5",
                },
              }}
            />
          );
        })}
      </Stack>

      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, lg: 9 }}>
          <Box
            sx={{
              background: "#fff",
              borderRadius: "14px",
              border: "1px solid #f0f0f5",
              overflow: "hidden",
            }}
          >
            {isEmpty ? (
              <Box sx={{ py: 10, textAlign: "center" }}>
                <NotificationsNoneIcon
                  sx={{ fontSize: 40, color: "#e0e0e0", mb: 2 }}
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#0f0f1a",
                    mb: 0.5,
                  }}
                >
                  {filter === "Unread"
                    ? "No unread notifications"
                    : "Nothing here yet"}
                </Typography>
                <Typography sx={{ fontSize: "0.82rem", color: "#aaa" }}>
                  {filter === "Unread"
                    ? "You're all caught up — great work!"
                    : "Notifications will appear here when there's activity."}
                </Typography>
              </Box>
            ) : (
              <>
                <GroupSection
                  label="Today"
                  items={today}
                  onMarkRead={handleMarkRead}
                />
                <GroupSection
                  label="Yesterday"
                  items={yesterday}
                  onMarkRead={handleMarkRead}
                />
                <GroupSection
                  label="Older"
                  items={older}
                  onMarkRead={handleMarkRead}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotificationsPage;
