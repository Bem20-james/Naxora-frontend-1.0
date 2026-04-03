import { Box } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AlarmIcon from "@mui/icons-material/Alarm";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { type NotificationType } from "./types";

export const typeIconColor: Record<NotificationType, string> = {
  campaign_invite: "#4ade80",
  application: "#60a5fa",
  payment: "#22c55e",
  approval: "#a78bfa",
  system: "#6366f1",
  reminder: "#f59e0b",
};

export const NotifyIcon = ({
  type,
  size = 16,
}: {
  type: NotificationType;
  size?: number;
}) => {
  const color = typeIconColor[type];
  const icons: Record<NotificationType, React.ReactNode> = {
    campaign_invite: <CampaignOutlinedIcon sx={{ fontSize: size }} />,
    application: <PersonOutlineIcon sx={{ fontSize: size }} />,
    payment: <AttachMoneyIcon sx={{ fontSize: size }} />,
    approval: <CheckCircleOutlineIcon sx={{ fontSize: size }} />,
    reminder: <AlarmIcon sx={{ fontSize: size }} />,
    system: <SettingsOutlinedIcon sx={{ fontSize: size }} />,
  };
  return (
    <Box
      sx={{
        width: size + 16,
        height: size + 16,
        borderRadius: "10px",
        background: `${color}18`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icons[type]}
    </Box>
  );
};
