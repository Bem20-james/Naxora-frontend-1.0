interface PlanFeature {
  label: string;
}

interface Plan {
  id: string;
  tier: string;
  price: string;
  period: string;
  tagline: string;
  cta: string;
  popular: boolean;
  features: PlanFeature[];
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    tier: "STARTER",
    price: "$0",
    period: "/mo",
    tagline: "Perfect for individuals and small side projects.",
    cta: "Start for Free",
    popular: false,
    features: [
      { label: "5 Active Projects" },
      { label: "Community Support" },
      { label: "Standard API Access" },
      { label: "Basic Regional Analytics" },
    ],
  },
  {
    id: "growth",
    tier: "GROWTH",
    price: "$49",
    period: "/mo",
    tagline: "Scale your business with advanced tools and insights.",
    cta: "Get Started",
    popular: true,
    features: [
      { label: "Unlimited Projects" },
      { label: "Priority 24/7 Support" },
      { label: "Savanna Gold Regional SEO" },
      { label: "Advanced Team Collaboration" },
      { label: "Automated Reporting" },
    ],
  },
  {
    id: "enterprise",
    tier: "ENTERPRISE",
    price: "$199",
    period: "/mo",
    tagline: "Complete control for large-scale organisations.",
    cta: "Contact Sales",
    popular: false,
    features: [
      { label: "Custom SSO & Security" },
      { label: "Dedicated Account Manager" },
      { label: "Custom SLA & Uptime" },
      { label: "Full White-labeling" },
    ],
  },
];

interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  growth: string | boolean;
  enterprise: string | boolean;
  highlight?: "enterprise" | "growth";
}

export const COMPARISON: ComparisonRow[] = [
  {
    feature: "Monthly Usage",
    starter: "10,000 requests",
    growth: "500,000 requests",
    enterprise: "Unlimited",
    highlight: "enterprise",
  },
  {
    feature: "Team Members",
    starter: "1 user",
    growth: "Up to 10 users",
    enterprise: "Unlimited users",
    highlight: "enterprise",
  },
  {
    feature: "Custom Domains",
    starter: "1",
    growth: "5",
    enterprise: "Unlimited",
    highlight: "enterprise",
  },
  {
    feature: "Support Level",
    starter: "Email only",
    growth: "24/7 Chat",
    enterprise: "Dedicated Phone/Slack",
  },
  { feature: "API Access", starter: true, growth: true, enterprise: true },
  {
    feature: "White-labeling",
    starter: false,
    growth: false,
    enterprise: true,
  },
];
