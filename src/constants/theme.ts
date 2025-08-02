/**
 * Main Theme Object - Combines all design tokens into a cohesive system
 */
import { colors } from './tokens/colors'
import { design } from './design'
import { borderRadius } from './tokens/borderRadius'
import { opacity } from './tokens/opacity'

// Main theme object combining all design tokens
export const theme = {
  colors,
  design,
  
  // Quick access to common values for convenience
  spacing: design.spacing,
  typography: design.typography,
  shadows: design.shadows,
  animation: design.animation,
  breakpoints: design.breakpoints,
  zIndex: design.zIndex,
  
  // Additional scales
  borderRadius,
  opacity
} as const

// Re-export CSS variables and utilities from dedicated files
export { cssVariables, generateCSSVariables } from './cssVariables'
export { getThemeValue } from './utilities'

// Easy theme access hook
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
  
  // Helper functions - re-export from utilities
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