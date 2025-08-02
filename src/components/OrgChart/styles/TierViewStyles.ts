import styled from 'styled-components'
import { colors, design, getTierColors } from '../../../constants'

export const TierViewContainer = styled.div`
  font-family: ${design.typography.fontFamily};
  height: 100vh;
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  background: none;
  box-shadow: none;
  


  /* Touch feedback for better mobile experience */
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;

  .breadcrumb-sidebar {
    width: 20%;
    min-width: 180px;
    max-width: 220px;
    border-right: 2px solid ${colors.borderLight};
    padding: 1rem 2rem 1rem 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .breadcrumb-label {
    font-size: 0.875rem;
    font-weight: ${design.typography.weightBold};
    color: ${colors.textPrimary};
    margin-bottom: 1rem;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${colors.borderLight};
  }

  .breadcrumb-trail {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
  }

  .breadcrumb-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex-shrink: 0;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0.75rem;
    padding-bottom: 5rem;
    gap: 0.75rem;
    background: none;
    box-shadow: none;
    border: none;
  }

  .breadcrumb-card {
    border-radius: 0.5rem;
    padding: 0.75rem;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: ${design.shadows.sm};
    position: relative;

    /* Apply tier-based colors dynamically */
    ${props => {
      // Generate styles for each tier
      let tierStyles = '';
      for (let tier = 1; tier <= 8; tier++) {
        const tierColors = getTierColors(tier);
        tierStyles += `
          &[data-tier="${tier}"] {
            background: ${tierColors.background};
            border: 2px solid ${tierColors.border};
            color: ${tierColors.text};
          }
        `;
      }
      return tierStyles;
    }}

    &.current {
      box-shadow: 0 0 0 3px rgba(127, 163, 184, 0.3), ${design.shadows.md};
      transform: translateX(4px);
      border-left-width: 4px;
    }

    &.ancestor {
      opacity: 0.85;
      
      &:hover {
        opacity: 1;
        transform: translateX(2px);
        box-shadow: ${design.shadows.md};
      }
    }
  }

  .breadcrumb-name {
    font-weight: ${design.typography.weightBold};
    font-size: 1rem;
    line-height: 1.2;
    margin-bottom: 0.25rem;
    color: inherit; /* Use tier text color */
  }

  .breadcrumb-position {
    font-size: 0.875rem;
    line-height: 1.2;
    opacity: 0.9;
    color: inherit; /* Use tier text color */
  }

  .breadcrumb-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0.25rem 0;
    flex-shrink: 0;
    gap: 0.125rem;
  }

  .arrow-symbol {
    font-size: 1.2rem;
    color: ${colors.textSecondary};
    font-weight: bold;
    line-height: 1;
  }

  .dependent-count {
    font-size: 0.6875rem;
    color: ${colors.textSecondary};
    font-weight: ${design.typography.weightMedium};
    opacity: 0.8;
    background: ${colors.pageBackground};
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    white-space: nowrap;
    border: 1px solid ${colors.borderLight};
  }

  /* Two-tier layout: Primary + Secondary cards only (1 card per row) */
  .primary-tier {
    flex: 0 0 auto; /* Size based on content */
    margin-bottom: 0.5rem;
  }

  .secondary-tier {
    flex: 0 0 auto; /* Size based on content */
    margin-top: 0.5rem;
  }

  /* Card wrappers ensure proper sizing */
  .card-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* When only primary tier is shown */
  &.single-tier .primary-tier {
    flex: 0 0 auto; /* Don't stretch, natural size */
  }

  /* When both tiers are shown */
  &.two-tier {
    .primary-tier,
    .secondary-tier {
      flex: 0 0 auto; /* Both cards size naturally */
    }
  }

  /* Enhanced visual differentiation for primary vs secondary cards */
  .primary-tier {
    position: relative;
    
    /* Subtle blue gradient background for primary card */
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.05));
      border-radius: 0.75rem;
      z-index: -1;
      pointer-events: none;
    }
    
    .card-wrapper {
      position: relative;
      z-index: 1;
    }
  }

  .secondary-tier {
    position: relative;
    
    /* Subtle green gradient background for secondary card */
    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.04));
      border-radius: 0.75rem;
      z-index: -1;
      pointer-events: none;
    }
    
    .card-wrapper {
      position: relative;
      z-index: 1;
    }
  }

  @media (max-width: 768px) {
    .breadcrumb-sidebar {
      width: 25%;
      min-width: 140px;
      max-width: 160px;
      padding: 0.75rem;
    }

    .breadcrumb-label {
      font-size: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .breadcrumb-trail {
      gap: 0.5rem;
    }

    .breadcrumb-card {
      padding: 0.5rem;
    }

    .breadcrumb-name {
      font-size: 0.875rem;
    }

    .breadcrumb-position {
      font-size: 0.75rem;
    }

    .breadcrumb-arrow {
      margin: 0.125rem 0;
      gap: 0.1rem;
    }

    .arrow-symbol {
      font-size: 1rem;
    }

    .dependent-count {
      font-size: 0.625rem;
      padding: 0.1rem 0.2rem;
    }

    .main-content {
      padding: 0.5rem;
      padding-bottom: 4rem;
      gap: 0.5rem;
    }

    .primary-tier {
      margin-bottom: 0.375rem;
    }

    .secondary-tier {
      margin-top: 0.375rem;
    }
  }
`

export const ViewInfo = styled.div`
  text-align: center;
  padding: 0.5rem 0.75rem;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
  min-height: 4rem; /* Slightly increased for better spacing */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  
  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: ${design.typography.weightBold};
    color: ${colors.textPrimary};
    line-height: 1.25;
  }
  
  p {
    margin: 0;
    font-size: 0.875rem;
    color: ${colors.textSecondary};
    font-weight: ${design.typography.weightMedium};
    line-height: 1.25;
  }

  .selection-count {
    margin: 0;
    font-size: 0.75rem;
    color: ${colors.highlightBorder};
    font-weight: ${design.typography.weightSemiBold};
    background: rgba(255, 255, 255, 0.8);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    display: inline-block;
    border: 1px solid ${colors.selectedBorder};
    backdrop-filter: blur(5px);
  }

  @media (max-width: 768px) {
    padding: 0.375rem 0.5rem;
    min-height: 3.5rem;
    gap: 0.2rem;
    
    h3 {
      font-size: 1.25rem;
    }
    
    p {
      font-size: 1rem;
    }

    .selection-count {
      font-size: 0.9rem;
      padding: 0.2rem 0.6rem;
    }
  }
`

export const TierRow = styled.div`
  display: flex;
  align-items: flex-start; /* Don't stretch, align to top */
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem;

  /* Card wrapper takes remaining space */
  .card-wrapper {
    flex: 1;
    min-height: 0; /* Allow shrinking */
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0.375rem;
  }
`

export const TierLabel = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-weight: ${design.typography.weightBold};
  font-size: 1.2rem;
  color: ${colors.textSecondary};
  background: ${colors.appBackground};
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  width: 2.5rem; /* Fixed width instead of min-width */
  min-height: 120px; /* Minimum height instead of 100% */
  max-height: 200px; /* Maximum height to prevent excessive stretching */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: ${design.shadows.sm};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  flex-shrink: 0; /* Don't shrink */

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.75rem 0.375rem;
    width: 2rem;
  }
`

export const NavigationControls = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  gap: 0.75rem;
  z-index: 1000;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }
`

export const NavButton = styled.button<{ disabled?: boolean }>`
  font-family: ${design.typography.fontFamily};
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.75rem;
  background: ${props => props.disabled ? colors.appBackground : colors.selectedBorder};
  color: ${props => props.disabled ? colors.textSecondary : 'white'};
  font-weight: ${design.typography.weightMedium};
  font-size: 0.875rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all ${design.animation.normal} ${design.animation.easing};
  opacity: ${props => props.disabled ? 0.5 : 1};
  flex: 1;
  justify-content: center;
  min-height: 3rem;
  box-shadow: ${design.shadows.sm};

  &:hover:not(:disabled) {
    background: ${colors.highlightBorder};
    transform: translateY(-2px);
    box-shadow: ${design.shadows.buttonHover};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  span {
    white-space: nowrap;
    font-size: 0.8125rem;
    font-weight: ${design.typography.weightSemiBold};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    min-height: 2.5rem;
    gap: 0.25rem;
    
    span {
      font-size: 0.6875rem;
    }
  }

  @media (max-width: 480px) {
    span {
      display: none; /* Hide text on very small screens, show only icons */
    }
  }
`

export const ConnectionLine = styled.div`
  position: relative;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
  flex-shrink: 0;

  /* Main vertical line */
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, 
      ${colors.selectedBorder} 0%, 
      ${colors.highlightBorder} 50%, 
      ${colors.selectedBorder} 100%
    );
    border-radius: 2px;
    transform: translateX(-50%);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }

  /* Connection points at top and bottom */
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 12px;
    height: 12px;
    background: ${colors.highlightBorder};
    border: 3px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  }

  @media (max-width: 768px) {
    height: 3rem;
    margin: 0.25rem 0;

    &::before {
      width: 2px;
    }

    &::after {
      width: 10px;
      height: 10px;
      border: 2px solid white;
    }

    .connection-count {
      font-size: 0.75rem;
      padding: 0.2rem 0.4rem;
    }
  }

  .connection-count {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${colors.cardBackground};
    color: ${colors.textSecondary};
    font-size: 1rem;
    font-weight: ${design.typography.weightMedium};
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    border: 1px solid ${colors.borderLight};
    box-shadow: ${design.shadows.sm};
    white-space: nowrap;
    z-index: 3;
  }
`

export const SwipeHint = styled.div`
  position: fixed;
  bottom: 4.5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 1.2rem;
  color: ${colors.textSecondary};
  font-style: italic;
  opacity: 0.6;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  z-index: 999;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.125rem 0.5rem;
    bottom: 4rem;
  }
`

/* Animation for tier transitions */
export const TierTransition = styled.div<{ direction?: 'left' | 'right' | 'up' | 'down' }>`
  animation: ${props => {
    switch (props.direction) {
      case 'left':
        return 'slideInLeft'
      case 'right':
        return 'slideInRight'
      case 'up':
        return 'slideInUp'
      case 'down':
        return 'slideInDown'
      default:
        return 'fadeIn'
    }
  }} ${design.animation.normal} ${design.animation.easing};

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInDown {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`