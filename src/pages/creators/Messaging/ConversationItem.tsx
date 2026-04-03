import { Box, Stack, Typography, Avatar, Badge } from "@mui/material";
import type { Conversation } from "./types";
import { formatChatTime } from "../../../utils/functions";
import { ColorPallete } from "../../../config/colors";

const ConversationItem = ({
  conv,
  isActive,
  onClick,
}: {
  conv: Conversation;
  isActive: boolean;
  onClick: () => void;
}) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      px: 2,
      py: 1.8,
      cursor: "pointer",
      background: isActive ? `${ColorPallete.primary.main}08` : "transparent",
      borderRight: isActive
        ? `3px solid ${ColorPallete.primary.main}`
        : "3px solid transparent",
      transition: "all 0.15s",
      "&:hover": { background: "#f7f7fc" },
    }}
  >
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        conv.unread > 0 ? (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: ColorPallete.primary.main,
              border: "2px solid #fff",
            }}
          />
        ) : null
      }
    >
      <Avatar
        sx={{
          width: 40,
          height: 40,
          background: `${conv.participantColor}22`,
          color: conv.participantColor,
          fontSize: "0.72rem",
          fontWeight: 700,
          border: `2px solid ${conv.participantColor}33`,
          flexShrink: 0,
        }}
      >
        {conv.participantAvatar}
      </Avatar>
    </Badge>

    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{
            fontSize: "0.85rem",
            fontWeight: conv.unread > 0 ? 700 : 600,
            color: "#0f0f1a",
            lineHeight: 1.2,
          }}
        >
          {conv.participantName}
        </Typography>
        <Typography sx={{ fontSize: "0.65rem", color: "#bbb", flexShrink: 0 }}>
          {formatChatTime(conv.lastMessageTime)}
        </Typography>
      </Stack>
      <Typography
        sx={{
          fontSize: "0.7rem",
          color: ColorPallete.primary.main,
          fontWeight: 500,
          mb: 0.2,
        }}
      >
        {conv.campaignTitle}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.72rem",
          color: conv.unread > 0 ? "#555" : "#aaa",
          fontWeight: conv.unread > 0 ? 600 : 400,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {conv.lastMessage}
      </Typography>
    </Box>

    {conv.unread > 0 && (
      <Box
        sx={{
          width: 18,
          height: 18,
          borderRadius: "9px",
          background: ColorPallete.primary.main,
          color: "#fff",
          fontSize: "0.6rem",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {conv.unread}
      </Box>
    )}
  </Box>
);

export default ConversationItem;
