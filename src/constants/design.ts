/**
 * Complete Design System - Combines all design tokens
 */
import { spacing, cardSpacing } from './tokens/spacing'
import { typography } from './tokens/typography'
import { shadows } from './tokens/shadows'
import { animation } from './tokens/animation'
import { breakpoints } from './tokens/breakpoints'
import { zIndex } from './tokens/zIndex'

export const design = {
  spacing,
  card: cardSpacing,
  typography,
  shadows,
  animation,
  breakpoints,
  zIndex
} as const

// Legacy sizes object for backward compatibility
export const sizes = {
  // Card Dimensions
  cardPadding: design.card.padding,
  cardBorderRadius: design.card.borderRadius,
  cardGap: design.card.gap,
  
  // Font Sizes
  fontXS: design.typography.fontXS,
  fontSM: design.typography.fontSM,
  fontBase: design.typography.fontBase,
  fontLG: design.typography.fontLG,
  fontXL: design.typography.fontXL,
  font2XL: design.typography.font2XL,
  
  // Component-specific fonts
  employeeName: design.typography.employeeName,
  employeeTitle: design.typography.employeeTitle,
  employeeDetails: design.typography.employeeDetails,
  employeeId: design.typography.employeeId,
  pageTitle: design.typography.pageTitle,
  sectionTitle: design.typography.sectionTitle,
  
  // Spacing
  spaceXS: design.spacing.xs,
  spaceSM: design.spacing.sm,
  spaceMD: design.spacing.md,
  spaceLG: design.spacing.lg,
  spaceXL: design.spacing.xl,
  space2XL: design.spacing['2xl'],
} as const