import { Box, Typography } from "@mui/material";
import type { ChatMessage } from "./types";
import { formatMessageTime } from "../../../utils/functions";
import { ColorPallete } from "../../../config/colors";

const TextBubble = ({ msg, isMe }: { msg: ChatMessage; isMe: boolean }) => (
  <Box sx={{ maxWidth: "72%", alignSelf: isMe ? "flex-end" : "flex-start" }}>
    <Box
      sx={{
        px: 2,
        py: 1.2,
        background: isMe ? ColorPallete.primary.main : "#f4f4f8",
        borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.85rem",
          color: isMe ? "#fff" : "#0f0f1a",
          lineHeight: 1.55,
        }}
      >
        {msg.content}
      </Typography>
    </Box>
    <Typography
      sx={{
        fontSize: "0.62rem",
        color: "#bbb",
        mt: 0.4,
        textAlign: isMe ? "right" : "left",
      }}
    >
      {formatMessageTime(msg.timestamp)}
    </Typography>
  </Box>
);

export default TextBubble;
