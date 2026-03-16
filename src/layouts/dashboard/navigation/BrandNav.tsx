import GridViewIcon from "@mui/icons-material/GridView";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BarChartIcon from "@mui/icons-material/BarChart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MemoryIcon from "@mui/icons-material/Memory";

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
    icon: GridViewIcon,
    children: [],
  },

  {
    label: "Marketplace",
    path: "/dashboard/brand/marketplace",
    icon: ReceiptLongIcon,
    children: [],
  },

  {
    label: "Revenue",
    path: "/dashboard/brand/revenue",
    icon: MonetizationOnIcon,
    children: [
      {
        label: "Revenue Metrics",
        path: "/dashboard/brand/revenue/metrics",
        icon: BarChartIcon,
      },
    ],
  },

  {
    label: "Subscriptions",
    path: "/dashboard/brand/subscriptions",
    icon: SubscriptionsIcon,
    children: [
      {
        label: "Manage Plans",
        path: "/dashboard/brand/billings",
        icon: SubscriptionsIcon,
      },
    ],
  },

  {
    label: "Tracking",
    path: "/dashboard/brand/tracking",
    icon: ManageSearchIcon,
    children: [
      {
        label: "Keyword Tracking Load",
        path: "/dashboard/brand/tracking/keywords",
        icon: ManageSearchIcon,
      },
      {
        label: "Tracking Job Status",
        path: "/dashboard/brand/tracking/jobs",
        icon: MemoryIcon,
      },
    ],
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
    icon: ReceiptLongIcon,
    children: [],
  },

  {
    label: "Settings",
    path: "/dashboard/brand/settings",
    icon: MemoryIcon,
    children: [],
  },
];
