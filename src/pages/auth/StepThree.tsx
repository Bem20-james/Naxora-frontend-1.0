import React, { useMemo } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  type SelectChangeEvent,
} from "@mui/material";
import { CustomInput } from "../../components/dashboard";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

export type Gender = "Male" | "Female" | "Other" | "";

export interface StepTwoProps {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  referral: string;
  setFormValues: (
    field: keyof Omit<StepTwoProps, "setFormValues">,
    value: string,
  ) => void;
}

/* ---------------------------------- */
/* Validation Helpers */
/* ---------------------------------- */

const emailRegex = /\S+@\S+\.\S+/;
const phoneRegex = /^\d{10}$/;

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

const StepThree: React.FC<StepTwoProps> = ({
  firstname,
  lastname,
  email,
  phoneNumber,
  gender,
  referral,
  setFormValues,
}) => {
  /* -------- Derived Validation State (No extra useState) -------- */

  const emailError = useMemo(
    () => emailRegex.test(email) && !emailRegex.test(email),
    [email],
  );

  const phoneError = useMemo(
    () => phoneRegex.test(phoneNumber) && !phoneRegex.test(phoneNumber),
    [phoneNumber],
  );

  /* -------- Handlers -------- */

  const handleGenderChange = (event: SelectChangeEvent) => {
    setFormValues("gender", event.target.value as Gender);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography
        variant="h5"
        sx={{ textAlign: "left", fontWeight: 700, py: 2, mb: 3 }}
      >
        Set up your account
      </Typography>

      <Grid container spacing={4}>
        {/* Firstname */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            fullWidth
            label="Legal Firstname"
            value={firstname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("firstname", e.target.value)
            }
          />
        </Grid>

        {/* Lastname */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            fullWidth
            label="Legal Surname"
            value={lastname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("lastname", e.target.value)
            }
          />
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12 }}>
          <CustomInput
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("email", e.target.value)
            }
            error={emailError}
            helperText={emailError ? "Please enter a valid email address" : ""}
          />
        </Grid>

        {/* Phone */}
        <Grid size={{ xs: 12 }}>
          <CustomInput
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("phoneNumber", e.target.value)
            }
            error={phoneError}
            helperText={
              phoneError ? "Please enter a valid 10-digit phone number" : ""
            }
          />
        </Grid>

        {/* Gender */}
        <Grid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel id="gender-select-label">Select Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={gender}
              label="Select Gender"
              onChange={handleGenderChange}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Referral */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Referral Code (Optional)"
            value={referral}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("referral", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepThree;
