import { type UserRole } from "./StepTwo";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import StorefrontIcon from "@mui/icons-material/Storefront";

interface RoleCard {
  role: UserRole;
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
}

export const ROLE_CARDS: RoleCard[] = [
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
