/**
 * Typography Design Tokens - Font scales and component typography
 */

export const typography = {
  // Font Family - PT Sans everywhere!
  fontFamily: "'PT Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  
  // Base font sizes
  fontXS: '0.875rem',   // 14px
  fontSM: '1rem',       // 16px
  fontBase: '1.125rem', // 18px
  fontLG: '1.25rem',    // 20px
  fontXL: '1.375rem',   // 22px
  font2XL: '1.625rem',  // 26px
  font3XL: '2rem',      // 32px
  
  // Component-specific fonts
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
} as const