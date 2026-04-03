import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getNav } from "../../../utils/getNav";
import { ColorPallete } from "../../../config/colors";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useSelector } from "react-redux";
import { type RootState } from "../../../store";

export const DRAWER_WIDTH_OPEN = 248;
export const DRAWER_WIDTH_CLOSED = 72;

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
    overflowX: "hidden",
    background: "#ffffff",
    borderRight: "1px solid #f0f0f5",
    boxShadow: "4px 0 24px rgba(0,0,0,0.04)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const SideNav = ({ open }: { open: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);
  const navItems = getNav({ role: user?.role });

  console.log("Auth User:", user);

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Box
        sx={{
          px: 2,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          cursor: "pointer",
          minHeight: 70,
          overflow: "hidden",
        }}
        onClick={() => navigate("/")}
      >
        {!open && (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: `linear-gradient(135deg, ${ColorPallete.primary.main} 0%, ${ColorPallete.secondary?.main || "#6366f1"} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: `0 4px 12px ${ColorPallete.primary.main}40`,
            }}
          >
            <Box
              component="img"
              src="/logo/logo-icon.png"
              sx={{ width: 22, height: 22, objectFit: "contain" }}
              onError={(e: any) => {
                e.target.style.display = "none";
              }}
            />
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "14px",
                display: "none",
                "&.show": { display: "block" },
              }}
              className={open ? "" : "show"}
            >
              N
            </Typography>
          </Box>
        )}

        {open && (
          <Box
            component="img"
            src="/logo/logo2.png"
            sx={{ height: 45, objectFit: "contain" }}
            onError={(e: any) => {
              e.target.style.display = "none";
              (e.target.nextSibling as HTMLElement).style.display = "block";
            }}
          />
        )}
        {open && (
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "18px",
              color: "#0f0f1a",
              letterSpacing: "-0.5px",
              display: "none",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            Nexora
          </Typography>
        )}
      </Box>

      <Divider sx={{ mx: 2, borderColor: "#f0f0f5" }} />

      <Box sx={{ flex: 1, py: 1.5, overflowY: "auto", overflowX: "hidden" }}>
        <List disablePadding>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <ListItem key={index} disablePadding sx={{ px: 1.5, py: 0.3 }}>
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <ListItemButton
                    sx={{
                      borderRadius: "10px",
                      minHeight: 44,
                      px: open ? 1.5 : 1,
                      justifyContent: open ? "flex-start" : "center",
                      backgroundColor: isActive
                        ? ColorPallete.primary.main
                        : "transparent",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.2s ease",
                      "&::before": isActive
                        ? {}
                        : {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            borderRadius: "10px",
                            background: `${ColorPallete.primary.main}10`,
                            opacity: 0,
                            transition: "opacity 0.2s",
                          },
                      "&:hover": {
                        backgroundColor: isActive
                          ? ColorPallete.primary.main
                          : `${ColorPallete.primary.main}10`,
                        "&::before": { opacity: 1 },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1.5 : 0,
                        justifyContent: "center",
                        color: isActive ? "#fff" : ColorPallete.primary.main,
                      }}
                    >
                      {Icon && <Icon fontSize="small" />}
                    </ListItemIcon>

                    {open && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: "0.85rem",
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? "#fff" : "#3d3d5c",
                            letterSpacing: "0.01em",
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ mx: 2, borderColor: "#f0f0f5" }} />

      {open && (
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${ColorPallete.primary.main}15 0%, ${ColorPallete.secondary?.main || "#6366f1"}15 100%)`,
              border: `1px solid ${ColorPallete.primary.main}25`,
              p: 2,
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <RocketLaunchIcon
                sx={{
                  fontSize: 14,
                  color: ColorPallete.primary.main,
                  flexShrink: 0,
                }}
              />
              <Chip
                label="PRO PLAN"
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  backgroundColor: ColorPallete.primary.main,
                  color: "#fff",
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "#555",
                mb: 1.5,
                lineHeight: 1.4,
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              3 days left on your trial. Unlock full access.
            </Typography>
            <Box
              component="button"
              sx={{
                width: "100%",
                py: 0.8,
                border: "none",
                borderRadius: "8px",
                background: ColorPallete.primary.main,
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "all 0.2s",
                "&:hover": { opacity: 0.9, transform: "translateY(-1px)" },
              }}
            >
              Upgrade Now
            </Box>
          </Box>
        </Box>
      )}
    </StyledDrawer>
  );
};

export default SideNav;
