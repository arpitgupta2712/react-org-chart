import styled from 'styled-components'
import { colors, sizes } from '../../../constants/colors'

export const Controls = styled.div`
  background: ${colors.cardBackground};
  padding: ${sizes.spaceXL};
  border-radius: ${sizes.cardBorderRadius};
  margin-bottom: ${sizes.spaceXL};
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.15),
    0 4px 10px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: ${sizes.spaceXL};
  align-items: flex-start;
  position: relative;
  overflow: hidden;

  /* Subtle pattern overlay similar to employee cards */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  /* Ensure content is above pattern */
  > * {
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: ${sizes.spaceLG};
    gap: ${sizes.spaceMD};
    flex-direction: column;
    align-items: stretch;
  }
`

export const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${sizes.spaceLG};
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.05);
  padding: ${sizes.spaceLG};
  border-radius: ${sizes.spaceSM};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${sizes.spaceMD};
  }
`

export const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${sizes.spaceSM};
  font-size: ${sizes.fontBase};
  font-weight: 700;
  color: ${colors.textPrimary};
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  svg {
    width: 16px;
    height: 16px;
    color: ${colors.textSecondary};
  }
`

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${sizes.spaceSM};
  min-width: 0; /* Prevents flex items from overflowing */
  
  &:last-child {
    margin-left: auto; /* Push action buttons to the right */
    
    @media (max-width: 768px) {
      margin-left: 0;
      justify-content: center;
    }
  }
  
  @media (max-width: 768px) {
    justify-content: space-between;
    flex-wrap: wrap;
  }
`

export const FilterSelect = styled.select`
  padding: ${sizes.spaceSM} ${sizes.spaceMD};
  border: 2px solid ${colors.borderDefault};
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  background: linear-gradient(135deg, white 0%, #f8f9fa 100%);
  cursor: pointer;
  min-width: 200px;
  font-weight: 500;
  color: ${colors.textPrimary};
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${colors.selectedBorder};
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    transform: translateY(-1px);
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.15),
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
`

export const SearchInput = styled.input`
  padding: ${sizes.spaceSM} ${sizes.spaceMD};
  border: 2px solid ${colors.borderDefault};
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  min-width: 300px;
  background: linear-gradient(135deg, white 0%, #f8f9fa 100%);
  font-weight: 500;
  color: ${colors.textPrimary};
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${colors.selectedBorder};
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    transform: translateY(-1px);
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.15),
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

export const ActionButton = styled.button`
  padding: ${sizes.spaceSM} ${sizes.spaceLG};
  background: linear-gradient(135deg, ${colors.selectedBorder} 0%, ${colors.highlightBorder} 100%);
  color: white;
  border: none;
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, ${colors.highlightBorder} 0%, ${colors.selectedBorder} 100%);
    transform: translateY(-2px);
    box-shadow: 
      0 6px 16px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 8px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
`

export const ResetButton = styled.button`
  padding: ${sizes.spaceSM} ${sizes.spaceLG};
  background: linear-gradient(135deg, ${colors.textLight} 0%, ${colors.textSecondary} 100%);
  color: white;
  border: none;
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, ${colors.textSecondary} 0%, #495057 100%);
    transform: translateY(-2px);
    box-shadow: 
      0 6px 16px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 8px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
`