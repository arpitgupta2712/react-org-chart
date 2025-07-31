// Spacing system - margins, paddings, gaps, dimensions

export const spacing = {
  // Base spacing scale (rem units for accessibility)
  scale: {
    0: '0rem',
    px: '0.0625rem',   // 1px
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
    36: '9rem',        // 144px
    40: '10rem',       // 160px
    44: '11rem',       // 176px
    48: '12rem',       // 192px
    52: '13rem',       // 208px
    56: '14rem',       // 224px
    60: '15rem',       // 240px
    64: '16rem',       // 256px
    72: '18rem',       // 288px
    80: '20rem',       // 320px
    96: '24rem'        // 384px
  },

  // Component-specific spacing
  components: {
    // Employee Card Spacing
    employeeCard: {
      padding: '1.25rem',           // 20px
      paddingCompact: '1rem',       // 16px
      headerMarginBottom: '0.75rem', // 12px
      titleMarginBottom: '0.75rem',  // 12px
      titleMarginBottomCompact: '0.5rem', // 8px
      detailRowMarginBottom: '0.375rem',  // 6px
      reportsMarginTop: '1rem',     // 16px
      reportsPaddingTop: '0.75rem', // 12px
      minHeight: '11.25rem',        // 180px
      minHeightCompact: '7.5rem',   // 120px
      borderRadius: '1rem',         // 16px
      gap: '1.25rem'                // 20px for grid
    },

    // Page Header Spacing
    pageHeader: {
      padding: '1.5rem 2rem',       // 24px 32px
      paddingMobile: '1rem 1.5rem', // 16px 24px
      margin: '1.25rem',            // 20px
      marginMobile: '0.75rem',      // 12px
      borderRadius: '0.75rem',      // 12px
      titleMarginBottom: '0.5rem'   // 8px
    },

    // Controls Spacing
    controls: {
      padding: '1.25rem 1.5rem',    // 20px 24px
      paddingMobile: '1rem',        // 16px
      gap: '1.25rem',               // 20px
      gapMobile: '0.75rem',         // 12px
      inputPadding: '0.5rem 0.75rem', // 8px 12px
      buttonPadding: '0.5rem 1rem', // 8px 16px
      buttonPaddingMobile: '0.375rem 0.75rem', // 6px 12px
      borderRadius: '0.5rem',       // 8px
      minWidth: '12.5rem'           // 200px for selects
    },

    // Statistics Spacing
    stats: {
      padding: '0.75rem 1.5rem',    // 12px 24px
      paddingMobile: '0.5rem 1rem'  // 8px 16px
    },

    // Employee Grid Spacing
    employeeGrid: {
      padding: '1.5rem',            // 24px
      paddingMobile: '1rem',        // 16px
      gap: '1.25rem',               // 20px
      gapMobile: '1rem',            // 16px
      minColumnWidth: '21.25rem',   // 340px
      minColumnWidthMobile: '100%'  // Full width on mobile
    },

    // Toggle Button Spacing
    toggleButton: {
      width: '2rem',                // 32px
      height: '2rem',               // 32px
      widthCompact: '1.5rem',       // 24px
      heightCompact: '1.5rem',      // 24px
      right: '1rem',                // 16px
      rightCompact: '0.75rem',      // 12px
      bottom: '1rem',               // 16px
      bottomCompact: '0.75rem'      // 12px
    },

    // Direct Reports Spacing
    directReports: {
      marginTop: '1rem',            // 16px
      padding: '1rem',              // 16px
      borderRadius: '0.75rem',      // 12px
      titleMarginBottom: '0.75rem', // 12px
      gridGap: '0.75rem',           // 12px
      gridGapCompact: '0.5rem',     // 8px
      cardPadding: '0.75rem',       // 12px
      cardBorderRadius: '0.625rem'  // 10px
    },

    // Report Cards Spacing
    reportCard: {
      padding: '0.75rem',           // 12px
      borderRadius: '0.625rem',     // 10px
      nameMarginBottom: '0.25rem',  // 4px
      titleMarginBottom: '0.125rem', // 2px
      minWidth: '12.5rem',          // 200px
      minWidthCompact: '9.375rem'   // 150px
    },

    // Badge Spacing
    badge: {
      padding: '0.25rem 0.625rem',  // 4px 10px
      paddingCompact: '0.125rem 0.375rem', // 2px 6px
      borderRadius: '0.75rem',      // 12px
      marginBottom: '0.5rem',       // 8px
      marginBottomCompact: '0.25rem' // 4px
    }
  },

  // Layout spacing
  layout: {
    containerMaxWidth: '80rem',     // 1280px
    sidebarWidth: '16rem',          // 256px
    headerHeight: '4rem',           // 64px
    footerHeight: '3rem',           // 48px
    contentPadding: '2rem',         // 32px
    contentPaddingMobile: '1rem',   // 16px
    sectionGap: '3rem',             // 48px
    sectionGapMobile: '2rem'        // 32px
  },

  // Form spacing
  form: {
    fieldGap: '1rem',               // 16px
    labelMarginBottom: '0.5rem',    // 8px
    inputPadding: '0.75rem 1rem',   // 12px 16px
    buttonPadding: '0.75rem 1.5rem', // 12px 24px
    groupGap: '1.5rem'              // 24px
  }
} as const

// CSS Custom Properties for Spacing
export const cssSpacing = {
  // Base scale
  '--space-0': spacing.scale[0],
  '--space-px': spacing.scale.px,
  '--space-1': spacing.scale[1],
  '--space-2': spacing.scale[2],
  '--space-3': spacing.scale[3],
  '--space-4': spacing.scale[4],
  '--space-5': spacing.scale[5],
  '--space-6': spacing.scale[6],
  '--space-8': spacing.scale[8],
  '--space-10': spacing.scale[10],
  '--space-12': spacing.scale[12],
  '--space-16': spacing.scale[16],
  '--space-20': spacing.scale[20],
  '--space-24': spacing.scale[24],

  // Employee Card Spacing
  '--employee-card-padding': spacing.components.employeeCard.padding,
  '--employee-card-padding-compact': spacing.components.employeeCard.paddingCompact,
  '--employee-card-border-radius': spacing.components.employeeCard.borderRadius,
  '--employee-card-min-height': spacing.components.employeeCard.minHeight,
  '--employee-card-min-height-compact': spacing.components.employeeCard.minHeightCompact,
  '--employee-card-gap': spacing.components.employeeCard.gap,
  '--employee-header-margin-bottom': spacing.components.employeeCard.headerMarginBottom,
  '--employee-title-margin-bottom': spacing.components.employeeCard.titleMarginBottom,
  '--employee-title-margin-bottom-compact': spacing.components.employeeCard.titleMarginBottomCompact,
  '--employee-detail-row-margin-bottom': spacing.components.employeeCard.detailRowMarginBottom,

  // Page Header Spacing
  '--page-header-padding': spacing.components.pageHeader.padding,
  '--page-header-padding-mobile': spacing.components.pageHeader.paddingMobile,
  '--page-header-margin': spacing.components.pageHeader.margin,
  '--page-header-margin-mobile': spacing.components.pageHeader.marginMobile,
  '--page-header-border-radius': spacing.components.pageHeader.borderRadius,

  // Controls Spacing
  '--controls-padding': spacing.components.controls.padding,
  '--controls-padding-mobile': spacing.components.controls.paddingMobile,
  '--controls-gap': spacing.components.controls.gap,
  '--controls-gap-mobile': spacing.components.controls.gapMobile,
  '--controls-input-padding': spacing.components.controls.inputPadding,
  '--controls-button-padding': spacing.components.controls.buttonPadding,
  '--controls-border-radius': spacing.components.controls.borderRadius,

  // Grid Spacing
  '--grid-padding': spacing.components.employeeGrid.padding,
  '--grid-padding-mobile': spacing.components.employeeGrid.paddingMobile,
  '--grid-gap': spacing.components.employeeGrid.gap,
  '--grid-gap-mobile': spacing.components.employeeGrid.gapMobile,
  '--grid-min-column-width': spacing.components.employeeGrid.minColumnWidth,

  // Toggle Button Spacing
  '--toggle-btn-size': spacing.components.toggleButton.width,
  '--toggle-btn-size-compact': spacing.components.toggleButton.widthCompact,
  '--toggle-btn-right': spacing.components.toggleButton.right,
  '--toggle-btn-bottom': spacing.components.toggleButton.bottom,

  // Badge Spacing
  '--badge-padding': spacing.components.badge.padding,
  '--badge-padding-compact': spacing.components.badge.paddingCompact,
  '--badge-border-radius': spacing.components.badge.borderRadius,
  '--badge-margin-bottom': spacing.components.badge.marginBottom,

  // Layout
  '--container-max-width': spacing.layout.containerMaxWidth,
  '--content-padding': spacing.layout.contentPadding,
  '--content-padding-mobile': spacing.layout.contentPaddingMobile,
  '--section-gap': spacing.layout.sectionGap,
  '--section-gap-mobile': spacing.layout.sectionGapMobile,
} as const