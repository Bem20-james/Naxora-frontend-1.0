import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  StatCard,
  DataTable,
  FollowerTrend,
  CampaignInvite,
} from "../../../components/dashboard";
import {
  MarkEmailUnread,
  Paid,
  Campaign,
  ShowChart,
} from "@mui/icons-material";

const CreatorOverview = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 3 }} data-aos="fade-right">
            <StatCard
              title="Active Campaigns"
              value="12"
              trend={8.3}
              subValue="↑ 940 new this week"
              trendLabel="vs last week"
              icon={Campaign}
              color="blue"
              onClick={() => navigate("/users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} data-aos="fade-right">
            <StatCard
              title="Campaign Invites"
              value="10"
              trend={8.3}
              subValue="↑ 940 new this week"
              trendLabel="vs last week"
              icon={MarkEmailUnread}
              color="blue"
              onClick={() => navigate("/users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} data-aos="fade-right">
            <StatCard
              title="Total Earnings"
              value="4,250"
              trend={8.3}
              subValue="↑ 940 new this week"
              trendLabel="vs last week"
              icon={Paid}
              color="blue"
              onClick={() => navigate("/users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} data-aos="fade-right">
            <StatCard
              title="Engagement Rate"
              value="5.8"
              trend={8.3}
              subValue="↑ 940 new this week"
              trendLabel="vs last week"
              icon={ShowChart}
              color="blue"
              onClick={() => navigate("/users")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={5}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 6 }} data-aos="fade-right">
            <FollowerTrend />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} data-aos="fade-right">
            <CampaignInvite />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CreatorOverview;
