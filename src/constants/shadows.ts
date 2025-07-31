// Shadow system for consistent depth and elevation

export const shadows = {
  // Base shadow scale
  none: 'none',
  
  // Elevation levels (Material Design inspired)
  elevation: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.35)'
  },

  // Colored shadows for interactive states
  colored: {
    primary: {
      sm: '0 2px 4px rgba(102, 126, 234, 0.1)',
      md: '0 4px 12px rgba(102, 126, 234, 0.15)',
      lg: '0 8px 30px rgba(102, 126, 234, 0.2)',
      xl: '0 12px 40px rgba(102, 126, 234, 0.25)'
    },
    success: {
      sm: '0 2px 4px rgba(56, 161, 105, 0.1)',
      md: '0 4px 12px rgba(56, 161, 105, 0.15)',
      lg: '0 8px 30px rgba(56, 161, 105, 0.2)'
    },
    warning: {
      sm: '0 2px 4px rgba(255, 193, 7, 0.1)',
      md: '0 4px 12px rgba(255, 193, 7, 0.15)',
      lg: '0 8px 30px rgba(255, 193, 7, 0.25)'
    },
    error: {
      sm: '0 2px 4px rgba(229, 62, 62, 0.1)',
      md: '0 4px 12px rgba(229, 62, 62, 0.15)',
      lg: '0 8px 30px rgba(229, 62, 62, 0.2)'
    }
  },

  // Inset shadows for pressed/active states
  inset: {
    sm: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    lg: 'inset 0 4px 6px 0 rgba(0, 0, 0, 0.07)'
  },

  // Focus ring shadows
  focus: {
    default: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    error: '0 0 0 3px rgba(229, 62, 62, 0.1)',
    success: '0 0 0 3px rgba(56, 161, 105, 0.1)'
  },

  // Component-specific shadows
  components: {
    // Employee Card Shadows
    employeeCard: {
      default: '0 4px 20px rgba(0,0,0,0.06)',
      hover: '0 8px 30px rgba(0,0,0,0.12)',
      selected: '0 0 20px rgba(102, 126, 234, 0.5)',
      highlighted: '0 0 15px rgba(255, 193, 7, 0.4)'
    },

    // Page Header Shadows
    pageHeader: {
      default: '0 4px 20px rgba(0,0,0,0.1)'
    },

    // Button Shadows
    button: {
      default: '0 2px 4px rgba(0,0,0,0.1)',
      hover: '0 4px 8px rgba(0,0,0,0.15)',
      active: 'inset 0 2px 4px rgba(0,0,0,0.1)'
    },

    // Toggle Button Shadows
    toggleButton: {
      default: '0 4px 12px rgba(102, 126, 234, 0.3)',
      hover: '0 6px 16px rgba(102, 126, 234, 0.4)'
    },

    // Report Card Shadows
    reportCard: {
      default: '0 2px 4px rgba(0,0,0,0.05)',
      hover: '0 2px 8px rgba(0,0,0,0.1)'
    },

    // Modal/Overlay Shadows
    modal: {
      backdrop: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      content: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },

    // Dropdown Shadows
    dropdown: {
      default: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      large: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },

    // Form Input Shadows
    input: {
      default: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      focus: '0 0 0 3px rgba(102, 126, 234, 0.1)',
      error: '0 0 0 3px rgba(229, 62, 62, 0.1)'
    }
  }
} as const

// CSS Custom Properties for Shadows
export const cssShadows = {
  // Elevation
  '--shadow-xs': shadows.elevation.xs,
  '--shadow-sm': shadows.elevation.sm,
  '--shadow-base': shadows.elevation.base,
  '--shadow-md': shadows.elevation.md,
  '--shadow-lg': shadows.elevation.lg,
  '--shadow-xl': shadows.elevation.xl,
  '--shadow-2xl': shadows.elevation['2xl'],
  '--shadow-3xl': shadows.elevation['3xl'],

  // Focus
  '--shadow-focus': shadows.focus.default,
  '--shadow-focus-error': shadows.focus.error,
  '--shadow-focus-success': shadows.focus.success,

  // Colored shadows
  '--shadow-primary-sm': shadows.colored.primary.sm,
  '--shadow-primary-md': shadows.colored.primary.md,
  '--shadow-primary-lg': shadows.colored.primary.lg,
  '--shadow-primary-xl': shadows.colored.primary.xl,

  // Component shadows
  '--shadow-employee-card': shadows.components.employeeCard.default,
  '--shadow-employee-card-hover': shadows.components.employeeCard.hover,
  '--shadow-employee-card-selected': shadows.components.employeeCard.selected,
  '--shadow-employee-card-highlighted': shadows.components.employeeCard.highlighted,

  '--shadow-page-header': shadows.components.pageHeader.default,

  '--shadow-button': shadows.components.button.default,
  '--shadow-button-hover': shadows.components.button.hover,
  '--shadow-button-active': shadows.components.button.active,

  '--shadow-toggle-btn': shadows.components.toggleButton.default,
  '--shadow-toggle-btn-hover': shadows.components.toggleButton.hover,

  '--shadow-report-card': shadows.components.reportCard.default,
  '--shadow-report-card-hover': shadows.components.reportCard.hover,

  '--shadow-dropdown': shadows.components.dropdown.default,
  '--shadow-dropdown-large': shadows.components.dropdown.large,

  '--shadow-input': shadows.components.input.default,
  '--shadow-input-focus': shadows.components.input.focus,
  '--shadow-input-error': shadows.components.input.error,

  '--shadow-modal': shadows.components.modal.content,
} as const