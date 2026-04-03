import { Box, Container, Typography, Stack } from "@mui/material";
import TokenIcon from "@mui/icons-material/Token";
import PublicIcon from "@mui/icons-material/Public";
import { ExplicitOutlined } from "@mui/icons-material";
import BoltIcon from "@mui/icons-material/Bolt";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { COLORS } from "../../config/colors";

const LOGOS = [
  { icon: TokenIcon, name: "TECHNO" },
  { icon: PublicIcon, name: "NOMAD" },
  { icon: ExplicitOutlined, name: "VESTA" },
  { icon: BoltIcon, name: "KINETIC" },
  { icon: RocketLaunchIcon, name: "ORBIT" },
] as const;

const TrustedBySection: React.FC = () => (
  <Box
    component="section"
    sx={{
      py: 7,
      bgcolor: `${COLORS.bgDark}88`,
      borderTop: `1px solid ${COLORS.borderMuted}`,
      borderBottom: `1px solid ${COLORS.borderMuted}`,
    }}
  >
    <Container maxWidth="lg">
      <Typography
        sx={{
          textAlign: "center",
          color: COLORS.textMuted,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          mb: 5,
        }}
      >
        Trusted by leading innovators across the continent
      </Typography>

      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={{ xs: 4, md: 8 }}
        sx={{
          opacity: 0.45,
          filter: "grayscale(1)",
          transition: "all 0.4s ease",
          "&:hover": { opacity: 1, filter: "grayscale(0)" },
        }}
      >
        {LOGOS.map(({ icon: Icon, name }) => (
          <Stack key={name} direction="row" alignItems="center" gap={0.75}>
            <Icon sx={{ color: COLORS.textSecondary, fontSize: 20 }} />
            <Typography
              sx={{
                color: COLORS.textSecondary,
                fontWeight: 700,
                fontSize: "17px",
                fontStyle: "italic",
                letterSpacing: "0.04em",
              }}
            >
              {name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Container>
  </Box>
);

export default TrustedBySection;
