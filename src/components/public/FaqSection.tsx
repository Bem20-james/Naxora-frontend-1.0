import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FAQS } from "./data";
import { ColorPallete } from "../../config/colors";

const FaqSection = () => {
  const FAQ_CATEGORIES = ["All", "Billing", "Platform", "Enterprise"] as const;
  type FAQCategory = (typeof FAQ_CATEGORIES)[number];

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqCategory, setFaqCategory] = useState<FAQCategory>("All");

  const filteredFaqs =
    faqCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === faqCategory);
  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 14 },
        borderTop: `1px solid ${ColorPallete.secondary.default}`,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            sx={{
              color: ColorPallete.warning.main,
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Got Questions?
          </Typography>
          <Typography
            component="h2"
            sx={{
              color: ColorPallete.primary.main,
              fontSize: { xs: "30px", md: "44px" },
              fontWeight: 800,
              letterSpacing: "-0.8px",
              mb: 2,
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            sx={{
              color: ColorPallete.default.secondary,
              maxWidth: 480,
              mx: "auto",
              lineHeight: 1.75,
            }}
          >
            Everything you need to know about Nexora pricing and platform. Can't
            find the answer?{" "}
            <Box
              component="span"
              sx={{
                color: ColorPallete.warning.main,
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Chat with our team.
            </Box>
          </Typography>
        </Box>

        {/* Category filter pills */}
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={1.5}
          justifyContent="center"
          sx={{ mb: 7 }}
        >
          {FAQ_CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => {
                setFaqCategory(cat);
                setOpenFaq(null);
              }}
              sx={{
                borderRadius: "999px",
                px: 1,
                height: 36,
                fontSize: "13px",
                fontWeight: faqCategory === cat ? 700 : 400,
                bgcolor:
                  faqCategory === cat
                    ? ColorPallete.warning.main
                    : "transparent",
                color:
                  faqCategory === cat
                    ? ColorPallete.default.dark
                    : ColorPallete.default.secondary,
                border: `1px solid ${faqCategory === cat ? ColorPallete.warning.main : ColorPallete.secondary.disabled}`,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor:
                    faqCategory === cat
                      ? ColorPallete.warning.main
                      : ColorPallete.warning.soft,
                  color:
                    faqCategory === cat
                      ? ColorPallete.default.dark
                      : ColorPallete.warning.main,
                  borderColor: ColorPallete.warning.main,
                },
                "& .MuiChip-label": { px: 1.5 },
              }}
            />
          ))}
        </Stack>

        {/* Accordion items */}
        <Stack gap={2} sx={{ maxWidth: 860, mx: "auto" }}>
          {filteredFaqs.map(({ category, q, a }, i) => {
            const isOpen = openFaq === i;
            return (
              <Box
                key={q}
                sx={{
                  borderRadius: "14px",
                  border: `1px solid ${isOpen ? ColorPallete.warning.main : ColorPallete.secondary.disabled}`,
                  bgcolor: isOpen ? "rgba(30,20,2,0.7)" : "rgba(20,18,40,0.35)",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: ColorPallete.warning.main,
                  },
                }}
              >
                {/* Question row */}
                <Box
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: { xs: 3, md: 4 },
                    py: { xs: 2.5, md: 3 },
                    cursor: "pointer",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      flex: 1,
                    }}
                  >
                    {/* Category tag */}
                    <Chip
                      label={category}
                      size="small"
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        bgcolor: isOpen
                          ? ColorPallete.warning.soft
                          : "rgba(99,102,241,0.1)",
                        color: isOpen
                          ? ColorPallete.warning.main
                          : ColorPallete.secondary.soft,
                        border: `1px solid ${isOpen ? ColorPallete.warning.main : "rgba(99,102,241,0.2)"}`,
                        borderRadius: "6px",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        height: 22,
                        flexShrink: 0,
                        "& .MuiChip-label": { px: 1 },
                      }}
                    />
                    <Typography
                      sx={{
                        color: isOpen ? ColorPallete.primary.main : "#CBD5E1",
                        fontWeight: isOpen ? 700 : 500,
                        fontSize: { xs: "14px", md: "15px" },
                        lineHeight: 1.45,
                        transition: "color 0.2s",
                      }}
                    >
                      {q}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      bgcolor: isOpen
                        ? ColorPallete.warning.soft
                        : "rgba(99,102,241,0.1)",
                      border: `1px solid ${isOpen ? ColorPallete.warning.main : ColorPallete.secondary.disabled}`,
                      color: isOpen
                        ? ColorPallete.warning.main
                        : ColorPallete.secondary.disabled,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isOpen ? (
                      <RemoveIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <AddIcon sx={{ fontSize: 16 }} />
                    )}
                  </Box>
                </Box>

                {/* Answer */}
                <Collapse in={isOpen}>
                  <Box
                    sx={{
                      px: { xs: 3, md: 4 },
                      pb: 3,
                      borderTop: `1px solid ${ColorPallete.secondary.disabled}`,
                      pt: 2.5,
                    }}
                  >
                    <Typography
                      sx={{
                        color: ColorPallete.default.secondary,
                        fontSize: "14.5px",
                        lineHeight: 1.85,
                      }}
                    >
                      {a}
                    </Typography>
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Stack>

        {/* Still need help CTA */}
        <Box
          sx={{
            mt: 9,
            p: { xs: 4, md: 6 },
            borderRadius: "20px",
            border: `1px solid ${ColorPallete.secondary.disabled}`,
            background: `linear-gradient(135deg, rgba(30,27,75,0.4) 0%, rgba(15,14,28,0.9) 100%)`,
            textAlign: "center",
            maxWidth: 640,
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              color: ColorPallete.primary.main,
              fontWeight: 700,
              fontSize: { xs: "20px", md: "24px" },
              letterSpacing: "-0.3px",
              mb: 1.5,
            }}
          >
            Still have questions?
          </Typography>
          <Typography
            sx={{
              color: ColorPallete.default.secondary,
              fontSize: "14.5px",
              lineHeight: 1.75,
              mb: 4,
            }}
          >
            Our team typically responds within 2 hours. Reach out and we'll walk
            you through everything you need.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            gap={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: ColorPallete.warning.main,
                color: ColorPallete.default.dark,
                fontWeight: 700,
                borderRadius: "10px",
                px: 4,
                py: "12px",
                textTransform: "none",
                fontSize: "14px",
                boxShadow: `0 4px 18px ${ColorPallete.warning.default}`,
                "&:hover": { bgcolor: "#C8961E" },
              }}
            >
              Chat with Sales
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: ColorPallete.secondary.soft,
                color: ColorPallete.primary.main,
                fontWeight: 600,
                borderRadius: "10px",
                px: 4,
                py: "12px",
                textTransform: "none",
                fontSize: "14px",
                "&:hover": {
                  borderColor: ColorPallete.warning.main,
                  bgcolor: ColorPallete.warning.soft,
                },
              }}
            >
              View Documentation
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default FaqSection;
