import { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  IconButton,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Card } from "../../../components/dashboard/SharedUI";
import { ColorPallete } from "../../../config/colors";
import { STEPS, NICHE_OPTIONS, PLATFORM_OPTIONS } from "./data";
import Review from "./Review";
import Deliverables from "./Deliverables";
import Requirements from "./Requirements";
import {
  FieldLabel,
  CustomInput,
  TagInput,
} from "../../../components/dashboard";
import { inputSx } from "../../../styles";

const CreateCampaignPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    title: "",
    description: "",
    brief: "",
    budget: "",
    startDate: "",
    endDate: "",
    platforms: [] as string[],
    niches: [] as string[],
    deliverables: [] as string[],
    requirements: [] as string[],
  });

  const set = (key: keyof typeof form, value: any) =>
    setForm((p) => ({ ...p, [key]: value }));
  const addTag =
    (key: "platforms" | "niches" | "deliverables" | "requirements") =>
    (v: string) =>
      set(key, [...(form[key] as string[]), v]);
  const removeTag =
    (key: "platforms" | "niches" | "deliverables" | "requirements") =>
    (v: string) =>
      set(
        key,
        (form[key] as string[]).filter((t) => t !== v),
      );

  const stepValid = [
    form.title.length > 0 && form.budget.length > 0,
    form.deliverables.length > 0,
    form.requirements.length > 0,
    true,
  ];

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
        <IconButton
          size="small"
          onClick={() => navigate("/brand/campaigns")}
          sx={{ background: "#f7f7fc", borderRadius: "8px" }}
        >
          <ArrowBackIcon fontSize="small" sx={{ color: "#555" }} />
        </IconButton>
        <Box>
          <Typography
            sx={{
              fontSize: "1.3rem",
              fontWeight: 800,
              color: "#0f0f1a",
              letterSpacing: "-0.03em",
            }}
          >
            Create Campaign
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "#aaa" }}>
            Fill in the details to launch your campaign
          </Typography>
        </Box>
      </Stack>

      {/* Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={step} alternativeLabel>
          {STEPS.map((label, i) => (
            <Step key={label} completed={i < step}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: i <= step ? "#0f0f1a" : "#aaa",
                  },
                  "& .MuiStepIcon-root": {
                    color:
                      i < step
                        ? ColorPallete.primary.main
                        : i === step
                          ? ColorPallete.primary.main
                          : "#e5e5f0",
                  },
                  "& .MuiStepIcon-root.Mui-active": {
                    color: ColorPallete.primary.main,
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: ColorPallete.primary.main,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Step content */}
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <Box sx={{ p: 3 }}>
              {/* Step 0: Basics */}
              {step === 0 && (
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12 }}>
                    <FieldLabel>Campaign Title *</FieldLabel>

                    <CustomInput
                      fullWidth
                      label="Email"
                      type="email"
                      value={form.title}
                      placeholder="e.g. Spring Glow Collection Launch"
                      onChange={(e) => set("title", e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FieldLabel>Short Description *</FieldLabel>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      size="small"
                      placeholder="A brief overview of what this campaign is about..."
                      value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FieldLabel>Full Creative Brief</FieldLabel>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      size="small"
                      placeholder="Describe the tone, style, what you want creators to communicate, what to avoid..."
                      value={form.brief}
                      onChange={(e) => set("brief", e.target.value)}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FieldLabel>Budget ($) *</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="0"
                      value={form.budget}
                      onChange={(e) => set("budget", e.target.value)}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FieldLabel>Start Date</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      value={form.startDate}
                      onChange={(e) => set("startDate", e.target.value)}
                      sx={inputSx}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FieldLabel>End Date</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      value={form.endDate}
                      onChange={(e) => set("endDate", e.target.value)}
                      sx={inputSx}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TagInput
                      label="Platforms *"
                      tags={form.platforms}
                      onAdd={addTag("platforms")}
                      onRemove={removeTag("platforms")}
                      options={PLATFORM_OPTIONS}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TagInput
                      label="Target Niches"
                      tags={form.niches}
                      onAdd={addTag("niches")}
                      onRemove={removeTag("niches")}
                      options={NICHE_OPTIONS}
                    />
                  </Grid>
                </Grid>
              )}

              {step === 1 && (
                <Deliverables
                  form={form}
                  addTag={addTag}
                  removeTag={removeTag}
                />
              )}

              {step === 2 && (
                <Requirements
                  form={form}
                  addTag={addTag}
                  removeTag={removeTag}
                />
              )}

              {step === 3 && <Review form={form} />}
            </Box>

            {/* Footer navigation */}
            <Box
              sx={{
                px: 3,
                py: 2,
                borderTop: "1px solid #f7f7fc",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                onClick={() =>
                  step === 0 ? navigate("/brand/campaigns") : setStep(step - 1)
                }
                sx={{
                  borderRadius: "10px",
                  fontWeight: 600,
                  textTransform: "none",
                  color: "#aaa",
                  borderColor: "#e5e5f0",
                  "&:hover": { borderColor: "#ccc" },
                }}
              >
                {step === 0 ? "Cancel" : "Back"}
              </Button>
              <Button
                variant="contained"
                disableElevation
                disabled={!stepValid[step]}
                endIcon={step < 3 ? <ArrowForwardIcon /> : <CheckCircleIcon />}
                onClick={() =>
                  step < 3 ? setStep(step + 1) : navigate("/brand/campaigns")
                }
                sx={{
                  borderRadius: "10px",
                  fontWeight: 700,
                  textTransform: "none",
                  background: ColorPallete.primary.main,
                  "&:hover": {
                    opacity: 0.9,
                    background: ColorPallete.primary.main,
                  },
                  "&:disabled": { background: "#f0f0f5", color: "#bbb" },
                }}
              >
                {step < 3 ? "Continue" : "Launch Campaign"}
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateCampaignPage;
