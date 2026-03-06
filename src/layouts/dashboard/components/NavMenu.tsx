import { useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ColorPallete } from "../../../config/colors";
import { getNav } from "../../../utils/getNav";
import { MOCK_USER } from "../../../utils/mockUser";

function NavigationMenu() {
  const location = useLocation();

  // temporary mock authentication
  const user = MOCK_USER;

  const navItems = getNav({ role: user?.role });

  return (
    <Box>
      <List>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          const Icon = item.icon;

          return (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link to={item.path} style={{ textDecoration: "none" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    my: 0.5,
                    mx: 1,
                    borderRadius: 2,
                    backgroundColor: isActive
                      ? ColorPallete.primary.main + "20"
                      : "transparent",
                    transform: isActive ? "scale(1.02)" : "none",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: ColorPallete.primary.main + "15",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 2,
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: isActive
                          ? ColorPallete.primary.main + "25"
                          : "transparent",
                        p: 1,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {Icon && <Icon fontSize="small" />}
                    </Box>
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "0.85rem",
                        fontWeight: isActive ? 600 : 400,
                        color: isActive
                          ? ColorPallete.primary.main
                          : ColorPallete.default.dark,
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default NavigationMenu;
