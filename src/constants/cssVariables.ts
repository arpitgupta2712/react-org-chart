/**
 * CSS Custom Properties Generator - Convert design tokens to CSS variables
 */
import { colors } from './tokens/colors'
import { design } from './design'
import { borderRadius } from './tokens/borderRadius'
import { opacity } from './tokens/opacity'

// CSS custom properties from our design system
export const cssVariables = {
  // Colors (main earthy palette)
  '--color-sage': colors.highlightBorder,
  '--color-sky': colors.selectedBorder,
  '--color-terracotta': colors.error,
  '--color-page-bg': colors.pageBackground,
  '--color-card-bg': colors.cardBackground,
  '--color-text-primary': colors.textPrimary,
  '--color-text-secondary': colors.textSecondary,
  
  // Spacing
  '--space-xs': design.spacing.xs,
  '--space-sm': design.spacing.sm,
  '--space-md': design.spacing.md,
  '--space-lg': design.spacing.lg,
  '--space-xl': design.spacing.xl,
  '--space-2xl': design.spacing['2xl'],
  
  // Typography
  '--font-xs': design.typography.fontXS,
  '--font-sm': design.typography.fontSM,
  '--font-base': design.typography.fontBase,
  '--font-lg': design.typography.fontLG,
  '--font-xl': design.typography.fontXL,
  '--font-2xl': design.typography.font2XL,
  
  // Card System
  '--card-padding': design.card.padding,
  '--card-radius': design.card.borderRadius,
  '--card-gap': design.card.gap,
  
  // Shadows
  '--shadow-card': design.shadows.card,
  '--shadow-card-hover': design.shadows.cardHover,
  '--shadow-button': design.shadows.button,
  
  // Animation
  '--duration-fast': design.animation.fast,
  '--duration-normal': design.animation.normal,
  '--duration-slow': design.animation.slow,
  '--easing': design.animation.easing,
  
  // Breakpoints
  '--breakpoint-sm': design.breakpoints.sm,
  '--breakpoint-md': design.breakpoints.md,
  '--breakpoint-lg': design.breakpoints.lg,
  '--breakpoint-xl': design.breakpoints.xl,

  // Z-index
  '--z-dropdown': design.zIndex.dropdown.toString(),
  '--z-modal': design.zIndex.modal.toString(),
  '--z-overlay': design.zIndex.overlay.toString(),

  // Border radius
  '--radius-xs': borderRadius.xs,
  '--radius-sm': borderRadius.sm,
  '--radius-md': borderRadius.md,
  '--radius-lg': borderRadius.lg,
  '--radius-xl': borderRadius.xl,
  '--radius-2xl': borderRadius['2xl'],

  // Opacity
  '--opacity-10': opacity[10],
  '--opacity-30': opacity[30],
  '--opacity-50': opacity[50],
  '--opacity-70': opacity[70],
  '--opacity-90': opacity[90],
} as const

// Generate CSS custom properties as a string for injection
export const generateCSSVariables = (): string => {
  const variables = Object.entries(cssVariables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
  
  return `:root {\n${variables}\n}`
}