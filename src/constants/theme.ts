// 🎨 SIMPLIFIED THEME - Single source of truth

import { colors, design } from './colors'

// Main theme object using our consolidated design system
export const theme = {
  colors,
  design,
  
  // Quick access to common values
  spacing: design.spacing,
  typography: design.typography,
  shadows: design.shadows,
  animation: design.animation,
  breakpoints: design.breakpoints,
  zIndex: design.zIndex,

  // Border radius scale
  borderRadius: {
    none: '0',
    xs: '0.125rem',  // 2px
    sm: '0.25rem',   // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem',   // 32px
    full: '9999px'
  },

  // Opacity scale
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    25: '0.25',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    75: '0.75',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1'
  }
} as const

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
  '--card-min-height': design.card.minHeight,
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
  '--radius-xs': theme.borderRadius.xs,
  '--radius-sm': theme.borderRadius.sm,
  '--radius-md': theme.borderRadius.md,
  '--radius-lg': theme.borderRadius.lg,
  '--radius-xl': theme.borderRadius.xl,
  '--radius-2xl': theme.borderRadius['2xl'],

  // Opacity
  '--opacity-10': theme.opacity[10],
  '--opacity-30': theme.opacity[30],
  '--opacity-50': theme.opacity[50],
  '--opacity-70': theme.opacity[70],
  '--opacity-90': theme.opacity[90],
} as const

// Generate CSS custom properties as a string for injection
export const generateCSSVariables = (): string => {
  const variables = Object.entries(cssVariables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
  
  return `:root {\n${variables}\n}`
}

// Utility function to get theme values with fallbacks
export const getThemeValue = <T>(
  path: string, 
  fallback: T
): T => {
  const keys = path.split('.')
  let current: any = theme
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return fallback
    }
  }
  
  return current as T
}

// 🎯 Easy theme access helpers
export const useTheme = () => ({
  colors: theme.colors,
  design: theme.design,
  spacing: theme.spacing,
  typography: theme.typography,
  shadows: theme.shadows,
  animation: theme.animation,
  breakpoints: theme.breakpoints,
  zIndex: theme.zIndex,
  borderRadius: theme.borderRadius,
  opacity: theme.opacity,
  
  // Helper functions
  getColor: (colorName: keyof typeof colors, fallback = '#000000') => colors[colorName] || fallback,
  getSpacing: (spaceName: keyof typeof design.spacing) => design.spacing[spaceName],
  getShadow: (shadowName: keyof typeof design.shadows) => design.shadows[shadowName],
  getFont: (fontName: keyof typeof design.typography) => design.typography[fontName],
})

// Export theme types for TypeScript
export type Theme = typeof theme
export type ThemeColors = typeof theme.colors
export type ThemeDesign = typeof theme.design

export default theme