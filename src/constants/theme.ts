// Main theme configuration combining all design tokens

import { colors, cssColors } from './colors'
import { typography, cssTypography } from './typography'
import { spacing, cssSpacing } from './spacing'
import { shadows, cssShadows } from './shadows'

// Main theme object
export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    toast: 70,
    overlay: 80,
    max: 9999
  },

  // Animation/Transition configurations
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '750ms'
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },

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

// Combined CSS custom properties
export const cssVariables = {
  ...cssColors,
  ...cssTypography,
  ...cssSpacing,
  ...cssShadows,
  
  // Breakpoints
  '--breakpoint-xs': theme.breakpoints.xs,
  '--breakpoint-sm': theme.breakpoints.sm,
  '--breakpoint-md': theme.breakpoints.md,
  '--breakpoint-lg': theme.breakpoints.lg,
  '--breakpoint-xl': theme.breakpoints.xl,
  '--breakpoint-2xl': theme.breakpoints['2xl'],

  // Z-index
  '--z-dropdown': theme.zIndex.dropdown.toString(),
  '--z-modal': theme.zIndex.modal.toString(),
  '--z-overlay': theme.zIndex.overlay.toString(),
  '--z-tooltip': theme.zIndex.tooltip.toString(),

  // Animation
  '--duration-fast': theme.animation.duration.fast,
  '--duration-normal': theme.animation.duration.normal,
  '--duration-slow': theme.animation.duration.slow,
  '--easing-ease-in-out': theme.animation.easing.easeInOut,
  '--easing-bounce': theme.animation.easing.bounce,

  // Border radius
  '--radius-xs': theme.borderRadius.xs,
  '--radius-sm': theme.borderRadius.sm,
  '--radius-base': theme.borderRadius.base,
  '--radius-md': theme.borderRadius.md,
  '--radius-lg': theme.borderRadius.lg,
  '--radius-xl': theme.borderRadius.xl,
  '--radius-2xl': theme.borderRadius['2xl'],
  '--radius-full': theme.borderRadius.full,

  // Opacity
  '--opacity-10': theme.opacity[10],
  '--opacity-20': theme.opacity[20],
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

// Type-safe theme access helpers
export const useTheme = () => ({
  colors: theme.colors,
  typography: theme.typography,
  spacing: theme.spacing,
  shadows: theme.shadows,
  breakpoints: theme.breakpoints,
  zIndex: theme.zIndex,
  animation: theme.animation,
  borderRadius: theme.borderRadius,
  opacity: theme.opacity,
  
  // Helper functions
  getColor: (path: string, fallback = '#000000') => getThemeValue(`colors.${path}`, fallback),
  getSpacing: (key: keyof typeof theme.spacing.scale) => theme.spacing.scale[key],
  getShadow: (path: string, fallback = 'none') => getThemeValue(`shadows.${path}`, fallback),
})

// Export theme types for TypeScript
export type Theme = typeof theme
export type ThemeColors = typeof theme.colors
export type ThemeTypography = typeof theme.typography
export type ThemeSpacing = typeof theme.spacing
export type ThemeShadows = typeof theme.shadows

export default theme