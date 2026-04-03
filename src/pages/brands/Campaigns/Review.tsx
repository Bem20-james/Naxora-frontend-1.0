import { Box, Stack, Typography, Chip } from "@mui/material";
import { type CampaignForm } from "./types";

type ReviewProps = {
  form: CampaignForm;
};

const Review = ({ form }: ReviewProps) => {
  return (
    <div>
      <Box>
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#0f0f1a",
            mb: 0.5,
          }}
        >
          Review & Launch
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "#aaa", mb: 3 }}>
          Confirm your campaign details before going live.
        </Typography>

        {[
          { label: "Title", value: form.title || "—" },
          {
            label: "Budget",
            value: form.budget
              ? `$${parseInt(form.budget).toLocaleString()}`
              : "—",
          },
          {
            label: "Duration",
            value:
              form.startDate && form.endDate
                ? `${form.startDate} → ${form.endDate}`
                : "—",
          },
        ].map((row) => (
          <Box
            key={row.label}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 1.5,
              borderBottom: "1px solid #f7f7fc",
            }}
          >
            <Typography sx={{ fontSize: "0.82rem", color: "#aaa" }}>
              {row.label}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#0f0f1a",
              }}
            >
              {row.value}
            </Typography>
          </Box>
        ))}

        {[
          { label: "Platforms", tags: form.platforms },
          { label: "Niches", tags: form.niches },
          { label: "Deliverables", tags: form.deliverables },
          { label: "Requirements", tags: form.requirements },
        ].map(({ label, tags }) => (
          <Box key={label} sx={{ py: 1.5, borderBottom: "1px solid #f7f7fc" }}>
            <Typography sx={{ fontSize: "0.72rem", color: "#aaa", mb: 0.7 }}>
              {label}
            </Typography>
            <Stack direction="row" gap={0.6} flexWrap="wrap">
              {tags.length > 0 ? (
                tags.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      background: "#f7f7fc",
                      color: "#555",
                      border: "none",
                    }}
                  />
                ))
              ) : (
                <Typography sx={{ fontSize: "0.78rem", color: "#ccc" }}>
                  Not set
                </Typography>
              )}
            </Stack>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Review;
