/**
 * Shadow Design Tokens - Elevation and depth system
 */

export const shadows = {
  // Base shadow scale
  sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
  md: '0 4px 8px rgba(0, 0, 0, 0.12)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
  xl: '0 12px 24px rgba(0, 0, 0, 0.18)',
  '2xl': '0 20px 40px rgba(0, 0, 0, 0.2)',
  
  // Component-specific shadows
  card: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
  cardHover: '0 20px 40px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.15)',
  button: '0 4px 12px rgba(0, 0, 0, 0.1)',
  buttonHover: '0 6px 16px rgba(0, 0, 0, 0.15)',
} as const