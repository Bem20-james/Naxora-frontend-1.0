import type { CreatorProfile } from "../../../components/dashboard/types";

export const MOCK_PROFILE: CreatorProfile = {
  id: "u1",
  firstName: "Temitope",
  lastName: "Adeyemi",
  email: "temitope@nexora.io",
  phone: "+234 803 456 7890",
  bio: "Lifestyle & beauty creator based in Lagos. I create authentic content that connects brands with real Nigerian audiences.",
  avatar: "TA",
  location: "Lagos, Nigeria",
  niche: ["Lifestyle", "Beauty", "Fitness"],
  socialLinks: [
    {
      platform: "Instagram",
      handle: "@temi.creates",
      url: "#",
      followers: 24500,
    },
    {
      platform: "TikTok",
      handle: "@temitope.adeyemi",
      url: "#",
      followers: 18200,
    },
    { platform: "YouTube", handle: "Temi Creates", url: "#", followers: 9300 },
  ],
  joinedDate: "2025-09-01",
};
