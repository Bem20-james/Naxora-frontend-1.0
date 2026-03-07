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

export type Gender = "Male" | "Female" | "Other" | "";

export interface StepThreeProps {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  referral: string;
  /**
   * Generic field setter — matches the parent's handleFormChange signature
   * so you can pass it directly:
   *   setFormValues={(field, value) => handleFormChange(field, value)}
   */
  setFormValues: (field: string, value: string) => void;
}

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PHONE_REGEX = /^\d{10}$/;

const StepThree: React.FC<StepThreeProps> = ({
  firstname,
  lastname,
  email,
  phoneNumber,
  gender,
  referral,
  setFormValues,
}) => {
  const emailError = useMemo(
    () => email.length > 0 && !EMAIL_REGEX.test(email),
    [email],
  );

  const phoneError = useMemo(
    () => phoneNumber.length > 0 && !PHONE_REGEX.test(phoneNumber),
    [phoneNumber],
  );

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setFormValues("gender", event.target.value);
  };

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, py: 3, mb: 1 }}>
        Set up your account
      </Typography>

      <Grid container spacing={3}>
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

        <Grid size={{ xs: 12 }}>
          <CustomInput
            fullWidth
            label="Phone Number (10 digits)"
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
              <MenuItem value="" disabled>
                Select Gender
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

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
