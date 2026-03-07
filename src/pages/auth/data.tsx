import { type Country } from "./StepOne";
import { type UserRole } from "./StepTwo";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import StorefrontIcon from "@mui/icons-material/Storefront";

export const DUMMY_COUNTRIES: Country[] = [
  { id: "ng", name: "Nigeria", flag: "https://flagcdn.com/w40/ng.png" },
  { id: "gh", name: "Ghana", flag: "https://flagcdn.com/w40/gh.png" },
  { id: "ke", name: "Kenya", flag: "https://flagcdn.com/w40/ke.png" },
  { id: "za", name: "South Africa", flag: "https://flagcdn.com/w40/za.png" },
  { id: "us", name: "United States", flag: "https://flagcdn.com/w40/us.png" },
  { id: "gb", name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
  { id: "ca", name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
];


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