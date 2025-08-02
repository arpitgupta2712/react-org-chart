/**
 * Animation Design Tokens - Timing and easing functions
 */

export const animation = {
  // Duration scale
  fast: '0.15s',
  normal: '0.3s',
  slow: '0.5s',
  
  // Easing functions
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const