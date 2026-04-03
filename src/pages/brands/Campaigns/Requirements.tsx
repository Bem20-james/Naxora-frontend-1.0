import { Grid, Typography } from "@mui/material";
import { TagInput } from "../../../components/dashboard";
import { type CampaignForm } from "./types";

type TagField = keyof Pick<
  CampaignForm,
  "platforms" | "niches" | "deliverables" | "requirements"
>;

type AddTagFn = (field: TagField) => (value: string) => void;
type RemoveTagFn = (field: TagField) => (value: string) => void;

type RequirementsProps = {
  form: CampaignForm;
  addTag: AddTagFn;
  removeTag: RemoveTagFn;
};

const Requirements = ({ form, addTag, removeTag }: RequirementsProps) => {
  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12 }}>
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#0f0f1a",
            mb: 0.5,
          }}
        >
          Creator Requirements
        </Typography>

        <Typography sx={{ fontSize: "0.8rem", color: "#aaa", mb: 2.5 }}>
          Define who should apply. Be specific to attract the right creators.
        </Typography>

        <TagInput
          label="Requirements *"
          tags={form.requirements || []}
          onAdd={addTag("requirements")}
          onRemove={removeTag("requirements")}
        />

        <Typography sx={{ fontSize: "0.72rem", color: "#aaa", mt: 1 }}>
          Example: "Min. 10K followers", "Nigerian audience", "Skincare niche",
          "Engagement rate above 4%"
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Requirements;
