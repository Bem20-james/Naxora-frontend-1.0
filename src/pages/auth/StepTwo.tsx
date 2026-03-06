import React, { useState } from "react";
import { Box, Stack, Typography, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ColorPallete } from "../../config/colors";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type UserRole = "creator" | "brand";

export interface StepTwoProps {
  /** Called when the user confirms a role selection */
  onSelect: (role: UserRole) => void;
  /** Pre-selected value (e.g. from parent state) */
  defaultValue?: UserRole | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD DATA
// ─────────────────────────────────────────────────────────────────────────────

interface RoleCard {
  role: UserRole;
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
}

const ROLE_CARDS: RoleCard[] = [
  {
    role: "creator",
    icon: <MovieFilterIcon sx={{ fontSize: 22 }} />,
    title: "I am a Creator",
    description:
      "I want to grow my audience, monetize my content, and collaborate with leading brands.",
    cta: "Select Creator",
  },
  {
    role: "brand",
    icon: <StorefrontIcon sx={{ fontSize: 22 }} />,
    title: "I am a Brand",
    description:
      "I want to discover authentic African talent and launch high-impact marketing campaigns.",
    cta: "Select Brand",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// STYLED
// ─────────────────────────────────────────────────────────────────────────────

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
  "& svg": {
    transition: "transform 0.25s ease",
  },
  "&:hover svg": {
    transform: "translateX(4px)",
  },
}));

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const StepTwo: React.FC<StepTwoProps> = ({ onSelect, defaultValue = null }) => {
  const [hovered, setHovered] = useState<UserRole | null>(null);
  const [selected, setSelected] = useState<UserRole | null>(defaultValue);

  const handleSelect = (role: UserRole) => {
    setSelected(role);
    // Small delay so the selected state is visible before advancing
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
        px: { xs: 3, sm: 5, md: 7 },
        py: { xs: 3, md: 5 },
        animation: `${fadeUp} 0.45s ease both`,
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 2 },
          animation: `${fadeUp} 0.45s ease 0.05s both`,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "24px", md: "30px" },
            fontWeight: 700,
            color: ColorPallete.primary.main,
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
            mb: "10px",
          }}
        >
          Let's get you started
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "12px", md: "14.5px" },
            color: ColorPallete.secondary.light,
            fontWeight: 400,
          }}
        >
          Choose the profile that best describes your goals on Nexora.
        </Typography>
      </Box>

      {/* ── Cards ──────────────────────────────────────────────────────── */}
      <Stack direction={{ xs: "column", md: "row" }} gap={2}>
        {ROLE_CARDS.map((card, i) => (
          <Card
            key={card.role}
            selected={selected === card.role}
            onClick={() => handleSelect(card.role)}
            onMouseEnter={() => setHovered(card.role)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Selected glow top-edge */}
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
                color: "#FFFFFF",
                letterSpacing: "-0.3px",
                mb: "10px",
                lineHeight: 1.2,
              }}
            >
              {card.title}
            </Typography>

            <Typography
              sx={{
                fontSize: "13.5px",
                color: "rgba(255,255,255,0.45)",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              {card.description}
            </Typography>

            <CtaRow selected={isActive(card.role)}>
              <Typography
                sx={{
                  fontSize: "13.5px",
                  fontWeight: 600,
                  color: "inherit",
                  letterSpacing: "0.1px",
                }}
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
