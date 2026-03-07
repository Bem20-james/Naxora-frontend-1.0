import React from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Stack,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
} from "@mui/material";
import { DUMMY_COUNTRIES } from "./data";

export interface Country {
  id: string;
  name: string;
  flag: string;
}

export interface StepOneProps {
  /** The currently selected country ID (controlled from parent) */
  countryId: string;
  /** Fires whenever the user picks a new country */
  setSelectedCountry: (countryId: string) => void;
}

const StepOne: React.FC<StepOneProps> = ({ countryId, setSelectedCountry }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, py: 4 }}>
        What country do you live in?
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="country-select-label">Select country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={countryId}
          onChange={handleChange}
          label="Select country"
        >
          {DUMMY_COUNTRIES.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  component="img"
                  src={country.flag}
                  alt={`${country.name} flag`}
                  sx={{
                    width: 24,
                    height: 16,
                    objectFit: "cover",
                    borderRadius: "2px",
                  }}
                />
                <Typography variant="body2">{country.name}</Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default StepOne;
