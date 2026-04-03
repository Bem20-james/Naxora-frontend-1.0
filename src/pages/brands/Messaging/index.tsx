import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  InputBase,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import { MOCK_CONVERSATIONS } from "./data";
import { ColorPallete } from "../../../config/colors";
import ConversationItem from "./ConversationItem";
import ChatWindow from "./ChatWindow";

const NoConversation = () => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 1.5,
      background: "#fafafa",
    }}
  >
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: "16px",
        background: `${ColorPallete.primary.main}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SendIcon
        sx={{
          fontSize: 24,
          color: ColorPallete.primary.main,
          transform: "rotate(-45deg)",
        }}
      />
    </Box>
    <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f0f1a" }}>
      Select a conversation
    </Typography>
    <Typography
      sx={{
        fontSize: "0.78rem",
        color: "#aaa",
        textAlign: "center",
        maxWidth: 240,
      }}
    >
      Choose a conversation from the list to start messaging.
    </Typography>
  </Box>
);

const ChatPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const activeConv = conversations.find((c) => c.id === activeId) ?? null;

  const filteredConvs = conversations.filter(
    (c) =>
      c.participantName.toLowerCase().includes(search.toLowerCase()) ||
      c.campaignTitle.toLowerCase().includes(search.toLowerCase()),
  );

  const selectConv = (id: string) => {
    setActiveId(id);
    // Mark unread as read
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              unread: 0,
              messages: c.messages.map((m) => ({ ...m, read: true })),
            }
          : c,
      ),
    );
  };

  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0);

  // On mobile: show list OR chat, not both
  const showList = isMobile ? !activeConv : true;
  const showChat = isMobile ? !!activeConv : true;

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
              Messages
            </Typography>
            {totalUnread > 0 && (
              <Box
                sx={{
                  background: ColorPallete.primary.main,
                  color: "#fff",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  height: 20,
                  minWidth: 20,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 0.7,
                }}
              >
                {totalUnread}
              </Box>
            )}
          </Stack>
          <Typography sx={{ fontSize: "0.82rem", color: "#aaa", mt: 0.4 }}>
            Campaign conversations with brands and creators.
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 220px)",
          minHeight: 500,
          background: "#fff",
          borderRadius: "14px",
          border: "1px solid #f0f0f5",
          overflow: "hidden",
        }}
      >
        {showList && (
          <Box
            sx={{
              width: { xs: "100%", sm: 300 },
              flexShrink: 0,
              borderRight: { sm: "1px solid #f0f0f5" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ px: 2, py: 2, borderBottom: "1px solid #f7f7fc" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  color: "#0f0f1a",
                  mb: 1.2,
                }}
              >
                Conversations
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  background: "#f7f7fc",
                  border: "1px solid #ebebf5",
                  borderRadius: "8px",
                  px: 1.2,
                  py: 0.6,
                  "&:focus-within": {
                    border: `1px solid ${ColorPallete.primary.main}`,
                    background: "#fff",
                  },
                }}
              >
                <SearchIcon sx={{ fontSize: 14, color: "#bbb" }} />
                <InputBase
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{
                    fontSize: "0.78rem",
                    flex: 1,
                    "& input::placeholder": { color: "#ccc" },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflowY: "auto" }}>
              {filteredConvs.length === 0 ? (
                <Box sx={{ py: 6, textAlign: "center" }}>
                  <Typography sx={{ fontSize: "0.8rem", color: "#aaa" }}>
                    No conversations found
                  </Typography>
                </Box>
              ) : (
                filteredConvs.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conv={conv}
                    isActive={conv.id === activeId}
                    onClick={() => selectConv(conv.id)}
                  />
                ))
              )}
            </Box>
          </Box>
        )}

        {showChat && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
            {activeConv ? (
              <ChatWindow conv={activeConv} onBack={() => setActiveId(null)} />
            ) : (
              <NoConversation />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
