import { type StatCardColor } from "./StatsCard";

interface ColorTokens {
  bg: string;
  border: string;
  icon: string;
  ghost: string;
}

export const COLOR_MAP: Record<StatCardColor, ColorTokens> = {
  blue: { bg: "#EFF6FF", border: "#DBEAFE", icon: "#3B82F6", ghost: "#3B82F6" },
  green: {
    bg: "#F0FDF4",
    border: "#DCFCE7",
    icon: "#22C55E",
    ghost: "#22C55E",
  },
  purple: {
    bg: "#FAF5FF",
    border: "#F3E8FF",
    icon: "#A855F7",
    ghost: "#A855F7",
  },
  orange: {
    bg: "#FFF7ED",
    border: "#FED7AA",
    icon: "#F97316",
    ghost: "#F97316",
  },
  red: { bg: "#FFF1F2", border: "#FFE4E6", icon: "#EF4444", ghost: "#EF4444" },
  teal: { bg: "#F0FDFA", border: "#CCFBF1", icon: "#14B8A6", ghost: "#14B8A6" },
  gold: { bg: "#FFFBEB", border: "#FDE68A", icon: "#D97706", ghost: "#D97706" },
};
