import React from "react";
import { Backdrop, Box, Typography, Fade, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";

export interface LoaderProps {
  open: boolean;
  title?: string;
}

const rotateSteps = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const AppLoader: React.FC<LoaderProps> = ({ open, title = "Loading..." }) => {
  const theme = useTheme();

  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        backdropFilter: "blur(8px)",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(0,0,0,0.75)"
            : "rgba(255,255,255,0.75)",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Fade in={open} timeout={300}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          {/* Loader Ring */}
          <Box
            sx={{
              width: 64,
              aspectRatio: "1",
              borderRadius: "50%",
              padding: "1px",
              background: `conic-gradient(
                transparent 10%,
                ${theme.palette.primary.main}
              ) content-box`,
              WebkitMask: `
                repeating-conic-gradient(
                  transparent 0deg,
                  black 1deg 20deg,
                  transparent 21deg 36deg
                ),
                radial-gradient(
                  farthest-side,
                  transparent calc(100% - 8px - 1px),
                  black calc(100% - 8px)
                )
              `,
              WebkitMaskComposite: "destination-in",
              maskComposite: "intersect",
              animation: `${rotateSteps} 1s infinite steps(10)`,
            }}
          />

          {/* Title */}
          {title && (
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                letterSpacing: 0.5,
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
              }}
            >
              {title}
            </Typography>
          )}
        </Box>
      </Fade>
    </Backdrop>
  );
};

export default AppLoader;
