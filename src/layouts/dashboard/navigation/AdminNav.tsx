import GridViewIcon from "@mui/icons-material/GridView";
import PeopleIcon from "@mui/icons-material/People";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import VerifiedIcon from "@mui/icons-material/Verified";
import BlockIcon from "@mui/icons-material/Block";
import BusinessIcon from "@mui/icons-material/Business";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GavelIcon from "@mui/icons-material/Gavel";
import BarChartIcon from "@mui/icons-material/BarChart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MemoryIcon from "@mui/icons-material/Memory";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const ADMIN_NAV = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: GridViewIcon,
    children: [],
  },

  {
    label: "Users",
    path: "/dashboard/admin/users",
    icon: PeopleIcon,
    children: [
      {
        label: "View All Users",
        path: "/dashboard/admin/users/all",
        icon: PersonSearchIcon,
      },
      {
        label: "Suspend Accounts",
        path: "/dashboard/admin/users/suspend",
        icon: BlockIcon,
      },
      {
        label: "Approve Verified Creators",
        path: "/dashboard/admin/users/verify",
        icon: VerifiedIcon,
      },
    ],
  },

  {
    label: "Creators",
    path: "/dashboard/admin/creators",
    icon: PersonSearchIcon,
    children: [],
  },

  {
    label: "Brands",
    path: "/dashboard/admin/brands",
    icon: BusinessIcon,
    children: [],
  },

  {
    label: "Transactions",
    path: "/dashboard/transactions",
    icon: ReceiptLongIcon,
    children: [],
  },

  {
    label: "Disputes",
    path: "/dashboard/admin/disputes",
    icon: GavelIcon,
    children: [
      {
        label: "Override Disputes",
        path: "/dashboard/admin/disputes/override",
        icon: GavelIcon,
      },
    ],
  },

  {
    label: "Revenue",
    path: "/dashboard/admin/revenue",
    icon: MonetizationOnIcon,
    children: [
      {
        label: "Revenue Metrics",
        path: "/dashboard/admin/revenue/metrics",
        icon: BarChartIcon,
      },
    ],
  },

  {
    label: "Subscriptions",
    path: "/dashboard/admin/subscriptions",
    icon: SubscriptionsIcon,
    children: [
      {
        label: "Manage Plans",
        path: "/dashboard/admin/subscriptions/plans",
        icon: SubscriptionsIcon,
      },
    ],
  },

  {
    label: "Tracking",
    path: "/dashboard/admin/tracking",
    icon: ManageSearchIcon,
    children: [
      {
        label: "Keyword Tracking Load",
        path: "/dashboard/admin/tracking/keywords",
        icon: ManageSearchIcon,
      },
      {
        label: "Tracking Job Status",
        path: "/dashboard/admin/tracking/jobs",
        icon: MemoryIcon,
      },
    ],
  },

  {
    label: "System",
    path: "/dashboard/admin/system",
    icon: MemoryIcon,
    children: [
      {
        label: "Analytics Engine Health",
        path: "/dashboard/admin/system/analytics",
        icon: BarChartIcon,
      },
      {
        label: "System Errors",
        path: "/dashboard/admin/system/errors",
        icon: ErrorOutlineIcon,
      },
    ],
  },
];
