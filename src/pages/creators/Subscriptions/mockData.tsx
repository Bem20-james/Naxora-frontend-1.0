import type { Plan, PaymentMethod } from "../../../components/dashboard/types";

export const MOCK_PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    billingCycle: "monthly",
    features: [
      "Up to 3 active campaigns",
      "Basic analytics",
      "Community support",
    ],
    isCurrent: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    billingCycle: "monthly",
    features: [
      "Unlimited campaigns",
      "Advanced analytics",
      "Priority support",
      "Early access to brands",
      "Custom media kit",
    ],
    isCurrent: true,
  },
  {
    id: "business",
    name: "Business",
    price: 79,
    billingCycle: "monthly",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Brand partnership deals",
      "White-label media kit",
      "API access",
    ],
    isCurrent: false,
  },
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm1",
    type: "card",
    label: "Visa",
    last4: "4242",
    expiry: "08/27",
    isDefault: true,
  },
  { id: "pm2", type: "bank", label: "GTBank", last4: "1234", isDefault: false },
];
