import { forwardRef, ReactNode } from "react";
import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
  CircularProgress,
  Box,
  Tooltip,
  type TooltipProps,
  SxProps,
  Theme,
} from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "danger"
  | "success"
  | "outline";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonShape = "rounded" | "pill" | "square";

export interface ButtonProps extends Omit<
  MuiButtonProps,
  "variant" | "size" | "color"
> {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Border radius shape */
  shape?: ButtonShape;
  /** Icon placed before the label */
  startIcon?: ReactNode;
  /** Icon placed after the label */
  endIcon?: ReactNode;
  /** Shows a spinner and disables the button */
  loading?: boolean;
  /** Custom loading text shown while `loading` is true */
  loadingText?: string;
  /** Renders as a full-width block button */
  fullWidth?: boolean;
  /** React Router `to` prop — renders the button as a `<Link>` */
  to?: LinkProps["to"];
  /** Native href — renders the button as an `<a>` tag */
  href?: string;
  /** Opens href in a new tab (only used with `href`) */
  external?: boolean;
  /** Wraps the button in a MUI Tooltip */
  tooltip?: string;
  /** Tooltip placement (default: "top") */
  tooltipPlacement?: TooltipProps["placement"];
  /** Extra sx overrides */
  sx?: SxProps<Theme>;
  /** Children / label */
  children?: ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLE MAPS
// ─────────────────────────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<ButtonVariant, SxProps<Theme>> = {
  primary: {
    background: "linear-gradient(135deg, #F5C518 0%, #E0A800 100%)",
    color: "#1A1A0E",
    fontWeight: 700,
    boxShadow: "0 4px 16px rgba(245,197,24,0.28)",
    "&:hover": {
      background: "linear-gradient(135deg, #FFD740 0%, #F5C518 100%)",
      boxShadow: "0 6px 22px rgba(245,197,24,0.40)",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0px)",
      boxShadow: "0 2px 8px rgba(245,197,24,0.2)",
    },
  },
  secondary: {
    background: "rgba(255,255,255,0.06)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(8px)",
    "&:hover": {
      background: "rgba(255,255,255,0.10)",
      border: "1px solid rgba(255,255,255,0.22)",
      transform: "translateY(-1px)",
    },
    "&:active": { transform: "translateY(0px)" },
  },
  accent: {
    background: "transparent",
    color: "rgba(255,255,255,0.7)",
    "&:hover": {
      background: "rgba(255,255,255,0.06)",
      color: "#FFFFFF",
    },
  },
  danger: {
    background: "linear-gradient(135deg, #E53935 0%, #B71C1C 100%)",
    color: "#FFFFFF",
    boxShadow: "0 4px 16px rgba(229,57,53,0.25)",
    "&:hover": {
      background: "linear-gradient(135deg, #EF5350 0%, #E53935 100%)",
      boxShadow: "0 6px 22px rgba(229,57,53,0.38)",
      transform: "translateY(-1px)",
    },
    "&:active": { transform: "translateY(0px)" },
  },
  success: {
    background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
    color: "#FFFFFF",
    boxShadow: "0 4px 16px rgba(46,125,50,0.25)",
    "&:hover": {
      background: "linear-gradient(135deg, #388E3C 0%, #2E7D32 100%)",
      boxShadow: "0 6px 22px rgba(46,125,50,0.38)",
      transform: "translateY(-1px)",
    },
    "&:active": { transform: "translateY(0px)" },
  },
  outline: {
    background: "transparent",
    color: "#F5C518",
    border: "1.5px solid #F5C518",
    "&:hover": {
      background: "rgba(245,197,24,0.08)",
      border: "1.5px solid #FFD740",
      transform: "translateY(-1px)",
    },
    "&:active": { transform: "translateY(0px)" },
  },
};

const SIZE_STYLES: Record<ButtonSize, SxProps<Theme>> = {
  xs: { fontSize: "11px", px: 1.5, py: 0.5, minHeight: 28 },
  sm: { fontSize: "12.5px", px: 2, py: 0.75, minHeight: 34 },
  md: { fontSize: "14px", px: 2.5, py: 1, minHeight: 42 },
  lg: { fontSize: "15px", px: 3.5, py: 1.25, minHeight: 50 },
  xl: { fontSize: "16px", px: 5, py: 1.6, minHeight: 58 },
};

const SHAPE_STYLES: Record<ButtonShape, SxProps<Theme>> = {
  rounded: { borderRadius: "10px" },
  pill: { borderRadius: "100px" },
  square: { borderRadius: "4px" },
};

const SPINNER_SIZE: Record<ButtonSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const AppButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      shape = "rounded",
      loading = false,
      loadingText,
      fullWidth = false,
      to,
      href,
      external = false,
      tooltip,
      tooltipPlacement = "top",
      startIcon,
      endIcon,
      disabled,
      children,
      sx,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    // ── Compose sx ──────────────────────────────────────────────────────────
    const composedSx: SxProps<Theme> = {
      // Base resets
      textTransform: "none",
      fontWeight: 500,
      letterSpacing: "0.2px",
      lineHeight: 1,
      transition: "all 0.2s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      position: "relative",
      overflow: "hidden",
      width: fullWidth ? "100%" : undefined,
      // Disabled state
      "&.Mui-disabled": {
        opacity: 0.45,
        cursor: "not-allowed",
        pointerEvents: "auto",
        transform: "none !important",
        boxShadow: "none !important",
      },
      // Spread variant + size + shape
      ...VARIANT_STYLES[variant],
      ...SIZE_STYLES[size],
      ...SHAPE_STYLES[shape],
      // Consumer overrides last
      ...sx,
    };

    // ── Link resolution ──────────────────────────────────────────────────────
    const linkProps = to
      ? { component: Link, to }
      : href
        ? {
            component: "a",
            href,
            ...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {}),
          }
        : {};

    // ── Inner content ────────────────────────────────────────────────────────
    const content = (
      <>
        {/* Loading spinner */}
        {loading && (
          <CircularProgress
            size={SPINNER_SIZE[size]}
            thickness={5}
            sx={{
              color: "inherit",
              flexShrink: 0,
            }}
          />
        )}

        {/* Start icon (hidden while loading) */}
        {!loading && startIcon && (
          <Box
            component="span"
            sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            {startIcon}
          </Box>
        )}

        {/* Label */}
        {loading && loadingText ? loadingText : children}

        {/* End icon (hidden while loading) */}
        {!loading && endIcon && (
          <Box
            component="span"
            sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            {endIcon}
          </Box>
        )}
      </>
    );

    // ── Button element ───────────────────────────────────────────────────────
    const button = (
      <MuiButton
        ref={ref}
        disableElevation
        disableRipple={false}
        disabled={isDisabled}
        onClick={!isDisabled ? onClick : undefined}
        sx={composedSx}
        {...linkProps}
        {...rest}
      >
        {content}
      </MuiButton>
    );

    // ── Tooltip wrapper ──────────────────────────────────────────────────────
    if (tooltip) {
      return (
        <Tooltip title={tooltip} placement={tooltipPlacement} arrow>
          {/* span needed so tooltip works on disabled buttons */}
          <Box
            component="span"
            sx={{ display: fullWidth ? "block" : "inline-flex" }}
          >
            {button}
          </Box>
        </Tooltip>
      );
    }

    return button;
  },
);

AppButton.displayName = "AppButton";
export default AppButton;
