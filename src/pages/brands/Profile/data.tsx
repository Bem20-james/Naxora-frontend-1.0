import type { BrandProfile } from "../../../components/dashboard/types";

export const MOCK_BRAND: BrandProfile = {
  id: "b1",
  companyName: "Lush Botanics",
  logo: "LB",
  logoColor: "#4ade80",
  industry: "Beauty & Skincare",
  website: "https://lushbotanics.com",
  email: "partnerships@lushbotanics.com",
  phone: "+234 801 234 5678",
  bio: "We create premium botanical skincare rooted in African heritage. Our mission is to connect with authentic voices that resonate with beauty-conscious consumers across Africa and the diaspora.",
  location: "Lagos, Nigeria",
  teamSize: "11–50",
  foundedYear: "2019",
  socialLinks: [
    { platform: "Instagram", handle: "@lushbotanics", url: "#" },
    { platform: "Twitter", handle: "@lushbotanics", url: "#" },
    { platform: "TikTok", handle: "@lushbotanics.official", url: "#" },
  ],
  joinedDate: "2025-10-01",
};
