import { Box, Container, Grid, Typography } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import LanguageIcon from "@mui/icons-material/Language";
import SecurityIcon from "@mui/icons-material/Security";
import GroupsIcon from "@mui/icons-material/Groups";
import type { SvgIconComponent } from "@mui/icons-material";
import { COLORS } from "../../config/colors";

interface CapabilityCard {
  icon: SvgIconComponent;
  title: string;
  description: string;
}

const CARDS: CapabilityCard[] = [
  {
    icon: PaymentsIcon,
    title: "Localized Monetization",
    description:
      "Mobile-first payment rails built for every African market — from M-Pesa to card-based flows, letting creators collect revenue without friction.",
  },
  {
    icon: LanguageIcon,
    title: "Multi-lingual Support",
    description:
      "Content delivery and platform UI in 40+ African languages, ensuring your audience feels seen and heard in their native tongue.",
  },
  {
    icon: SecurityIcon,
    title: "Data Sovereignty",
    description:
      "Your data stays on the continent. Regional data centres ensure compliance with local regulations while keeping latency low.",
  },
  {
    icon: GroupsIcon,
    title: "Community Management",
    description:
      "Rich tools to build, grow, and monetize community — from subscription tiers to exclusive drops, all in one unified dashboard.",
  },
];

const CapabilitiesSection: React.FC = () => (
  <Box component="section" sx={{ ...COLORS.section }}>
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center", mb: 9 }}>
        <Typography
          sx={{
            color: COLORS.gold,
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            mb: 1.5,
          }}
        >
          Our Capabilities
        </Typography>
        <Typography
          component="h2"
          sx={{
            color: COLORS.textPrimary,
            fontSize: { xs: "32px", md: "44px" },
            fontWeight: 800,
            letterSpacing: "-0.8px",
            mb: 2,
          }}
        >
          What We Do
        </Typography>
        <Typography
          sx={{
            color: COLORS.textSecondary,
            maxWidth: 560,
            mx: "auto",
            lineHeight: 1.75,
          }}
        >
          AfriScale provides the infrastructure needed to bridge the gap between
          local talent and global markets — from mobile-first payments to
          low-bandwidth sync.
        </Typography>
      </Box>

      {/* Grid */}
      <Grid container spacing={3}>
        {CARDS.map(({ icon: Icon, title, description }) => (
          <Grid key={title} size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: { xs: 4, md: 5 },
                borderRadius: "18px",
                border: `1px solid ${COLORS.borderMuted}`,
                bgcolor: COLORS.bgCard,
                height: "100%",
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor: COLORS.bgCardHover,
                  borderColor: "rgba(99,102,241,0.5)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
                },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "14px",
                  bgcolor: COLORS.goldFaint,
                  border: `1px solid ${COLORS.goldBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <Icon sx={{ color: COLORS.gold, fontSize: 28 }} />
              </Box>
              <Typography
                sx={{
                  color: COLORS.textPrimary,
                  fontSize: "19px",
                  fontWeight: 700,
                  mb: 1.5,
                  letterSpacing: "-0.2px",
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  color: COLORS.textSecondary,
                  lineHeight: 1.75,
                  fontSize: "14.5px",
                }}
              >
                {description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default CapabilitiesSection;
