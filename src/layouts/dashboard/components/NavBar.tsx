import {
  Box,
  Stack,
  Typography,
  Avatar,
  IconButton,
  InputBase,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState, useRef } from "react";
import { ColorPallete } from "../../../config/colors";
import { DRAWER_WIDTH_OPEN, DRAWER_WIDTH_CLOSED } from "./SideNav";
import { MOCK_NOTIFICATIONS } from "../data";
import ProfileDropdown from "./ProfileDropdown";
import NotificationsDropdown from "./NotificationsDropdown";

interface NavBarProps {
  open: boolean;
  toggleDrawer: () => void;
  mobileToggle?: () => void;
}

const NavBar = ({ open, toggleDrawer, mobileToggle }: NavBarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Single outside-click handler for both dropdowns
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openNotif = () => {
    setNotifOpen(true);
    setProfileOpen(false);
  };
  const openProfile = () => {
    setProfileOpen(true);
    setNotifOpen(false);
  };

  const handleMarkAllRead = () =>
    setNotifications((p) => p.map((n) => ({ ...n, read: true })));

  const handleMarkRead = (id: string) =>
    setNotifications((p) =>
      p.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const drawerOffset = open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED;

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 1100,
        left: { xs: 0, sm: `${drawerOffset}px` },
        transition:
          "left 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
        height: 70,
        display: "flex",
        alignItems: "center",
        px: { xs: 2, md: 3 },
        justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.85)" : "#ffffff",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "1px solid #f0f0f5",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <Stack direction="row" alignItems="center" gap={1.5}>
        <IconButton
          onClick={mobileToggle}
          sx={{
            display: { xs: "flex", sm: "none" },
            color: "#3d3d5c",
            "&:hover": { background: `${ColorPallete.primary.main}12` },
          }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          onClick={toggleDrawer}
          sx={{
            display: { xs: "none", sm: "flex" },
            color: "#3d3d5c",
            borderRadius: "10px",
            "&:hover": { background: `${ColorPallete.primary.main}12` },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Typography
            sx={{
              fontSize: "0.72rem",
              color: "#aaa",
              lineHeight: 1,
              mb: 0.2,
              letterSpacing: "0.03em",
            }}
          >
            Good morning 👋
          </Typography>
          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#0f0f1a",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back, Temitope
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" alignItems="center" gap={1.5}>
        {/* Search — desktop */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1,
            background: "#f7f7fc",
            border: "1px solid #ebebf5",
            borderRadius: "10px",
            px: 1.5,
            py: 0.7,
            width: 220,
            transition: "all 0.2s",
            "&:focus-within": {
              border: `1px solid ${ColorPallete.primary.main}`,
              background: "#fff",
              boxShadow: `0 0 0 3px ${ColorPallete.primary.main}15`,
            },
          }}
        >
          <SearchIcon sx={{ fontSize: 17, color: "#aaa" }} />
          <InputBase
            placeholder="Search campaigns..."
            sx={{
              fontSize: "0.82rem",
              color: "#3d3d5c",
              "& input": { p: 0 },
              "& input::placeholder": { color: "#bbb" },
            }}
          />
        </Box>

        {/* Search — mobile */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" }, color: "#3d3d5c" }}
        >
          <SearchIcon />
        </IconButton>

        {/* ── Notifications ── */}
        <Box ref={notifRef} sx={{ position: "relative" }}>
          <IconButton
            onClick={() => (notifOpen ? setNotifOpen(false) : openNotif())}
            sx={{
              color: "#3d3d5c",
              background: notifOpen
                ? `${ColorPallete.primary.main}12`
                : "#f7f7fc",
              borderRadius: "10px",
              width: 38,
              height: 38,
              "&:hover": { background: `${ColorPallete.primary.main}12` },
            }}
          >
            <Badge
              badgeContent={unreadCount}
              sx={{
                "& .MuiBadge-badge": {
                  background: ColorPallete.primary.main,
                  color: "#fff",
                  fontSize: "0.58rem",
                  height: 16,
                  minWidth: 16,
                },
              }}
            >
              <NotificationsNoneIcon fontSize="small" />
            </Badge>
          </IconButton>

          <NotificationsDropdown
            open={notifOpen}
            onClose={() => setNotifOpen(false)}
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onMarkRead={handleMarkRead}
          />
        </Box>

        {/* ── Profile ── */}
        <Box ref={profileRef} sx={{ position: "relative" }}>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            onClick={() =>
              profileOpen ? setProfileOpen(false) : openProfile()
            }
            sx={{
              cursor: "pointer",
              pl: 0.5,
              pr: 1,
              py: 0.5,
              borderRadius: "10px",
              border: profileOpen
                ? `1px solid ${ColorPallete.primary.main}40`
                : "1px solid #ebebf5",
              background: profileOpen ? "#fff" : "#f7f7fc",
              transition: "all 0.2s",
              "&:hover": {
                border: `1px solid ${ColorPallete.primary.main}40`,
                background: "#fff",
              },
            }}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                background: `linear-gradient(135deg, ${ColorPallete.primary.main} 0%, ${ColorPallete.secondary?.main || "#6366f1"} 100%)`,
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              T
            </Avatar>
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#0f0f1a",
              }}
            >
              Temitope
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 16,
                color: "#aaa",
                display: { xs: "none", sm: "block" },
                transition: "transform 0.2s",
                transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Stack>

          <ProfileDropdown
            open={profileOpen}
            onClose={() => setProfileOpen(false)}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default NavBar;
