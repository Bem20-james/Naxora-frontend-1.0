import {
  Box,
  Stack,
  Typography,
  Divider,
  Paper,
  Fade,
  Button,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useNavigate } from "react-router-dom";
import { ColorPallete } from "../../../config/colors";
import { formatTimestamp } from "../../../utils/functions";
import { NotifyIcon } from "../../../components/dashboard";
import { type AppNotification } from "../../../components/dashboard/types";

interface NotifDropdownProps {
  open: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onMarkRead: (id: string) => void;
}

const NotificationsDropdown = ({
  open,
  onClose,
  notifications,
  onMarkAllRead,
  onMarkRead,
}: NotifDropdownProps) => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const preview = notifications.slice(0, 5);

  const handleClick = (n: AppNotification) => {
    onMarkRead(n.id);
    onClose();
    if (n.actionPath) navigate(n.actionPath);
  };

  if (!open) return null;

  return (
    <Fade in={open} timeout={160}>
      <Paper
        elevation={0}
        sx={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          width: 340,
          borderRadius: "14px",
          border: "1px solid #f0f0f5",
          boxShadow: "0 12px 40px rgba(0,0,0,0.11)",
          overflow: "hidden",
          zIndex: 1300,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography
              sx={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f0f1a" }}
            >
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Box
                sx={{
                  background: ColorPallete.primary.main,
                  color: "#fff",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  height: 18,
                  minWidth: 18,
                  borderRadius: "9px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 0.6,
                }}
              >
                {unreadCount}
              </Box>
            )}
          </Stack>
          {unreadCount > 0 && (
            <Button
              size="small"
              startIcon={<DoneAllIcon sx={{ fontSize: "14px !important" }} />}
              onClick={onMarkAllRead}
              sx={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "none",
                color: ColorPallete.primary.main,
                py: 0.3,
                px: 1,
                borderRadius: "8px",
                "&:hover": { background: `${ColorPallete.primary.main}10` },
              }}
            >
              Mark all read
            </Button>
          )}
        </Box>

        <Divider sx={{ borderColor: "#f0f0f5" }} />

        {/* List */}
        <Box sx={{ maxHeight: 340, overflowY: "auto" }}>
          {preview.length === 0 ? (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <InfoOutlinedIcon sx={{ fontSize: 28, color: "#ddd", mb: 1 }} />
              <Typography sx={{ fontSize: "0.82rem", color: "#aaa" }}>
                You're all caught up!
              </Typography>
            </Box>
          ) : (
            preview.map((n, i) => (
              <Box
                key={n.id}
                onClick={() => handleClick(n)}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  px: 2.5,
                  py: 1.6,
                  cursor: "pointer",
                  position: "relative",
                  background: n.read
                    ? "transparent"
                    : `${ColorPallete.primary.main}05`,
                  borderBottom:
                    i < preview.length - 1 ? "1px solid #f7f7fc" : "none",
                  transition: "background 0.15s",
                  "&:hover": { background: "#f7f7fc" },
                }}
              >
                {/* Unread dot */}
                {!n.read && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: ColorPallete.primary.main,
                      flexShrink: 0,
                    }}
                  />
                )}

                <NotifyIcon type={n.type} />

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: n.read ? 500 : 700,
                        color: "#0f0f1a",
                        lineHeight: 1.3,
                      }}
                    >
                      {n.title}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "0.65rem", color: "#bbb", flexShrink: 0 }}
                    >
                      {formatTimestamp(n.timestamp)}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: "0.73rem",
                      color: "#888",
                      lineHeight: 1.5,
                      mt: 0.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {n.body}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>

        <Divider sx={{ borderColor: "#f0f0f5" }} />

        <Box
          onClick={() => {
            onClose();
            navigate("/dashboard/brand/notifications");
          }}
          sx={{
            px: 2.5,
            py: 1.5,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s",
            "&:hover": { background: "#f7f7fc" },
          }}
        >
          <Typography
            sx={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: ColorPallete.primary.main,
            }}
          >
            View all notifications
          </Typography>
        </Box>
      </Paper>
    </Fade>
  );
};

export default NotificationsDropdown;
