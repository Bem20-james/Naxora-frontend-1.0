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
  CircularProgress,
} from "@mui/material";
import { useFetchCountries } from "../../hooks/useGeneral";

export interface Country {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface StepOneProps {
  countryId: string;
  setSelectedCountry: (countryId: string) => void;
}

const StepOne: React.FC<StepOneProps> = ({ countryId, setSelectedCountry }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
  };

  const { data: countries = [], isLoading, error } = useFetchCountries();

  console.log("countries:", countries);

  return (
    <Box sx={{ width: "100%" }}>
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
          disabled={isLoading}
        >
          {isLoading ? (
            <MenuItem value="">
              <CircularProgress size={20} />
            </MenuItem>
          ) : error ? (
            <MenuItem value="">Failed to load countries</MenuItem>
          ) : (
            countries.map((country) => (
              <MenuItem key={country.id} value={String(country.id)}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    component="img"
                    src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                    sx={{
                      width: 24,
                      height: 16,
                      display: "inline-block",
                      backgroundColor: "#eee",
                      borderRadius: "2px",
                    }}
                  />
                  <Typography variant="body2">{country.name}</Typography>
                </Stack>
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default StepOne;
