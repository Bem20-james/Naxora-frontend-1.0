import React, { useMemo } from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import { CustomInput } from "../../components/dashboard";

export interface StepThreeBrandProps {
  brand_name: string;
  contact_person: string;
  contact_person_number: string;
  email: string;
  username: string;
  /** Generic field setter — same signature as parent handleFormChange */
  setFormValues: (field: string, value: string | boolean) => void;
}

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PHONE_REGEX = /^\d{10,14}$/;

const StepThreeBrand: React.FC<StepThreeBrandProps> = ({
  brand_name,
  contact_person,
  contact_person_number,
  email,
  username,
  setFormValues,
}) => {
  const emailError = useMemo(
    () => email.length > 0 && !EMAIL_REGEX.test(email),
    [email],
  );

  const phoneError = useMemo(
    () =>
      contact_person_number.length > 0 &&
      !PHONE_REGEX.test(contact_person_number),
    [contact_person_number],
  );

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Stack direction={"column"} gap={2} mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Set up your brand
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "14px" }}>
          Tell us about your business so we can tailor your experience.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <CustomInput
            fullWidth
            label="Brand / Company Name"
            placeholder="e.g. ACME Corp"
            value={brand_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("brand_name", e.target.value)
            }
            endIcon={<BusinessIcon fontSize="small" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            fullWidth
            label="Contact Person"
            placeholder="e.g. Jane Doe"
            value={contact_person}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("contact_person", e.target.value)
            }
            endIcon={<PersonOutlineIcon fontSize="small" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            fullWidth
            type="tel"
            label="Contact Phone Number"
            placeholder="e.g. 08160774749"
            value={contact_person_number}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("contact_person_number", e.target.value)
            }
            error={phoneError}
            helperText={
              phoneError ? "Enter a valid phone number (10–14 digits)" : ""
            }
            endIcon={<PhoneOutlinedIcon fontSize="small" />}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CustomInput
            fullWidth
            label="Business Email"
            placeholder="hello@brand.com"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("email", e.target.value)
            }
            error={emailError}
            helperText={emailError ? "Enter a valid email address" : ""}
            endIcon={<EmailOutlinedIcon fontSize="small" />}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CustomInput
            fullWidth
            label="Username"
            placeholder="acme-corp"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues("username", e.target.value)
            }
            endIcon={<CardGiftcardOutlinedIcon fontSize="small" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepThreeBrand;
