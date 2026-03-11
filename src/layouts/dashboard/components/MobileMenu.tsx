import { Box, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { sideNavPaperStyles } from "../data";
import { styles } from "../styles";

import NavigationMenu from "./NavMenu";

interface MobileSideNavProps {
  open: boolean;
  width: number | string;
  onClose: () => void;
  onTransitionEnd: () => void;
}

function MobileSideNav({
  open,
  width,
  onClose,
  onTransitionEnd,
}: MobileSideNavProps) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onTransitionEnd={onTransitionEnd}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={[
        sideNavPaperStyles(width),
        {
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        },
      ]}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ display: "flex", margin: "auto" }}>
          <Link to="/">
            <img src="/logo.png" style={styles.mobileLogo} alt="Bmg Logo" />
          </Link>
        </div>
        <NavigationMenu open={open} />
      </Box>
    </Drawer>
  );
}

export default MobileSideNav;
