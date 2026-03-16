import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import { StatCard } from "../../../components/dashboard";
import { PaidOutlined } from "@mui/icons-material";

const CreatorOverview = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 3 }} data-aos="fade-right">
            <StatCard
              title="Total Users"
              value="12,400"
              trend={8.3}
              subValue="↑ 940 new this week"
              trendLabel="vs last week"
              icon={PeopleIcon}
              color="blue"
              onClick={() => navigate("/users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} data-aos="fade-right">
            <StatCard
              title="Total Users"
              value="12,400"
              trend={8.3}
              subValue="↑ 940 new this week"
              trendLabel="vs last week"
              icon={PeopleIcon}
              color="blue"
              onClick={() => navigate("/users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} data-aos="fade-right">
            <StatCard
              title="Total Users"
              value="12,400"
              trend={8.3}
              subValue="↑ 940 new this week"
              trendLabel="vs last week"
              icon={PeopleIcon}
              color="blue"
              onClick={() => navigate("/users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} data-aos="fade-right">
            <StatCard
              title="Total Users"
              value="12,400"
              trend={8.3}
              subValue="↑ 940 new this week"
              trendLabel="vs last week"
              icon={PeopleIcon}
              color="blue"
              onClick={() => navigate("/users")}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CreatorOverview;
