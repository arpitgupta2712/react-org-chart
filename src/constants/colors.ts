// 🎨 SINGLE SOURCE OF TRUTH FOR ALL COLORS AND STYLES
// This is the ONLY file you need to edit for colors and styling!

// 🌿 Natural, earthy color palette
export const colors = {
  // Tier Colors - Each tier gets its own earthy color
  tier1: {
    background: 'linear-gradient(135deg, #8FA68E, #A5BBA4)', // Sage
    border: '#7A917A',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    shadow: '0 4px 12px rgba(143, 166, 142, 0.3)'
  },
  tier2: {
    background: 'linear-gradient(135deg, #C17767, #D08B7C)', // Terracotta  
    border: '#B06556',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    shadow: '0 4px 12px rgba(193, 119, 103, 0.3)'
  },
  tier3: {
    background: 'linear-gradient(135deg, #7FA3B8, #94B4C6)', // Sky
    border: '#6D91A6', 
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    shadow: '0 4px 12px rgba(127, 163, 184, 0.3)'
  },
  tier4: {
    background: 'linear-gradient(135deg, #D4C4A0, #E0D1B2)', // Sand
    border: '#C3B38F',
    text: '#3E3E3A',
    textSecondary: '#5C5C57', 
    shadow: '0 4px 12px rgba(212, 196, 160, 0.3)'
  },
  tier5: {
    background: 'linear-gradient(135deg, #7A9A65, #8FAB7A)', // Moss
    border: '#688554',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    shadow: '0 4px 12px rgba(122, 154, 101, 0.3)'
  },
  tier6: {
    background: 'linear-gradient(135deg, #B08D7A, #C19E8C)', // Clay
    border: '#9F7C69',
    text: '#FFFFFF', 
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    shadow: '0 4px 12px rgba(176, 141, 122, 0.3)'
  },
  tier7: {
    background: 'linear-gradient(135deg, #6B8E8F, #7F9FA0)', // Ocean
    border: '#597C7D',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    shadow: '0 4px 12px rgba(107, 142, 143, 0.3)'
  },
  tier8: {
    background: 'linear-gradient(135deg, #9B9B9B, #ACACAC)', // Stone  
    border: '#8A8A8A',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    shadow: '0 4px 12px rgba(155, 155, 155, 0.3)'
  },

  // App Background & Basic Colors
  appBackground: 'linear-gradient(135deg, #8FA68E 0%, #7FA3B8 100%)',
  cardBackground: '#FFFFFF',
  pageBackground: '#FAFAF9',
  
  // Text Colors  
  textPrimary: '#2B2B28',
  textSecondary: '#5C5C57',
  textLight: '#757570',
  textWhite: '#FFFFFF',
  
  // Border & Interactive
  borderLight: '#E0E0DD',
  borderDefault: '#CCCCC7', 
  hoverOverlay: 'rgba(0, 0, 0, 0.05)',
  focusRing: 'rgba(127, 163, 184, 0.3)',
  
  // States
  highlightBorder: '#8FA68E', // Sage for highlighting subordinates
  selectedBorder: '#7FA3B8',  // Sky for selected cards
  dimmedOpacity: 0.4,
  
  // Semantic (Success, Warning, etc)
  success: '#6B9F6B',
  warning: '#D4A574', 
  error: '#C17B7B',
  info: '#7BA7C1'
}

// 📏 Sizes & Typography - All in one place!
export const sizes = {
  // Card Dimensions
  cardPadding: '1.5rem',
  cardBorderRadius: '1rem', 
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