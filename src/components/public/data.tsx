export const menuItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Pricing", path: "/pricing-and-plans" },
  { label: "Creators", path: "/discover-creators" },
  { label: "Contact Us", path: "/contact-us" },
];

export const footerLinks: { heading: string; links: string[] }[] = [
  {
    heading: "PRODUCT",
    links: ["Features", "Integrations", "Enterprise"],
  },
  {
    heading: "SUPPORT",
    links: ["Help Center", "Contact Us", "Security"],
  },
  {
    heading: "LEGAL",
    links: ["Privacy", "Terms", "Cookies"],
  },
];

interface FAQItem {
  category: string;
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    category: "Billing",
    q: "Can I switch plans later?",
    a: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features are available immediately and you're billed the pro-rated difference. When downgrading, the change takes effect at your next billing cycle.",
  },
  {
    category: "Billing",
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and regional mobile money solutions including M-Pesa, Flutterwave, and Paystack — ensuring creators across Africa can pay without friction.",
  },
  {
    category: "Billing",
    q: "Is there an annual discount?",
    a: "Yes — paying annually saves you 20% compared to monthly billing. You can toggle between monthly and annual on the checkout page. Existing subscribers can switch in their account settings.",
  },
  {
    category: "Platform",
    q: "What happens if I exceed my usage limit?",
    a: "We'll send you a heads-up at 80% and 100% of your limit. Your service won't be cut off — overages are billed at a flat rate per 1,000 additional requests, clearly itemized on your invoice.",
  },
  {
    category: "Platform",
    q: "How does the offline-first sync work?",
    a: "Our proprietary sync protocol caches work locally using IndexedDB and transmits compressed delta updates as soon as any connection — including 2G — is detected. Conflicts are resolved with a timestamp-based CRDT merge strategy, so you never lose data.",
  },
  {
    category: "Platform",
    q: "Which African countries are fully supported?",
    a: "We currently have full payment and infrastructure support in 24 countries including Nigeria, Kenya, South Africa, Ghana, and Egypt, with expansion to 16 more countries by Q3 this year. Check our coverage map for the latest status.",
  },
  {
    category: "Enterprise",
    q: "Do you offer custom contracts for Enterprise?",
    a: "Absolutely. Our Enterprise plans include custom MSAs, data processing agreements (DPAs), tailored SLAs, and invoicing in local currencies. Reach out to our sales team for a personalised quote.",
  },
  {
    category: "Enterprise",
    q: "What does white-labeling include?",
    a: "Enterprise customers can fully rebrand the platform — custom domain, logo, colour scheme, and email templates. Your clients will interact with a completely branded experience, with no Nexora branding visible.",
  },
];
