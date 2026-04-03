import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { CampaignStatusChip } from "../../../components/dashboard/SharedUI";
import { MOCK_BRAND_CAMPAIGNS, MOCK_APPLICATIONS } from "./data";
import { ColorPallete } from "../../../config/colors";
import AnalyticsTab from "./AnalyticsTab";
import ApplicationsTab from "./ApplicationsTab";
import Overview from "./Overview";
import SettingsTab from "./SettingsTab";

const CampaignDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);

  const campaign =
    MOCK_BRAND_CAMPAIGNS.find((c) => c.id === id) ?? MOCK_BRAND_CAMPAIGNS[0];
  const applications = MOCK_APPLICATIONS.filter(
    (a) => a.campaignId === campaign.id,
  );

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
        <Stack direction="row" alignItems="center" gap={1.5}>
          <IconButton
            size="small"
            onClick={() => navigate("/dashboard/brand/campaigns")}
            sx={{
              background: "#f7f7fc",
              borderRadius: "8px",
              "&:hover": { background: "#ebebf5" },
            }}
          >
            <ArrowBackIcon fontSize="small" sx={{ color: "#555" }} />
          </IconButton>
          <Box>
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: "#0f0f1a",
                  letterSpacing: "-0.03em",
                }}
              >
                {campaign.title}
              </Typography>
              <CampaignStatusChip status={campaign.status} />
            </Stack>
            <Typography sx={{ fontSize: "0.8rem", color: "#aaa", mt: 0.3 }}>
              {new Date(campaign.startDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              →{" "}
              {new Date(campaign.endDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" gap={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={editing ? <SaveIcon /> : <EditIcon />}
            onClick={() => setEditing(!editing)}
            sx={{
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.8rem",
              textTransform: "none",
              color: ColorPallete.primary.main,
              borderColor: `${ColorPallete.primary.main}50`,
              "&:hover": { borderColor: ColorPallete.primary.main },
            }}
          >
            {editing ? "Save Changes" : "Edit Campaign"}
          </Button>
        </Stack>
      </Stack>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3,
          borderBottom: "1px solid #f0f0f5",
          minHeight: 44,
          "& .MuiTab-root": {
            fontSize: "0.82rem",
            fontWeight: 600,
            textTransform: "none",
            minHeight: 44,
            color: "#aaa",
          },
          "& .Mui-selected": { color: ColorPallete.primary.main },
          "& .MuiTabs-indicator": {
            background: ColorPallete.primary.main,
            height: 2,
          },
        }}
      >
        <Tab label="Overview" />
        <Tab label={`Applications (${applications.length})`} />
        <Tab label="Analytics" />
        <Tab label="Settings" />
      </Tabs>

      {tab === 0 && <Overview id={id} />}

      {tab === 1 && <ApplicationsTab id={id} />}

      {tab === 2 && <AnalyticsTab id={id} />}

      {tab === 3 && <SettingsTab id={id} />}
    </Box>
  );
};

export default CampaignDetailPage;
