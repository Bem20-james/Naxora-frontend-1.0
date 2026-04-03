import { Box, Typography, Divider, Paper, Fade } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useAuth";

interface ProfileDropdownProps {
  open: boolean;
  onClose: () => void;
}

const ProfileDropdown = ({ open, onClose }: ProfileDropdownProps) => {
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending } = useLogout();

  const handleAction = (action: "profile" | "logout") => {
    onClose();
    if (action === "profile") navigate("/dashboard/brand/profile");
    if (action === "logout") {
      logoutUser();
      console.log("logout");
    }
  };

  if (!open) return null;

  return (
    <Fade in={open} timeout={160}>
      <Paper
        elevation={0}
        sx={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          width: 200,
          borderRadius: "12px",
          border: "1px solid #f0f0f5",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          overflow: "hidden",
          zIndex: 1300,
        }}
      >
        <Box sx={{ px: 2, py: 1.8 }}>
          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#0f0f1a",
              lineHeight: 1.2,
            }}
          >
            Temitope
          </Typography>
          <Typography sx={{ fontSize: "0.7rem", color: "#aaa", mt: 0.2 }}>
            temitope@nexora.io
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#f0f0f5" }} />

        {[
          {
            icon: <PersonOutlineIcon sx={{ fontSize: 16 }} />,
            label: "Profile",
            action: "profile" as const,
            color: "#3d3d5c",
          },
          {
            icon: <LogoutIcon sx={{ fontSize: 16 }} />,
            label: "Log out",
            action: "logout" as const,
            color: "#ef4444",
          },
        ].map(({ icon, label, action, color }) => (
          <Box
            key={action}
            onClick={() => handleAction(action)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.4,
              cursor: "pointer",
              transition: "background 0.15s",
              "&:hover": {
                background: action === "logout" ? "#fff5f5" : "#f7f7fc",
              },
            }}
          >
            <Box sx={{ color, display: "flex" }}>{icon}</Box>
            <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Fade>
  );
};

export default ProfileDropdown;
