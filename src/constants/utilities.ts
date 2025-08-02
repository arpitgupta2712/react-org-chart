/**
 * Design System Utilities - Helper functions for theme access
 */
import { colors, tierColors } from './tokens/colors'
import { design } from './design'

// Helper function - Get tier colors easily
export const getTierColors = (tier: number): {
  background: string;
  border: string;
  text: string;
  textSecondary: string;
  shadow: string;
} => {
  const tierKey = `tier${Math.min(Math.max(1, tier), 8)}` as keyof typeof tierColors
  return tierColors[tierKey] || tierColors.tier1
}

// Utility functions for color logic
export const isDarkBackground = (tier: number): boolean => {
  // Tiers 4 and 6 have light backgrounds with dark text
  return ![4, 6].includes(tier)
}

export const getContrastText = (tier: number): string => {
  return isDarkBackground(tier) ? colors.textWhite : colors.textPrimary
}

// Theme access utilities
export const getColor = (colorName: keyof typeof colors, fallback = '#000000') => 
  colors[colorName] || fallback

export const getSpacing = (spaceName: keyof typeof design.spacing) => 
  design.spacing[spaceName]

export const getShadow = (shadowName: keyof typeof design.shadows) => 
  design.shadows[shadowName]

export const getFont = (fontName: keyof typeof design.typography) => 
  design.typography[fontName]

// Utility function to get theme values with fallbacks
export const getThemeValue = <T>(
  path: string, 
  fallback: T
): T => {
  const keys = path.split('.')
  let current: any = { colors, design }
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return fallback
    }
  }
  
  return current as T
}

// CSS-in-JS helpers using our design system
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