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

// 📏 COMPLETE DESIGN SYSTEM - Everything in one place!
export const design = {
  // 📦 Spacing Scale
  spacing: {
    xs: '0.5rem',     // 8px
    sm: '0.75rem',    // 12px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '5rem',    // 80px
  },

  // 🎨 Card System
  card: {
    padding: '2.5rem',
    borderRadius: '1.5rem',
    gap: '2.5rem',
    borderWidth: '3px',
  },

  // 📱 Typography Scale
  typography: {
    // Base sizes
    fontXS: '0.875rem',   // 14px
    fontSM: '1rem',       // 16px
    fontBase: '1.125rem', // 18px
    fontLG: '1.25rem',    // 20px
    fontXL: '1.375rem',   // 22px
    font2XL: '1.625rem',  // 26px
    font3XL: '2rem',      // 32px
    
    // Component fonts
    employeeName: '1.75rem',     // 28px
    employeeTitle: '1.375rem',   // 22px
    employeeDetails: '1.125rem', // 18px
    employeeId: '1rem',          // 16px
    pageTitle: '2.5rem',         // 40px
    sectionTitle: '1.25rem',     // 20px
    
    // Font weights
    weightNormal: '400',
    weightMedium: '500',
    weightSemiBold: '600',
    weightBold: '700',
    weightExtraBold: '800',
  },

  // 🌫️ Shadows System
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.18)',
    '2xl': '0 20px 40px rgba(0, 0, 0, 0.2)',
    
    // Component shadows
    card: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
    cardHover: '0 20px 40px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.15)',
    button: '0 4px 12px rgba(0, 0, 0, 0.1)',
    buttonHover: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },

  // 🎭 Animation
  animation: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // 📱 Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // 🎯 Z-index
  zIndex: {
    dropdown: 10,
    modal: 40,
    tooltip: 60,
    overlay: 80,
  }
}

// 📏 Legacy sizes object for backward compatibility
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