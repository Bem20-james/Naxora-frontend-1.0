import { Box, Typography, Avatar, Stack, Button, Chip } from "@mui/material";
import { ColorPallete } from "../../config/colors";

interface Campaign {
  id: number;
  brand: string;
  category: string;
  amount: string;
  avatar: string;
  color: string;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    brand: "Lush Botanics",
    category: "Beauty & Skincare",
    amount: "$1,200",
    avatar: "LB",
    color: "#4ade80",
  },
  {
    id: 2,
    brand: "NexTech Gear",
    category: "Electronics",
    amount: "$850",
    avatar: "NT",
    color: "#60a5fa",
  },
  {
    id: 3,
    brand: "FitFlow Apparel",
    category: "Health & Fitness",
    amount: "$2,400",
    avatar: "FF",
    color: "#f97316",
  },
];

const CampaignInvites = () => {
  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #f0f0f5",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f7f7fc",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#0f0f1a",
            letterSpacing: "-0.02em",
          }}
        >
          Active Projects
        </Typography>
        <Typography
          sx={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: ColorPallete.primary.main,
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
        >
          View all
        </Typography>
      </Box>

      {/* List */}
      <Box sx={{ px: 2, py: 1 }}>
        {campaigns.map((c, index) => (
          <Box
            key={c.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              py: 1.5,
              px: 1,
              borderRadius: "12px",
              transition: "background 0.15s",
              "&:hover": { background: "#f7f7fc" },
              borderBottom:
                index < campaigns.length - 1 ? "1px solid #f7f7fc" : "none",
            }}
          >
            {/* Avatar */}
            <Avatar
              sx={{
                width: 42,
                height: 42,
                background: `${c.color}20`,
                color: c.color,
                fontSize: "0.72rem",
                fontWeight: 700,
                border: `2px solid ${c.color}30`,
                flexShrink: 0,
              }}
            >
              {c.avatar}
            </Avatar>

            {/* Brand Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#0f0f1a",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {c.brand}
              </Typography>
              <Typography
                sx={{ fontSize: "0.72rem", color: "#aaa", lineHeight: 1.3 }}
              >
                {c.category}
              </Typography>
            </Box>

            {/* Amount */}
            <Chip
              label={c.amount}
              size="small"
              sx={{
                height: 22,
                fontSize: "0.72rem",
                fontWeight: 700,
                background: `${ColorPallete.primary.main}12`,
                color: ColorPallete.primary.main,
                border: "none",
                flexShrink: 0,
              }}
            />

            {/* Actions */}
            <Stack direction="row" gap={0.7} flexShrink={0}>
              <Button
                size="small"
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: "8px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  py: 0.4,
                  px: 1.5,
                  minWidth: 0,
                  background: ColorPallete.primary.main,
                  textTransform: "none",
                  "&:hover": {
                    opacity: 0.9,
                    background: ColorPallete.primary.main,
                  },
                }}
              >
                View
              </Button>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CampaignInvites;
