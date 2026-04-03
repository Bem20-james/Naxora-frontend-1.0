import type { Plan, PaymentMethod } from "../../../components/dashboard/types";

export const MOCK_BRAND_PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    features: [
      "3 active campaigns",
      "Up to 10 applications/campaign",
      "Basic analytics",
      "Creator search",
    ],
    isCurrent: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: 79,
    features: [
      "Unlimited campaigns",
      "Unlimited applications",
      "Advanced analytics",
      "Creator discovery",
      "Priority support",
      "Campaign brief templates",
    ],
    isCurrent: true,
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom contracts",
      "White-label reports",
      "API access",
      "Team seats (up to 10)",
    ],
    isCurrent: false,
  },
];

export const MOCK_BRAND_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm1",
    type: "card",
    label: "Mastercard",
    last4: "5678",
    expiry: "11/28",
    isDefault: true,
  },
  {
    id: "pm2",
    type: "bank",
    label: "Zenith Bank",
    last4: "9012",
    isDefault: false,
  },
];
