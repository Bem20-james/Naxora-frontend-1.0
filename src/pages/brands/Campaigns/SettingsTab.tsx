import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Card, CardHeader } from "../../../components/dashboard/SharedUI";
import { ColorPallete } from "../../../config/colors";
import { MOCK_BRAND_CAMPAIGNS } from "./data";

const SettingsTab = ({ id }: { id: any }) => {
  const campaign =
    MOCK_BRAND_CAMPAIGNS.find((c) => c.id === id) ?? MOCK_BRAND_CAMPAIGNS[0];

  return (
    <div>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardHeader title="Edit Campaign" />
            <Box sx={{ p: 3 }}>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      mb: 0.7,
                    }}
                  >
                    Campaign Title
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    defaultValue={campaign.title}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        "& fieldset": { borderColor: "#f0f0f5" },
                        "&:hover fieldset": {
                          borderColor: `${ColorPallete.primary.main}50`,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: ColorPallete.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      mb: 0.7,
                    }}
                  >
                    Description
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    defaultValue={campaign.description}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        "& fieldset": { borderColor: "#f0f0f5" },
                        "&.Mui-focused fieldset": {
                          borderColor: ColorPallete.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      mb: 0.7,
                    }}
                  >
                    Budget ($)
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    defaultValue={campaign.budget}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        "& fieldset": { borderColor: "#f0f0f5" },
                        "&.Mui-focused fieldset": {
                          borderColor: ColorPallete.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      mb: 0.7,
                    }}
                  >
                    Status
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    defaultValue={campaign.status}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        "& fieldset": { borderColor: "#f0f0f5" },
                        "&.Mui-focused fieldset": {
                          borderColor: ColorPallete.primary.main,
                        },
                      },
                    }}
                  >
                    {["draft", "active", "paused", "completed"].map((s) => (
                      <MenuItem key={s} value={s} sx={{ fontSize: "0.82rem" }}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      mb: 0.7,
                    }}
                  >
                    Start Date
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    defaultValue={campaign.startDate}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        "& fieldset": { borderColor: "#f0f0f5" },
                        "&.Mui-focused fieldset": {
                          borderColor: ColorPallete.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      mb: 0.7,
                    }}
                  >
                    End Date
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    defaultValue={campaign.endDate}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        "& fieldset": { borderColor: "#f0f0f5" },
                        "&.Mui-focused fieldset": {
                          borderColor: ColorPallete.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      borderRadius: "10px",
                      fontWeight: 700,
                      textTransform: "none",
                      py: 1,
                      px: 3,
                      background: ColorPallete.primary.main,
                      "&:hover": {
                        opacity: 0.9,
                        background: ColorPallete.primary.main,
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingsTab;
