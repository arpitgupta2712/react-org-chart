// 🎨 SINGLE SOURCE OF TRUTH FOR ALL COLORS AND STYLES
// This is the ONLY file you need to edit for colors and styling!

// 🌿 Natural, earthy color palette - SOLID COLORS ONLY
export const colors = {
  // Tier Colors - Each tier gets its own earthy solid color
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
  },

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
  dimmedOpacity: 0.35,
  
  // Semantic (Success, Warning, etc) - Muted natural tones
  success: '#7A9A7E',
  warning: '#C7A574',
  error: '#B87B7B',
  info: '#6A8CAF'
}

// 📏 Sizes & Typography - All in one place!
export const sizes = {
  // Card Dimensions
  cardPadding: '1.5rem',
  cardBorderRadius: '0.75rem', 
  cardMinHeight: '13rem',
  cardGap: '1.5rem',
  
  // Font Sizes
  fontXS: '0.875rem',
  fontSM: '1rem', 
  fontBase: '1.125rem',
  fontLG: '1.25rem',
  fontXL: '1.375rem',
  font2XL: '1.625rem',
  
  // Component-specific fonts
  employeeName: '1.25rem',
  employeeTitle: '1.0625rem', 
  employeeDetails: '0.9375rem',
  employeeId: '0.875rem',
  pageTitle: '2rem',
  
  // Spacing
  spaceXS: '0.25rem',
  spaceSM: '0.5rem', 
  spaceMD: '0.75rem',
  spaceLG: '1rem',
  spaceXL: '1.5rem',
  space2XL: '2rem'
}

// 🎯 Helper function - Get tier colors easily
export const getTierColors = (tier: number): {
  background: string;
  border: string;
  text: string;
  textSecondary: string;
  shadow: string;
} => {
  const tierKey = `tier${Math.min(Math.max(1, tier), 8)}` as keyof typeof colors
  return (colors[tierKey] as any) || colors.tier1
}

// 🎨 Color Palette Reference Guide
export const colorPaletteGuide = {
  tier1: { name: 'Forest Green', hex: '#7C9885', usage: 'CEO/Leadership' },
  tier2: { name: 'Warm Clay', hex: '#A67C6D', usage: 'Senior Management' },
  tier3: { name: 'Dusty Blue', hex: '#6A8CAF', usage: 'Middle Management' },
  tier4: { name: 'Warm Sand', hex: '#C7B299', usage: 'Team Leads' },
  tier5: { name: 'Olive', hex: '#8A9A7E', usage: 'Specialists' },
  tier6: { name: 'Taupe', hex: '#B89F93', usage: 'Support Staff' },
  tier7: { name: 'Storm', hex: '#7A8E95', usage: 'Technical Staff' },
  tier8: { name: 'Neutral Gray', hex: '#9A9A9A', usage: 'Entry Level' }
}

// 🎯 Additional utility functions
export const isDarkBackground = (tier: number): boolean => {
  // Tiers 4 and 6 have light backgrounds with dark text
  return ![4, 6].includes(tier)
}

export const getContrastText = (tier: number): string => {
  return isDarkBackground(tier) ? colors.textWhite : colors.textPrimary
}