import { Grid, Typography } from "@mui/material";
import { TagInput } from "../../../components/dashboard";
import { type CampaignForm } from "./types";

type TagField = keyof Pick<
  CampaignForm,
  "platforms" | "niches" | "deliverables" | "requirements"
>;

type AddTagFn = (field: TagField) => (value: string) => void;
type RemoveTagFn = (field: TagField) => (value: string) => void;

type Deliverables = {
  form: CampaignForm;
  addTag: AddTagFn;
  removeTag: RemoveTagFn;
};

const Deliverables = ({ form, addTag, removeTag }: Deliverables) => {
  return (
    <div>
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
            Content & Deliverables
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "#aaa", mb: 2.5 }}>
            Specify exactly what content you expect from each creator.
          </Typography>
          <TagInput
            label="Deliverables (one per line) *"
            tags={form.deliverables}
            onAdd={addTag("deliverables")}
            onRemove={removeTag("deliverables")}
          />
          <Typography sx={{ fontSize: "0.72rem", color: "#aaa", mt: 1 }}>
            Example: "2× Instagram Reels", "1× TikTok video (60s)", "3× Stories
            with swipe-up"
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Deliverables;
