import { ADMIN_NAV } from "../layouts/dashboard/navigation/AdminNav";
import { BRAND_NAV } from "../layouts/dashboard/navigation/BrandNav";
import { CREATOR_NAV } from "../layouts/dashboard/navigation/CreatorNav";
import { ROLES } from "../config/constants";

export const getNav = ({ role }: { role: any }) => {
  if (!role) return [];
  console.log("Getting nav for role:", role);

  if (role === ROLES.ADMIN) {
    return ADMIN_NAV;
  }

  if (role === ROLES.CREATORS) return CREATOR_NAV;
  if (role === ROLES.BRANDS) return BRAND_NAV;

  return [];
};
