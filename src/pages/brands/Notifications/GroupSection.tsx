import { Box, Typography } from "@mui/material";
import type { AppNotification } from "../../../components/dashboard/types";
import NotificationRow from "./NotificationRow";

const GroupSection = ({
  label,
  items,
  onMarkRead,
}: {
  label: string;
  items: AppNotification[];
  onMarkRead: (id: string) => void;
}) => {
  if (items.length === 0) return null;
  return (
    <Box mb={2.5}>
      <Typography
        sx={{
          fontSize: "0.7rem",
          fontWeight: 700,
          color: "#aaa",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          px: 3,
          py: 1,
          background: "#f7f7fc",
        }}
      >
        {label}
      </Typography>
      {items.map((n, i) => (
        <NotificationRow
          key={n.id}
          notification={n}
          onMarkRead={onMarkRead}
          isLast={i === items.length - 1}
        />
      ))}
    </Box>
  );
};
export default GroupSection;
