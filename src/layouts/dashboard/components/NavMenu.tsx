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

const NavigationMenu = ({ open }: { open: boolean }) => {
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
              <Link
                to={item.path}
                style={{
                  textDecoration: "none",
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    my: 0.5,
                    mx: 1,
                    borderRadius: 2,
                    backgroundColor: isActive
                      ? ColorPallete.primary.main
                      : "#ffffff",
                    transform: isActive ? "scale(1.02)" : "none",
                    "&:hover": {
                      backgroundColor: ColorPallete.primary.disabled,
                      my: 1,
                      mx: 1,
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: isActive
                        ? ColorPallete.default.light
                        : ColorPallete.primary.light,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: isActive
                          ? ColorPallete.primary.default
                          : ColorPallete.primary.soft,
                        p: 1,
                        borderRadius: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {Icon && <Icon fontSize="small" />}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: ".8rem",
                        fontWeight: isActive ? "bold" : "normal",
                        color: isActive
                          ? ColorPallete.default.light
                          : ColorPallete.default.dark,
                        "&:hover": {
                          color: ColorPallete.default.dark,
                        },
                      },
                    }}
                    sx={{
                      opacity: open ? 1 : 0,
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
};

export default NavigationMenu;
