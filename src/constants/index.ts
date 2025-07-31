// Export all theme constants for easy importing

export { colors, cssColors } from './colors'
export { typography, cssTypography } from './typography'
export { spacing, cssSpacing } from './spacing'
export { shadows, cssShadows } from './shadows'
export { 
  theme, 
  cssVariables, 
  generateCSSVariables, 
  getThemeValue, 
  useTheme,
  type Theme,
  type ThemeColors,
  type ThemeTypography,
  type ThemeSpacing,
  type ThemeShadows 
} from './theme'

// Re-export default theme
export { default } from './theme'

// Import getThemeValue to use in utilities
import { getThemeValue } from './theme'

// Common theme utilities
export const getColor = (path: string, fallback = '#000000') => getThemeValue(`colors.${path}`, fallback)
export const getSpacing = (key: number | string) => getThemeValue(`spacing.scale.${key}`, '0rem')
export const getShadow = (path: string, fallback = 'none') => getThemeValue(`shadows.${path}`, fallback)

// Breakpoint helpers
export const breakpoints = {
  xs: '(max-width: 320px)',
  sm: '(max-width: 640px)', 
  md: '(max-width: 768px)',
  lg: '(max-width: 1024px)',
  xl: '(max-width: 1280px)',
  '2xl': '(max-width: 1536px)'
}

// CSS-in-JS helpers for styled components or inline styles
export const styled = {
  // Common CSS patterns
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  
  flexColumn: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  
  // Quick shadow applications
  shadow: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)'
  },
  
  // Quick color applications
  text: {
    primary: 'var(--color-neutral-950)',
    secondary: 'var(--color-neutral-700)',
    muted: 'var(--color-neutral-600)',
    accent: 'var(--color-primary-500)'
  },
  
  // Quick background applications
  bg: {
    primary: 'var(--bg-primary)',
    secondary: 'var(--bg-secondary)',
    tertiary: 'var(--bg-tertiary)'
  },
  
  // Quick spacing applications
  space: {
    xs: 'var(--space-1)',
    sm: 'var(--space-2)',
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
    xl: 'var(--space-8)'
  },
  
  // Quick border radius applications
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    full: 'var(--radius-full)'
  }
}