import { Box, Typography, Button } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import type { ChatMessage } from "./types";
import { formatMessageTime } from "../../../utils/functions";
import { ColorPallete } from "../../../config/colors";

const BriefBubble = ({
  msg,
  isMe,
  campaignTitle,
}: {
  msg: ChatMessage;
  isMe: boolean;
  campaignTitle: string;
}) => (
  <Box sx={{ maxWidth: "75%", alignSelf: isMe ? "flex-end" : "flex-start" }}>
    <Box
      sx={{
        background: "#fff",
        border: `1px solid ${ColorPallete.primary.main}30`,
        borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          background: `${ColorPallete.primary.main}08`,
          borderBottom: `1px solid ${ColorPallete.primary.main}20`,
          display: "flex",
          alignItems: "center",
          gap: 1.2,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            background: `${ColorPallete.primary.main}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DescriptionOutlinedIcon
            sx={{ fontSize: 16, color: ColorPallete.primary.main }}
          />
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f0f1a" }}
          >
            Campaign Brief
          </Typography>
          <Typography sx={{ fontSize: "0.62rem", color: "#aaa" }}>
            {campaignTitle}
          </Typography>
        </Box>
      </Box>

      {/* Brief body */}
      <Box sx={{ px: 2, py: 1.5, maxHeight: 200, overflowY: "auto" }}>
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "#555",
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          {msg.content}
        </Typography>
      </Box>

      <Box
        sx={{
          px: 2,
          py: 1,
          borderTop: `1px solid ${ColorPallete.primary.main}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "0.62rem", color: "#bbb" }}>
          {formatMessageTime(msg.timestamp)}
        </Typography>
        <Button
          size="small"
          startIcon={<DownloadIcon sx={{ fontSize: "13px !important" }} />}
          onClick={() => {
            const blob = new Blob([msg.content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${campaignTitle.replace(/\s/g, "_")}_Brief.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          sx={{
            fontSize: "0.65rem",
            fontWeight: 700,
            textTransform: "none",
            color: ColorPallete.primary.main,
            py: 0.2,
            px: 0.8,
            borderRadius: "6px",
            "&:hover": { background: `${ColorPallete.primary.main}10` },
          }}
        >
          Download Brief
        </Button>
      </Box>
    </Box>
  </Box>
);

export default BriefBubble;
