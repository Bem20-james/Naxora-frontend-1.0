import { useState } from "react";
import { Box, Stack, Button, TextField, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ColorPallete } from "../../config/colors";
import { FieldLabel } from "./FieldLabel";
import { inputSx } from "../../styles";

const TagInput = ({
  label,
  tags,
  onAdd,
  onRemove,
  options,
}: {
  label: string;
  tags: string[];
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
  options?: string[];
}) => {
  const [val, setVal] = useState("");
  const add = (v: string) => {
    if (v.trim() && !tags.includes(v.trim())) {
      onAdd(v.trim());
      setVal("");
    }
  };

  return (
    <Box>
      <FieldLabel>{label}</FieldLabel>
      {options && (
        <Stack direction="row" gap={0.7} flexWrap="wrap" mb={1.5}>
          {options.map((o) => (
            <Chip
              key={o}
              label={o}
              size="small"
              onClick={() => add(o)}
              variant={tags.includes(o) ? "filled" : "outlined"}
              sx={{
                height: 26,
                fontSize: "0.73rem",
                fontWeight: 600,
                cursor: "pointer",
                borderRadius: "8px",
                ...(tags.includes(o)
                  ? {
                      background: ColorPallete.primary.main,
                      color: "#fff",
                      border: "none",
                    }
                  : {
                      background: "transparent",
                      color: "#666",
                      borderColor: "#e5e5f0",
                    }),
              }}
            />
          ))}
        </Stack>
      )}
      {!options && (
        <Stack direction="row" gap={1} mb={1}>
          <TextField
            size="small"
            fullWidth
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Type and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add(val);
              }
            }}
            sx={inputSx}
          />
          <Button
            variant="outlined"
            onClick={() => add(val)}
            sx={{
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              borderColor: `${ColorPallete.primary.main}50`,
              color: ColorPallete.primary.main,
            }}
          >
            Add
          </Button>
        </Stack>
      )}
      <Stack direction="row" gap={0.7} flexWrap="wrap">
        {tags.map((t) => (
          <Chip
            key={t}
            label={t}
            size="small"
            onDelete={() => onRemove(t)}
            deleteIcon={<CloseIcon sx={{ fontSize: "12px !important" }} />}
            sx={{
              height: 24,
              fontSize: "0.72rem",
              fontWeight: 600,
              background: `${ColorPallete.primary.main}12`,
              color: ColorPallete.primary.main,
              border: "none",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TagInput;
