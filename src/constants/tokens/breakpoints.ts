/**
 * Breakpoint Design Tokens - Responsive design breakpoints
 */

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Media query helpers
export const mediaQueries = {
  xs: '(max-width: 320px)',
  sm: '(max-width: 640px)', 
  md: '(max-width: 768px)',
  lg: '(max-width: 1024px)',
  xl: '(max-width: 1280px)',
  '2xl': '(max-width: 1536px)'
} as const