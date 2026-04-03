import { useState, useRef, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  InputBase,
  IconButton,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { Conversation, ChatMessage } from "./types";
import { ColorPallete } from "../../../config/colors";
import TextBubble from "./TextBubble";
import BriefBubble from "./BriefBubble";

// ─── The current user mock ────────────────────────────────────────────
const ME = {
  id: "me",
  name: "Temitope",
  avatar: "TA",
  color: ColorPallete.primary.main,
};

const DateSeparator = ({ label }: { label: string }) => (
  <Stack direction="row" alignItems="center" gap={1.5} sx={{ my: 1.5 }}>
    <Box sx={{ flex: 1, height: 1, background: "#f0f0f5" }} />
    <Typography
      sx={{
        fontSize: "0.65rem",
        fontWeight: 600,
        color: "#ccc",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Typography>
    <Box sx={{ flex: 1, height: 1, background: "#f0f0f5" }} />
  </Stack>
);

const groupByDate = (
  messages: ChatMessage[],
): Array<{ label: string; messages: ChatMessage[] }> => {
  const groups: Record<string, ChatMessage[]> = {};
  messages.forEach((msg) => {
    const d = new Date(msg.timestamp);
    const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
    const key =
      diff === 0
        ? "Today"
        : diff === 1
          ? "Yesterday"
          : d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
    if (!groups[key]) groups[key] = [];
    groups[key].push(msg);
  });
  return Object.entries(groups).map(([label, messages]) => ({
    label,
    messages,
  }));
};

const ChatWindow = ({
  conv,
  onBack,
}: {
  conv: Conversation;
  onBack: () => void;
}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(conv.messages);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, conv.id]);

  // Reset messages when conversation switches
  useEffect(() => {
    setMessages(conv.messages);
    setText("");
  }, [conv.id, conv.messages]);

  const send = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: ME.id,
      content: trimmed,
      type: "text",
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages((p) => [...p, newMsg]);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const grouped = groupByDate(messages);
  const other = conv.participantName;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#fafafa",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          background: "#fff",
          borderBottom: "1px solid #f0f0f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <IconButton
            size="small"
            onClick={onBack}
            sx={{ display: { sm: "none" }, color: "#555", borderRadius: "8px" }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              background: `${conv.participantColor}22`,
              color: conv.participantColor,
              fontSize: "0.72rem",
              fontWeight: 700,
              border: `2px solid ${conv.participantColor}33`,
            }}
          >
            {conv.participantAvatar}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#0f0f1a",
                lineHeight: 1.2,
              }}
            >
              {other}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.68rem",
                color: ColorPallete.primary.main,
                fontWeight: 500,
              }}
            >
              {conv.campaignTitle}
            </Typography>
          </Box>
        </Stack>
        <Tooltip title="Campaign Info">
          <IconButton
            size="small"
            sx={{
              color: "#aaa",
              borderRadius: "8px",
              "&:hover": { background: "#f7f7fc" },
            }}
          >
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          py: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {grouped.map(({ label, messages: msgs }) => (
          <Box key={label}>
            <DateSeparator label={label} />
            <Stack gap={0.8}>
              {msgs.map((msg) => {
                const isMe = msg.senderId === ME.id;
                return msg.type === "brief" ? (
                  <BriefBubble
                    key={msg.id}
                    msg={msg}
                    isMe={isMe}
                    campaignTitle={conv.campaignTitle}
                  />
                ) : (
                  <TextBubble key={msg.id} msg={msg} isMe={isMe} />
                );
              })}
            </Stack>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          px: 3,
          py: 2,
          background: "#fff",
          borderTop: "1px solid #f0f0f5",
        }}
      >
        <Stack direction="row" alignItems="flex-end" gap={1.5}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              background: "#f7f7fc",
              border: "1px solid #ebebf5",
              borderRadius: "12px",
              px: 2,
              py: 1,
              minHeight: 44,
              transition: "all 0.2s",
              "&:focus-within": {
                border: `1px solid ${ColorPallete.primary.main}`,
                background: "#fff",
                boxShadow: `0 0 0 3px ${ColorPallete.primary.main}12`,
              },
            }}
          >
            <InputBase
              multiline
              maxRows={4}
              fullWidth
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                fontSize: "0.87rem",
                color: "#0f0f1a",
                "& textarea::placeholder": { color: "#bbb" },
              }}
            />
          </Box>
          <IconButton
            onClick={send}
            disabled={!text.trim()}
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              background: text.trim() ? ColorPallete.primary.main : "#f0f0f5",
              color: text.trim() ? "#fff" : "#ccc",
              transition: "all 0.2s",
              "&:hover": {
                background: text.trim() ? ColorPallete.primary.main : "#f0f0f5",
                opacity: 0.9,
              },
              "&:disabled": { background: "#f0f0f5", color: "#ccc" },
            }}
          >
            <SendIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
        <Typography
          sx={{
            fontSize: "0.62rem",
            color: "#ccc",
            mt: 0.8,
            textAlign: "center",
          }}
        >
          Press Enter to send · Shift+Enter for new line
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatWindow;
