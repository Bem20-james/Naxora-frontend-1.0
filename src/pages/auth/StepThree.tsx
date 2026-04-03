import React, { useMemo } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { CustomInput } from "../../components/dashboard";

export interface StepThreeProps {
  name: string;
  username: string;
  email: string;
  /**
   * Generic field setter — matches the parent's handleFormChange signature
   * so you can pass it directly:
   *   setFormValues={(field, value) => handleFormChange(field, value)}
   */
  setFormValues: (field: string, value: string) => void;
}

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const StepThree: React.FC<StepThreeProps> = ({
  name,
  username,
  email,

  setFormValues,
}) => {
  const emailError = useMemo(
    () => email.length > 0 && !EMAIL_REGEX.test(email),
    [email],
  );

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, py: 3, mb: 1 }}>
        Set up your account
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 12 }}>
          <CustomInput
            fullWidth
            label="Legal Fullname"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("name", e.target.value)
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <CustomInput
            fullWidth
            label="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("username", e.target.value)
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
      </Grid>
    </Box>
  );
};

export default StepThree;
