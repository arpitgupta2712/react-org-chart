// 🎨 SIMPLIFIED EXPORTS - Single source of truth

export { 
  colors, 
  design, 
  sizes, 
  getTierColors 
} from './colors'

export { 
  theme, 
  cssVariables, 
  generateCSSVariables, 
  getThemeValue, 
  useTheme,
  type Theme,
  type ThemeColors,
  type ThemeDesign
} from './theme'

// Re-export default theme
export { default } from './theme'

// Import theme and design tokens for utilities
import { theme } from './theme'
import { colors, design } from './colors'

// 🎯 Easy access utilities
export const getColor = (colorName: keyof typeof colors, fallback = '#000000') => colors[colorName] || fallback
export const getSpacing = (spaceName: keyof typeof design.spacing) => design.spacing[spaceName]
export const getShadow = (shadowName: keyof typeof design.shadows) => design.shadows[shadowName]
export const getFont = (fontName: keyof typeof design.typography) => design.typography[fontName]

// Breakpoint helpers
export const breakpoints = {
  xs: '(max-width: 320px)',
  sm: '(max-width: 640px)', 
  md: '(max-width: 768px)',
  lg: '(max-width: 1024px)',
  xl: '(max-width: 1280px)',
  '2xl': '(max-width: 1536px)'
}

// 🎨 CSS-in-JS helpers using our design system
export const getStyledHelpers = () => ({
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
  
  // Quick shadow applications from our design system
  shadow: {
    sm: design.shadows.sm,
    md: design.shadows.md,
    lg: design.shadows.lg,
    xl: design.shadows.xl,
    card: design.shadows.card,
    cardHover: design.shadows.cardHover
  },
  
  // Quick color applications
  text: {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
    light: colors.textLight,
    white: colors.textWhite
  },
  
  // Quick background applications
  bg: {
    page: colors.pageBackground,
    card: colors.cardBackground,
    app: colors.appBackground
  },
  
  // Quick spacing applications
  space: {
    xs: design.spacing.xs,
    sm: design.spacing.sm,
    md: design.spacing.md,
    lg: design.spacing.lg,
    xl: design.spacing.xl,
    '2xl': design.spacing['2xl']
  },
  
  // Quick typography applications
  font: {
    xs: design.typography.fontXS,
    sm: design.typography.fontSM,
    base: design.typography.fontBase,
    lg: design.typography.fontLG,
    xl: design.typography.fontXL,
    '2xl': design.typography.font2XL
  }
})

// Export the styled helpers
export const styled = getStyledHelpers()