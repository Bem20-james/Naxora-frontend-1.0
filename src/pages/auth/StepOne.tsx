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

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

export interface Country {
  id: string;
  name: string;
  flag: string;
}

export interface StepOneProps {
  countryId: string;
  setSelectedCountry: (countryId: string) => void;
}

/* ---------------------------------- */
/* Dummy Countries (Replace Later) */
/* ---------------------------------- */

const DUMMY_COUNTRIES: Country[] = [
  {
    id: "ng",
    name: "Nigeria",
    flag: "https://flagcdn.com/w40/ng.png",
  },
  {
    id: "us",
    name: "United States",
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    id: "gb",
    name: "United Kingdom",
    flag: "https://flagcdn.com/w40/gb.png",
  },
  {
    id: "ca",
    name: "Canada",
    flag: "https://flagcdn.com/w40/ca.png",
  },
];

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

const StepOne: React.FC<StepOneProps> = ({ countryId, setSelectedCountry }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "left",
          fontWeight: 700,
          py: 6,
        }}
      >
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
