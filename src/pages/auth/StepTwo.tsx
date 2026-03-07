import React, { useState } from "react";
import { Box, Stack, Typography, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ColorPallete } from "../../config/colors";
import { ROLE_CARDS } from "./data";

export type UserRole = "creator" | "brand";

export interface StepTwoProps {
  /** Fires with the chosen role. Parent should advance the step. */
  onSelect: (role: UserRole) => void;
  /** Re-hydrate selection if user navigates back */
  defaultValue?: UserRole | null;
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Card = styled(Box)<{ selected: boolean }>(({ selected }) => ({
  flex: 1,
  minWidth: 260,
  padding: "32px 28px",
  borderRadius: "18px",
  background: selected
    ? "linear-gradient(145deg, #2C2608 0%, #1E1B06 60%, #1A1900 100%)"
    : "#1C1C0E",
  border: `1.5px solid ${selected ? "rgba(245,197,24,0.55)" : "rgba(255,255,255,0.07)"}`,
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: selected
    ? "0 0 0 1px rgba(245,197,24,0.2), 0 12px 40px rgba(245,197,24,0.12)"
    : "0 2px 16px rgba(0,0,0,0.3)",
  "&:hover": {
    border: "1.5px solid rgba(245,197,24,0.4)",
    background: "linear-gradient(145deg, #252308 0%, #1C1A04 100%)",
    transform: "translateY(-3px)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,197,24,0.15)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: selected
      ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,197,24,0.08) 0%, transparent 70%)"
      : "none",
    pointerEvents: "none",
  },
}));

const IconBadge = styled(Box)<{ selected: boolean }>(({ selected }) => ({
  width: 48,
  height: 48,
  borderRadius: "14px",
  background: selected ? "rgba(245,197,24,0.18)" : "rgba(255,255,255,0.07)",
  border: `1px solid ${selected ? "rgba(245,197,24,0.3)" : "rgba(255,255,255,0.08)"}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
  transition: "all 0.3s ease",
  color: selected ? "#F5C518" : "rgba(255,255,255,0.5)",
}));

const CtaRow = styled(Box)<{ selected: boolean }>(({ selected }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "24px",
  color: selected ? "#F5C518" : "rgba(255,255,255,0.35)",
  transition: "all 0.25s ease",
  "& svg": { transition: "transform 0.25s ease" },
  "&:hover svg": { transform: "translateX(4px)" },
}));

const StepTwo: React.FC<StepTwoProps> = ({ onSelect, defaultValue = null }) => {
  const [hovered, setHovered] = useState<UserRole | null>(null);
  const [selected, setSelected] = useState<UserRole | null>(defaultValue);

  const handleSelect = (role: UserRole) => {
    setSelected(role);
    setTimeout(() => onSelect(role), 320);
  };

  const isActive = (role: UserRole) =>
    selected === role || (selected === null && hovered === role);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 3, md: 4 },
        animation: `${fadeUp} 0.45s ease both`,
      }}
    >
      <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
        <Typography
          sx={{
            fontSize: { xs: "22px", md: "26px" },
            fontWeight: 700,
            color: ColorPallete.primary.main,
            letterSpacing: "-0.4px",
            mb: "8px",
          }}
        >
          Let's get you started
        </Typography>
        <Typography
          sx={{ fontSize: "14px", color: ColorPallete.secondary.light }}
        >
          Choose the profile that best describes your goals on Nexora.
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", md: "row" }} gap={2} width="100%">
        {ROLE_CARDS.map((card) => (
          <Card
            key={card.role}
            selected={selected === card.role}
            onClick={() => handleSelect(card.role)}
            onMouseEnter={() => setHovered(card.role)}
            onMouseLeave={() => setHovered(null)}
          >
            {selected === card.role && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: "10%",
                  right: "10%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, #F5C518, transparent)",
                  opacity: 0.7,
                }}
              />
            )}

            <IconBadge selected={isActive(card.role)}>{card.icon}</IconBadge>

            <Typography
              sx={{
                fontSize: { xs: "17px", md: "19px" },
                fontWeight: 700,
                color: "#fff",
                mb: "10px",
              }}
            >
              {card.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "13.5px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
              }}
            >
              {card.description}
            </Typography>

            <CtaRow selected={isActive(card.role)}>
              <Typography
                sx={{ fontSize: "13.5px", fontWeight: 600, color: "inherit" }}
              >
                {card.cta}
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 15 }} />
            </CtaRow>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default StepTwo;
