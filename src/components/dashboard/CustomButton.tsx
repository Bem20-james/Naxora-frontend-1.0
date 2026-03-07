import { forwardRef, type ReactNode } from "react";
import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
  CircularProgress,
  Box,
  Tooltip,
  type TooltipProps,
  type SxProps,
  type Theme,
} from "@mui/material";
import { type SystemStyleObject } from "@mui/system";
import { Link, type LinkProps } from "react-router-dom";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "danger"
  | "success"
  | "info"
  | "outline";

type ButtonShadow = "none" | "sm" | "md" | "lg";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonShape = "rounded" | "pill" | "square";

export interface ButtonProps extends Omit<
  MuiButtonProps,
  "variant" | "size" | "color"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  shadow?: ButtonShadow;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  to?: LinkProps["to"];
  href?: string;
  external?: boolean;
  tooltip?: string;
  tooltipPlacement?: TooltipProps["placement"];
  sx?: SxProps<Theme>;
  children?: ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// Style lookup tables — typed as SystemStyleObject (never SxProps) so each
// entry is always a plain object and TypeScript can safely spread them into
// the composedSx array below without hitting the index-signature error.
// ─────────────────────────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<ButtonVariant, SystemStyleObject<Theme>> = {
  info: {
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
  primary: {
    background: "linear-gradient(135deg, #2196F3 0%, #1565C0 100%)",
    color: "#FFFFFF",
    boxShadow: "0 4px 16px rgba(33,150,243,0.25)",
    "&:hover": {
      background: "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
      boxShadow: "0 6px 22px rgba(33,150,243,0.38)",
      transform: "translateY(-1px)",
    },
    "&:active": { transform: "translateY(0px)" },
  },
};

const SIZE_STYLES: Record<ButtonSize, SystemStyleObject<Theme>> = {
  xs: { fontSize: "11px", px: 1.5, py: 0.5, minHeight: 28 },
  sm: { fontSize: "12.5px", px: 2, py: 0.75, minHeight: 34 },
  md: { fontSize: "14px", px: 2.5, py: 1, minHeight: 42 },
  lg: { fontSize: "15px", px: 3.5, py: 1.25, minHeight: 50 },
  xl: { fontSize: "16px", px: 5, py: 1.6, minHeight: 58 },
};

const SHAPE_STYLES: Record<ButtonShape, SystemStyleObject<Theme>> = {
  rounded: { borderRadius: "10px" },
  pill: { borderRadius: "100px" },
  square: { borderRadius: "4px" },
};

const SHADOW_STYLES: Record<ButtonShadow, SystemStyleObject<Theme>> = {
  none: { boxShadow: "none" },
  sm: { boxShadow: "0 2px 6px rgba(0,0,0,0.15)" },
  md: { boxShadow: "0 4px 16px rgba(0,0,0,0.22)" },
  lg: { boxShadow: "0 8px 28px rgba(0,0,0,0.30)" },
};

const SPINNER_SIZE: Record<ButtonSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

const AppButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      shape = "rounded",
      shadow = "none",
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

    // MUI supports SxProps as an array of SystemStyleObject entries.
    // All lookup-table entries are SystemStyleObject so they are safe here.
    // The consumer's `sx` prop may itself be an array (SxProps), so we spread
    // it in with Array.isArray to keep the outer array flat.
    const composedSx: SxProps<Theme> = [
      {
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
        "&.Mui-disabled": {
          opacity: 0.45,
          cursor: "not-allowed",
          pointerEvents: "auto",
          transform: "none !important",
          boxShadow: "none !important",
        },
      } satisfies SystemStyleObject<Theme>,

      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      SHAPE_STYLES[shape],
      SHADOW_STYLES[shadow],

      // Flatten `sx` so the array never contains a nested array,
      // which is what causes the TS2322 index-signature error.
      ...(Array.isArray(sx) ? sx : [sx]),
    ];

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

    const content = (
      <>
        {loading && (
          <CircularProgress
            size={SPINNER_SIZE[size]}
            thickness={5}
            sx={{ color: "inherit", flexShrink: 0 }}
          />
        )}

        {!loading && startIcon && (
          <Box
            component="span"
            sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            {startIcon}
          </Box>
        )}

        {loading && loadingText ? loadingText : children}

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

    if (tooltip) {
      return (
        <Tooltip title={tooltip} placement={tooltipPlacement} arrow>
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
