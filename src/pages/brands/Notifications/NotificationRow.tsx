import { Box, Stack, Typography, Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type {
  AppNotification,
  NotificationType,
} from "../../../components/dashboard/types";
import { ColorPallete } from "../../../config/colors";
import { formatTimestamp } from "../../../utils/functions";
import { NotifyIcon, typeIconColor } from "../../../components/dashboard";

const typeLabelMap: Record<NotificationType, string> = {
  campaign_invite: "Campaign",
  application: "Application",
  payment: "Payment",
  approval: "Approval",
  reminder: "Reminder",
  system: "System",
};

const NotificationRow = ({
  notification,
  onMarkRead,
  isLast,
}: {
  notification: AppNotification;
  onMarkRead: (id: string) => void;
  isLast: boolean;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onMarkRead(notification.id);
    if (notification.actionPath) navigate(notification.actionPath);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        px: 3,
        py: 2.2,
        cursor: "pointer",
        position: "relative",
        background: notification.read
          ? "transparent"
          : `${ColorPallete.primary.main}04`,
        borderBottom: isLast ? "none" : "1px solid #f7f7fc",
        transition: "background 0.15s",
        "&:hover": { background: "#f9f9fc" },
      }}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <Box
          sx={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: ColorPallete.primary.main,
          }}
        />
      )}

      <NotifyIcon type={notification.type} size={16} />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={2}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              mb={0.4}
              flexWrap="wrap"
            >
              <Typography
                sx={{
                  fontSize: "0.88rem",
                  fontWeight: notification.read ? 500 : 700,
                  color: "#0f0f1a",
                  lineHeight: 1.3,
                }}
              >
                {notification.title}
              </Typography>
              <Chip
                label={typeLabelMap[notification.type]}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  border: "none",
                  background: `${typeIconColor[notification.type]}18`,
                  color: typeIconColor[notification.type],
                }}
              />
              {!notification.read && (
                <Chip
                  label="New"
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    border: "none",
                    background: `${ColorPallete.primary.main}15`,
                    color: ColorPallete.primary.main,
                  }}
                />
              )}
            </Stack>
            <Typography
              sx={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.65 }}
            >
              {notification.body}
            </Typography>
          </Box>

          <Box sx={{ flexShrink: 0, textAlign: "right" }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "#bbb",
                mb: 0.8,
                whiteSpace: "nowrap",
              }}
            >
              {formatTimestamp(notification.timestamp)}
            </Typography>
            {!notification.read && (
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkRead(notification.id);
                }}
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  textTransform: "none",
                  color: "#aaa",
                  py: 0.2,
                  px: 0.8,
                  borderRadius: "6px",
                  minWidth: 0,
                  "&:hover": { background: "#f0f0f5", color: "#555" },
                }}
              >
                Mark read
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default NotificationRow;
