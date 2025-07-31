import styled from 'styled-components'
import { colors, sizes } from '../../../constants/colors'

export const Controls = styled.div<{ isExpanded: boolean }>`
  background: transparent;
  margin-bottom: ${sizes.spaceXL};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`

export const ControlsHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${sizes.spaceMD} 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${sizes.spaceMD};
  }
`

export const ControlsContent = styled.div<{ isExpanded: boolean }>`
  padding: ${props => props.isExpanded ? `${sizes.spaceMD} 0` : '0'};
  max-height: ${props => props.isExpanded ? '300px' : '0'};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.isExpanded ? '1' : '0'};
`



export const ToggleButton = styled.button<{ isExpanded: boolean }>`
  padding: ${sizes.spaceMD} ${sizes.spaceLG};
  background: ${props => props.isExpanded 
    ? colors.highlightBorder
    : colors.textSecondary
  };
  color: white;
  border: ${props => props.isExpanded 
    ? `2px solid ${colors.selectedBorder}`
    : '2px solid transparent'
  };
  border-radius: ${sizes.spaceMD};
  font-size: ${sizes.fontSM};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${props => props.isExpanded 
    ? `0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 0 3px rgba(124, 152, 133, 0.3)`
    : `0 6px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
  };
  position: relative;
  
  /* Active state indicator */
  ${props => props.isExpanded && `
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: ${colors.highlightBorder};
      border-radius: ${sizes.spaceMD};
      z-index: -1;
      opacity: 0.2;
    }
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.isExpanded 
      ? `0 10px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 0 0 3px rgba(124, 152, 133, 0.4)`
      : `0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25)`
    };
  }
  
  &:active {
    transform: translateY(0);
  }
  
  /* Icon sizing */
  svg {
    width: 20px;
    height: 20px;
    
    /* Add margin only when there's text after the icon */
    &:not(:only-child) {
      margin-right: ${sizes.spaceXS};
    }
  }
`

export const CompactFilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${sizes.spaceLG};
  align-items: flex-end;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${sizes.spaceMD};
  }
`



export const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${sizes.spaceSM};
  font-size: ${sizes.fontLG};
  font-weight: 700;
  color: ${colors.textPrimary};
  white-space: nowrap;
  min-width: 40px;
  text-align: center;
  
  svg {
    width: 18px;
    height: 18px;
    color: ${colors.textSecondary};
  }
`

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${sizes.spaceMD};
  min-width: 0; /* Prevents flex items from overflowing */
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: ${sizes.spaceSM};
  }
`

export const FilterSelect = styled.select`
  padding: ${sizes.spaceMD} ${sizes.spaceLG};
  border: 2px solid ${colors.borderDefault};
  border-radius: ${sizes.spaceMD};
  font-size: ${sizes.fontSM};
  background: white;
  cursor: pointer;
  min-width: 180px;
  max-width: 220px;
  font-weight: 500;
  color: ${colors.textPrimary};
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${colors.selectedBorder};
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 
      0 6px 16px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.selectedBorder};
    box-shadow: 
      0 0 0 3px ${colors.focusRing},
      0 4px 12px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  
  option {
    padding: ${sizes.spaceSM};
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
  }
`

export const SearchInput = styled.input`
  padding: ${sizes.spaceMD} ${sizes.spaceLG};
  border: 2px solid ${colors.borderDefault};
  border-radius: ${sizes.spaceMD};
  font-size: ${sizes.fontSM};
  min-width: 250px;
  flex: 1;
  background: white;
  font-weight: 500;
  color: ${colors.textPrimary};
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${colors.selectedBorder};
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 
      0 6px 16px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.selectedBorder};
    background: white;
    box-shadow: 
      0 0 0 3px ${colors.focusRing},
      0 4px 12px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  
  &::placeholder {
    color: ${colors.textLight};
    font-weight: 400;
  }
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`



export const ResetButton = styled.button<{ disabled?: boolean }>`
  padding: ${sizes.spaceMD} ${sizes.spaceLG};
  background: ${props => props.disabled ? colors.borderDefault : colors.textLight};
  color: ${props => props.disabled ? colors.textLight : 'white'};
  border: ${props => props.disabled ? `2px solid transparent` : `2px solid transparent`};
  border-radius: ${sizes.spaceMD};
  font-size: ${sizes.fontSM};
  font-weight: 700;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  box-shadow: 
    0 6px 16px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background: ${colors.textSecondary};
    transform: translateY(-2px);
    box-shadow: 
      0 8px 20px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 8px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  
  /* Icon sizing */
  svg {
    width: 20px;
    height: 20px;
  }
`