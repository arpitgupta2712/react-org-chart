/**
 * Color Design Tokens - Single source of truth for all colors
 * 🌿 Natural, earthy color palette with solid colors only
 */

// Tier-specific color definitions
export const tierColors = {
  tier1: {
    background: '#7C9885', // Forest Green - Leadership
    border: '#6B8574',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    shadow: '0 4px 16px rgba(124, 152, 133, 0.25)'
  },
  tier2: {
    background: '#A67C6D', // Warm Clay - Senior Management
    border: '#956B5C',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    shadow: '0 4px 16px rgba(166, 124, 109, 0.25)'
  },
  tier3: {
    background: '#6A8CAF', // Dusty Blue - Middle Management
    border: '#5A7A9C',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    shadow: '0 4px 16px rgba(106, 140, 175, 0.25)'
  },
  tier4: {
    background: '#C7B299', // Warm Sand - Team Leads
    border: '#B5A087',
    text: '#2D2D2A',
    textSecondary: '#4A4A47',
    shadow: '0 4px 16px rgba(199, 178, 153, 0.25)'
  },
  tier5: {
    background: '#8A9A7E', // Olive - Specialists
    border: '#78886C',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    shadow: '0 4px 16px rgba(138, 154, 126, 0.25)'
  },
  tier6: {
    background: '#B89F93', // Taupe - Support
    border: '#A68D81',
    text: '#2D2D2A',
    textSecondary: '#4A4A47',
    shadow: '0 4px 16px rgba(184, 159, 147, 0.25)'
  },
  tier7: {
    background: '#7A8E95', // Storm - Technical
    border: '#687C83',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    shadow: '0 4px 16px rgba(122, 142, 149, 0.25)'
  },
  tier8: {
    background: '#9A9A9A', // Neutral Gray - Entry Level
    border: '#888888',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    shadow: '0 4px 16px rgba(154, 154, 154, 0.25)'
  }
} as const

// Base application colors
export const baseColors = {
  // App Background & Basic Colors
  appBackground: '#F5F3F0', // Warm off-white
  cardBackground: '#FFFFFF',
  pageBackground: '#FAFAF8',
  
  // Text Colors  
  textPrimary: '#2D2D2A',
  textSecondary: '#5A5A57',
  textLight: '#787875',
  textWhite: '#FFFFFF',
  
  // Border & Interactive
  borderLight: '#E8E6E3',
  borderDefault: '#D4D2CF',
  hoverOverlay: 'rgba(0, 0, 0, 0.04)',
  focusRing: 'rgba(106, 140, 175, 0.4)',
  
  // States
  highlightBorder: '#7C9885', // Forest for highlighting subordinates
  selectedBorder: '#6A8CAF',   // Dusty Blue for selected cards
  dimmedOpacity: 0.35
} as const

// Semantic colors
export const semanticColors = {
  success: '#7A9A7E',
  warning: '#C7A574',
  error: '#B87B7B',
  info: '#6A8CAF'
} as const

// Combined colors object for backward compatibility
export const colors = {
  ...tierColors,
  ...baseColors,
  ...semanticColors
} as const

// Color palette reference guide
export const colorPaletteGuide = {
  tier1: { name: 'Forest Green', hex: '#7C9885', usage: 'Executive' },
  tier2: { name: 'Warm Clay', hex: '#A67C6D', usage: 'Senior Management' },
  tier3: { name: 'Dusty Blue', hex: '#6A8CAF', usage: 'Middle Management' },
  tier4: { name: 'Warm Sand', hex: '#C7B299', usage: 'Team Leaders' },
  tier5: { name: 'Olive', hex: '#8A9A7E', usage: 'Senior Staff' },
  tier6: { name: 'Taupe', hex: '#B89F93', usage: 'Staff' },
  tier7: { name: 'Storm', hex: '#7A8E95', usage: 'Junior Staff' },
  tier8: { name: 'Neutral Gray', hex: '#9A9A9A', usage: 'Entry Level' }
} as const