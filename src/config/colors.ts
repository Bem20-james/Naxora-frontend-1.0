export const ColorPallete = {
  primary: {
    main: "#5054D6",
    light: "#2E3094",
    default: "#3F42B5",
    soft: "#7D87FF",
    disabled: "#BFC4FF",
  },
  secondary: {
    default: "#090E1A",
    light: "#060912",
    main: "#03050A",
    soft: "#455469",
    disabled: "#93A0B0",
  },
  error: {
    main: "#7F1D1D",
    light: "#991B1B",
    default: "#B91C1C",
    soft: "#F87171",
    disabled: "#FECACA",
  },
  warning: {
    main: "#713F12",
    light: "#854D0E",
    default: "#A16207",
    soft: "#FBBF24",
    disabled: "#FDE68A",
  },
  accent: {
    main: "#00594D",
    light: "#008271",
    default: "#00A992",
    soft: "#38B2AC",
    disabled: "#81E6D9",
  },
  success: {
    main: "#14532D",
    light: "#166534",
    default: "#15803D",
    soft: "#32D583",
    disabled: "#A6F4C5",
  },
  default: {
    light: "#FFFFFF",
    dark: "#000000",
    secondary: "#94A3B8",
  },
};

export const COLORS = {
  background: "#0B0E14",
  accent: "#EAB308",
  textSecondary: "#94A3B8",
  glow: "rgba(234, 179, 8, 0.15)",
  gold: "#D9A520",
  goldGlow: "rgba(217,165,32,0.35)",
  goldFaint: "rgba(217,165,32,0.10)",
  goldBorder: "rgba(217,165,32,0.20)",
  bgDark: "#0F0E1C",
  bgCard: "rgba(30,27,75,0.20)",
  bgCardHover: "rgba(30,27,75,0.45)",
  borderMuted: "rgba(49,46,129,0.55)",
  indigoMuted: "#1E1B4B",
  textPrimary: "#F1F5F9",
  textMuted: "#64748B",
  // Shared sx helpers
  section: {
    px: { xs: 3, md: 10 },
    py: { xs: 8, md: 14 },
    bgcolor: "#0F0E1C",
  },
} as const;
