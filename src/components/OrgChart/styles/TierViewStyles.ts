import styled from 'styled-components'
import { colors, design } from '../../../constants/colors'

export const TierViewContainer = styled.div`
  font-family: ${design.typography.fontFamily};
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  padding: 0.75rem;
  padding-bottom: 5rem; /* Space for fixed bottom navigation */
  gap: 0.5rem;

  /* Touch feedback for better mobile experience */
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;

  /* Two-tier layout: Equal height cards with space for connection line */
  .primary-tier {
    height: 42%; /* Slightly reduced to make room for connection line */
    margin-bottom: 0.5rem;
  }

  .secondary-tier {
    height: 42%; /* Slightly reduced to make room for connection line */
    margin-top: 0.5rem;
  }

  /* When only primary tier is shown, keep consistent height */
  &.single-tier .primary-tier {
    height: 42%; /* Keep same height as when there are two cards */
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    padding-bottom: 4.5rem; /* Smaller space for mobile bottom nav */
    gap: 0.375rem;

    .primary-tier {
      height: 41%; /* Equal height for mobile with connection space */
      margin-bottom: 0.375rem;
    }

    .secondary-tier {
      height: 41%; /* Equal height for mobile with connection space */
      margin-top: 0.375rem;
    }

    /* When only primary tier is shown on mobile */
    &.single-tier .primary-tier {
      height: 41%; /* Keep same height as when there are two cards */
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
  
  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: ${design.typography.weightBold};
    color: ${colors.textPrimary};
    line-height: 1.2;
  }
  
  p {
    margin: 0;
    font-size: 0.875rem;
    color: ${colors.textSecondary};
    font-weight: ${design.typography.weightMedium};
    line-height: 1.1;
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
      font-size: 1.2rem;
    }
    
    p {
      font-size: 0.9rem;
    }

    .selection-count {
      font-size: 0.9rem;
      padding: 0.2rem 0.6rem;
    }
  }
`

export const TierRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem;

  /* Employee card should take remaining space and full height */
  > div:not(:first-child) {
    flex: 1;
    height: 100%;
    min-height: 0; /* Allow shrinking */
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
  height: 100%; /* Take full height of the tier row */
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
  height: 8rem;
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
    height: 5rem;
    margin: 0.25rem 0;

    &::before {
      width: 2px;
    }

    &::after {
      width: 10px;
      height: 10px;
      border: 2px solid white;
    }
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