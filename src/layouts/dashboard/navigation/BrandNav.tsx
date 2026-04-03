import GridViewIcon from "@mui/icons-material/GridView";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import {
  Analytics,
  Campaign,
  ChatBubbleOutline,
  Inbox,
  Notifications,
  Settings,
  Storefront,
} from "@mui/icons-material";

export const BRAND_NAV = [
  {
    label: "Dashboard",
    path: "/dashboard/brand/overview",
    icon: GridViewIcon,
    children: [],
  },

  {
    label: "Campaigns",
    path: "/dashboard/brand/campaigns",
    icon: Campaign,
    children: [],
  },

  {
    label: "Analytics",
    path: "/dashboard/brand/analytics",
    icon: Analytics,
  },

  {
    label: "Marketplace",
    path: "/dashboard/brand/creators-marketplace",
    icon: Storefront,
    children: [],
  },

  {
    label: "Applications",
    path: "/dashboard/brand/applications",
    icon: Inbox,
  },

  {
    label: "Messaging",
    path: "/dashboard/brand/messages",
    icon: ChatBubbleOutline,
  },

  {
    label: "Subscriptions",
    path: "/dashboard/brand/subscriptions",
    icon: SubscriptionsIcon,
  },

  {
    label: "Transactions",
    path: "/dashboard/brand/transactions",
    icon: ReceiptLongIcon,
    children: [],
  },
  {
    label: "Notifications",
    path: "/dashboard/brand/notifications",
    icon: Notifications,
    children: [],
  },

  {
    label: "Settings",
    path: "/dashboard/brand/settings",
    icon: Settings,
    children: [],
  },
];
