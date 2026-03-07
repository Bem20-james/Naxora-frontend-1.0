import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  keyframes,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { COMPARISON, PLANS } from "./data";
import { ColorPallete } from "../../../config/colors";
import { FaqSection } from "../../../components/public";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(217,165,32,0.3); }
  50%       { box-shadow: 0 0 40px rgba(217,165,32,0.6); }
`;

const CellValue: React.FC<{ value: string | boolean; highlight?: boolean }> = ({
  value,
  highlight,
}) => {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon sx={{ color: "#66BB6A", fontSize: 20 }} />
    ) : (
      <CloseIcon
        sx={{ color: ColorPallete.secondary.soft, fontSize: 18, opacity: 0.4 }}
      />
    );
  }
  return (
    <Typography
      sx={{
        fontSize: "13.5px",
        color: highlight
          ? ColorPallete.warning.main
          : ColorPallete.default.secondary,
        fontWeight: highlight ? 600 : 400,
      }}
    >
      {value}
    </Typography>
  );
};

const Pricing: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: ColorPallete.default.dark,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Box
        component="section"
        sx={{
          position: "relative",
          textAlign: "center",
          px: 3,
          pt: { xs: 10, md: 14 },
          pb: { xs: 8, md: 10 },
          overflow: "hidden",
        }}
      >
        {/* Ambient glows */}
        <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <Box
            sx={{
              position: "absolute",
              top: "-15%",
              left: "10%",
              width: "35%",
              height: "50%",
              background: "rgba(217,165,32,0.12)",
              borderRadius: "50%",
              filter: "blur(100px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "-15%",
              right: "10%",
              width: "35%",
              height: "50%",
              background: "rgba(99,102,241,0.1)",
              borderRadius: "50%",
              filter: "blur(100px)",
            }}
          />
        </Box>

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            component="h1"
            sx={{
              color: ColorPallete.primary.main,
              fontSize: { xs: "36px", md: "56px" },
              fontWeight: 900,
              letterSpacing: "-1.2px",
              lineHeight: 1.1,
              mb: 2,
              animation: `${fadeUp} 0.5s ease both`,
            }}
          >
            Pricing that grows{" "}
            <Box
              component="span"
              sx={{
                color: ColorPallete.warning.main,
                fontStyle: "italic",
              }}
            >
              with you
            </Box>
          </Typography>
          <Typography
            sx={{
              color: ColorPallete.default.secondary,
              fontSize: { xs: "15px", md: "17px" },
              maxWidth: 480,
              mx: "auto",
              lineHeight: 1.75,
              animation: `${fadeUp} 0.5s ease 0.1s both`,
            }}
          >
            Scalable solutions for African innovators. Simple, transparent
            pricing to help you reach millions.
          </Typography>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{ px: { xs: 2, md: 6 }, pb: { xs: 8, md: 12 } }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="stretch">
            {PLANS.map((plan, i) => (
              <Grid key={plan.id} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    borderRadius: "20px",
                    border: `1.5px solid ${plan.popular ? ColorPallete.warning.main : ColorPallete.secondary.soft}`,
                    bgcolor: plan.popular
                      ? "rgba(30,24,4,0.9)"
                      : "rgba(20,18,40,0.6)",
                    p: { xs: 3.5, md: 4 },
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    animation: `${fadeUp} 0.5s ease ${0.05 * i}s both`,
                    ...(plan.popular && {
                      animation: `${glowPulse} 3s ease-in-out infinite`,
                    }),
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: plan.popular
                        ? `0 24px 60px rgba(217,165,32,0.2)`
                        : "0 24px 48px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -14,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <Chip
                        label="MOST POPULAR"
                        size="small"
                        sx={{
                          bgcolor: ColorPallete.warning.main,
                          color: ColorPallete.default.dark,
                          fontWeight: 800,
                          fontSize: "10px",
                          letterSpacing: "0.1em",
                          height: 26,
                          borderRadius: "999px",
                          px: 0.5,
                        }}
                      />
                    </Box>
                  )}

                  {/* Tier label */}
                  <Typography
                    sx={{
                      color: ColorPallete.warning.main,
                      fontSize: "10.5px",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {plan.tier}
                  </Typography>

                  {/* Price */}
                  <Box>
                    <Box
                      sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}
                    >
                      <Typography
                        sx={{
                          color: ColorPallete.primary.main,
                          fontSize: { xs: "44px", md: "52px" },
                          fontWeight: 900,
                          letterSpacing: "-2px",
                          lineHeight: 1,
                        }}
                      >
                        {plan.price}
                      </Typography>
                      <Typography
                        sx={{
                          color: ColorPallete.secondary.soft,
                          fontSize: "15px",
                        }}
                      >
                        {plan.period}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: ColorPallete.default.secondary,
                        fontSize: "13.5px",
                        mt: 1,
                        lineHeight: 1.6,
                      }}
                    >
                      {plan.tagline}
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant={plan.popular ? "contained" : "outlined"}
                    sx={{
                      ...(plan.popular
                        ? {
                            bgcolor: ColorPallete.warning.main,
                            color: ColorPallete.default.dark,
                            boxShadow: `0 4px 20px ${ColorPallete.warning.default}`,
                            "&:hover": {
                              bgcolor: "#C8961E",
                              boxShadow: `0 6px 28px ${ColorPallete.warning.default}`,
                            },
                          }
                        : {
                            borderColor: ColorPallete.secondary.soft,
                            color: ColorPallete.primary.main,
                            bgcolor: "transparent",
                            "&:hover": {
                              borderColor: ColorPallete.warning.main,
                              bgcolor: ColorPallete.warning.soft,
                            },
                          }),
                      fontWeight: 700,
                      fontSize: "14px",
                      borderRadius: "10px",
                      py: "12px",
                      textTransform: "none",
                    }}
                  >
                    {plan.cta}
                  </Button>

                  <Box
                    sx={{
                      borderTop: `1px solid ${ColorPallete.secondary.soft}`,
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        color: ColorPallete.secondary.soft,
                        fontSize: "10.5px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        mb: 2,
                      }}
                    >
                      {plan.popular
                        ? "Everything in Starter plus"
                        : "Included features"}
                    </Typography>
                    <Stack gap={1.5}>
                      {plan.features.map(({ label }) => (
                        <Box
                          key={label}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              color: plan.popular
                                ? ColorPallete.warning.main
                                : "#66BB6A",
                              fontSize: 17,
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            sx={{
                              color: ColorPallete.default.secondary,
                              fontSize: "13.5px",
                            }}
                          >
                            {label}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          px: { xs: 2, md: 6 },
          py: { xs: 8, md: 12 },
          borderTop: `1px solid ${ColorPallete.secondary.soft}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h2"
            sx={{
              color: ColorPallete.primary.main,
              fontSize: { xs: "28px", md: "40px" },
              fontWeight: 800,
              letterSpacing: "-0.6px",
              textAlign: "center",
              mb: 7,
            }}
          >
            Detailed Comparison
          </Typography>

          <TableContainer
            sx={{
              borderRadius: "18px",
              border: `1px solid ${ColorPallete.secondary.soft}`,
              bgcolor: "rgba(20,18,40,0.4)",
              backdropFilter: "blur(8px)",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "rgba(30,27,75,0.5)" }}>
                  <TableCell
                    sx={{
                      color: ColorPallete.default.secondary,
                      fontWeight: 700,
                      fontSize: "13px",
                      borderColor: ColorPallete.secondary.soft,
                      py: 2.5,
                      width: "28%",
                    }}
                  >
                    Feature
                  </TableCell>
                  {PLANS.map((p) => (
                    <TableCell
                      key={p.id}
                      align="center"
                      sx={{
                        color: p.popular
                          ? ColorPallete.warning.main
                          : ColorPallete.default.secondary,
                        fontWeight: 700,
                        fontSize: "13px",
                        borderColor: ColorPallete.secondary.soft,
                        py: 2.5,
                      }}
                    >
                      {p.tier}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {COMPARISON.map((row, i) => (
                  <TableRow
                    key={row.feature}
                    sx={{
                      bgcolor:
                        i % 2 === 0 ? "transparent" : "rgba(30,27,75,0.1)",
                      "&:last-child td": { borderBottom: "none" },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: ColorPallete.primary.main,
                        fontWeight: 500,
                        fontSize: "13.5px",
                        borderColor: ColorPallete.secondary.soft,
                        py: 2,
                      }}
                    >
                      {row.feature}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderColor: ColorPallete.secondary.soft, py: 2 }}
                    >
                      <CellValue value={row.starter} />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderColor: ColorPallete.secondary.soft, py: 2 }}
                    >
                      <CellValue value={row.growth} />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderColor: ColorPallete.secondary.soft, py: 2 }}
                    >
                      <CellValue
                        value={row.enterprise}
                        highlight={row.highlight === "enterprise"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <Box>
        <FaqSection />
      </Box>
    </Box>
  );
};

export default Pricing;
