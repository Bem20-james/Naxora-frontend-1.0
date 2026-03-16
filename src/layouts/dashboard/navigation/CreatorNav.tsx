import GridViewIcon from "@mui/icons-material/GridView";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GavelIcon from "@mui/icons-material/Gavel";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MemoryIcon from "@mui/icons-material/Memory";

export const CREATOR_NAV = [
  {
    label: "Dashboard",
    path: "/dashboard/creator/overview",
    icon: GridViewIcon,
    children: [],
  },

  {
    label: "Campaigns",
    path: "/dashboard/creator/campaigns",
    icon: ReceiptLongIcon,
    children: [],
  },

  {
    label: "Projects",
    path: "/dashboard/creator/projects",
    icon: GavelIcon,
    children: [],
  },

  {
    label: "Transactions",
    path: "/dashboard/creator/transactions",
    icon: MonetizationOnIcon,
    children: [],
  },

  {
    label: "Subscriptions & Billing",
    path: "/dashboard/creator/subscriptions",
    icon: SubscriptionsIcon,
    children: [],
  },

  {
    label: "Profile",
    path: "/dashboard/creator/tracking",
    icon: ManageSearchIcon,
    children: [],
  },

  {
    label: "Settings",
    path: "/dashboard/creator/system",
    icon: MemoryIcon,
    children: [],
  },
];
