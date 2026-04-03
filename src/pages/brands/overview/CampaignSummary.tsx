import { Box, Stack, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Card,
  CardHeader,
  CampaignStatusChip,
} from "../../../components/dashboard/SharedUI";
import { MOCK_BRAND_CAMPAIGNS } from "./mockData";
import { ColorPallete } from "../../../config/colors";
import { useNavigate } from "react-router-dom";

const CampaignSummary = () => {
  const navigate = useNavigate();
  const activeCampaigns = MOCK_BRAND_CAMPAIGNS.filter(
    (c) => c.status === "active",
  );

  return (
    <div>
      <Card>
        <CardHeader
          title="Active Campaigns"
          action={
            <Button
              size="small"
              variant="text"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
              onClick={() => navigate("/dashboard/brand/campaigns")}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: ColorPallete.primary.main,
                textTransform: "none",
              }}
            >
              View all
            </Button>
          }
        />
        {activeCampaigns.length === 0 ? (
          <Box sx={{ py: 5, textAlign: "center" }}>
            <Typography sx={{ fontSize: "0.82rem", color: "#aaa" }}>
              No active campaigns
            </Typography>
          </Box>
        ) : (
          activeCampaigns.map((c, i) => (
            <Box
              key={c.id}
              onClick={() => navigate(`/brand/campaigns/${c.id}`)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 3,
                py: 2,
                borderBottom:
                  i < activeCampaigns.length - 1 ? "1px solid #f7f7fc" : "none",
                cursor: "pointer",
                "&:hover": { background: "#fafafa" },
                transition: "background 0.15s",
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#0f0f1a",
                    mb: 0.3,
                  }}
                >
                  {c.title}
                </Typography>
                <Stack direction="row" gap={1.5}>
                  <Typography sx={{ fontSize: "0.7rem", color: "#aaa" }}>
                    {c.creatorsHired} creators · $
                    {c.budgetSpent.toLocaleString()} spent
                  </Typography>
                </Stack>
              </Box>
              <Stack
                direction="row"
                gap={1.5}
                alignItems="center"
                flexShrink={0}
              >
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontSize: "0.72rem", color: "#aaa" }}>
                    Impressions
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#0f0f1a",
                    }}
                  >
                    {(c.analytics.impressions / 1000).toFixed(0)}K
                  </Typography>
                </Box>
                <CampaignStatusChip status={c.status} />
              </Stack>
            </Box>
          ))
        )}
      </Card>
    </div>
  );
};

export default CampaignSummary;
