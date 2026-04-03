import GridViewIcon from "@mui/icons-material/GridView";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import {
  AttachMoney,
  Campaign,
  ChatBubbleOutline,
  Folder,
  Person,
  Settings,
} from "@mui/icons-material";

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
    icon: Campaign,
    children: [],
  },

  {
    label: "Projects",
    path: "/dashboard/creator/projects",
    icon: Folder,
    children: [],
  },

  {
    label: "Messaging",
    path: "/dashboard/creator/messages",
    icon: ChatBubbleOutline,
    children: [],
  },

  {
    label: "Transactions",
    path: "/dashboard/creator/transactions",
    icon: AttachMoney,
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
    path: "/dashboard/creator/profile",
    icon: Person,
    children: [],
  },

  {
    label: "Settings",
    path: "/dashboard/creator/settings",
    icon: Settings,
    children: [],
  },
];
