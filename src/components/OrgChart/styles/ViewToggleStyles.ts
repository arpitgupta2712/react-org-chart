import styled from 'styled-components'
import { colors, design } from '../../../constants/colors'

export const ViewToggleContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  box-shadow: ${design.shadows.sm};
  backdrop-filter: blur(10px);
  width: fit-content; /* Only take the space needed */

  @media (max-width: 768px) {
    padding: 0.375rem;
    gap: 0.375rem;
  }
`

export const ToggleButton = styled.button<{ 
  isActive: boolean
  disabled?: boolean
  isRecommended?: boolean
}>`
  font-family: ${design.typography.fontFamily};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border: 2px solid ${props => {
    if (props.disabled) return colors.appBackground
    if (props.isActive) return colors.selectedBorder
    if (props.isRecommended) return colors.highlightBorder
    return 'transparent'
  }};
  border-radius: 0.75rem;
  background: ${props => {
    if (props.disabled) return colors.appBackground
    if (props.isActive) return colors.selectedBorder
    return 'transparent'
  }};
  color: ${props => {
    if (props.disabled) return colors.textSecondary
    if (props.isActive) return 'white'
    return colors.textPrimary
  }};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all ${design.animation.normal} ${design.animation.easing};
  position: relative;
  opacity: ${props => props.disabled ? 0.6 : 1};
  min-width: 2.75rem;
  min-height: 2.75rem;

  &:hover:not(:disabled) {
    background: ${props => {
      if (props.isActive) return colors.highlightBorder
      if (props.isRecommended) return `${colors.highlightBorder}15`
      return `${colors.selectedBorder}10`
    }};
    border-color: ${props => {
      if (props.isActive) return colors.highlightBorder
      if (props.isRecommended) return colors.highlightBorder
      return colors.selectedBorder
    }};
    transform: translateY(-1px);
    box-shadow: ${design.shadows.buttonHover};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  /* Recommended indicator */
  ${props => props.isRecommended && !props.isActive && `
    &::after {
      content: '';
      position: absolute;
      top: -2px;
      right: -2px;
      width: 8px;
      height: 8px;
      background: ${colors.highlightBorder};
      border-radius: 50%;
      border: 2px solid white;
    }
  `}

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }

  /* Extra compact for narrow screens (tier view) */
  @media (max-width: 768px) and (orientation: portrait) {
    padding: 0.4rem;
    border-radius: 0.5rem;
    min-width: 2.25rem;
    min-height: 2.25rem;
  }
`

