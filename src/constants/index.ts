/**
 * Design System Exports - Clean, organized access to all design tokens
 */

// 🎨 Design tokens (organized by category)
export { colors, tierColors, baseColors, semanticColors, colorPaletteGuide } from './tokens/colors'
export { spacing, cardSpacing } from './tokens/spacing'
export { typography } from './tokens/typography'
export { shadows } from './tokens/shadows'
export { animation } from './tokens/animation'
export { breakpoints, mediaQueries } from './tokens/breakpoints'
export { zIndex } from './tokens/zIndex'
export { borderRadius } from './tokens/borderRadius'
export { opacity } from './tokens/opacity'

// 🎯 Combined design system
export { design, sizes } from './design'

// 🎨 Main theme object
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

// 🛠️ Utility functions
export { 
  getTierColors,
  isDarkBackground,
  getContrastText,
  getColor,
  getSpacing,
  getShadow,
  getFont,
  getStyledHelpers,
  styled
} from './utilities'

// 🏢 Hierarchy utilities
export { getHierarchyLabel } from '../utils/hierarchy'

// 📱 Media queries are exported as breakpoints for backward compatibility

// 🏢 Org chart configuration
export { ORG_CHART_CONFIG } from './orgChart'

// Re-export default theme
export { default } from './theme'