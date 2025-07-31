import styled from 'styled-components'
import { getTierColors } from '../../../constants/colors'
import { colors, sizes } from '../../../constants/colors'

export const StyledEmployeeCard = styled.div<{
  tier: number
  compact: boolean
  hasReports: boolean
  isSelected: boolean
  isHighlighted: boolean
  isDimmed: boolean
}>`
  font-family: 'PT Sans', sans-serif;
  background: ${props => {
    const tierColors = getTierColors(props.tier);
    return tierColors.background;
  }};
  color: ${props => {
    const tierColors = getTierColors(props.tier);
    return tierColors.text;
  }};
  border: 3px solid ${props => {
    const tierColors = getTierColors(props.tier);
    return tierColors.border;
  }};
  border-radius: ${sizes.cardBorderRadius};
  padding: ${props => props.compact ? '2rem' : sizes.cardPadding};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  /* Enhanced shadows with multiple layers */
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.15),
    0 4px 10px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  /* Subtle pattern overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.2),
      0 8px 16px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  // Selected state - blue border with glow
  ${props => props.isSelected && `
    border: 4px solid ${colors.selectedBorder} !important;
    box-shadow: 
      0 0 0 4px rgba(127, 163, 184, 0.4),
      0 20px 40px rgba(127, 163, 184, 0.3),
      0 8px 16px rgba(0, 0, 0, 0.15) !important;
    transform: translateY(-8px);
    z-index: 2;
  `}

  // Highlighted state (subordinates) - green border  
  ${props => props.isHighlighted && `
    border: 3px solid ${colors.highlightBorder} !important;
    box-shadow: 
      0 0 0 3px ${colors.focusRing},
      0 15px 30px rgba(143, 166, 142, 0.25),
      0 6px 12px rgba(0, 0, 0, 0.1) !important;
    transform: translateY(-4px);
    z-index: 1;
  `}

  // Dimmed state
  ${props => props.isDimmed && `
    opacity: ${colors.dimmedOpacity};
    filter: grayscale(50%) brightness(0.8);
    transform: scale(0.96);
    
    &:hover {
      opacity: 0.6;
      filter: grayscale(30%) brightness(0.9);
      transform: scale(0.98);
    }
  `}
`

export const MissingData = styled.span`
  font-style: italic;
  font-size: 0.85em;
  font-weight: 500;
  opacity: 0.7;
  color: inherit;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
  cursor: help;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`