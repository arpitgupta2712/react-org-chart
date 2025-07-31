import styled from 'styled-components'
import { colors, sizes } from '../../../constants/colors'

export const Controls = styled.div<{ isExpanded: boolean }>`
  background: ${colors.cardBackground};
  border-radius: ${sizes.cardBorderRadius};
  margin-bottom: ${sizes.spaceXL};
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.15),
    0 4px 10px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

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
`

export const ControlsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${sizes.spaceLG} ${sizes.spaceXL};
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  min-height: 60px;
  
  @media (max-width: 768px) {
    padding: ${sizes.spaceMD} ${sizes.spaceLG};
    flex-direction: column;
    gap: ${sizes.spaceMD};
    align-items: stretch;
  }
`

export const ControlsContent = styled.div<{ isExpanded: boolean }>`
  padding: ${props => props.isExpanded ? `${sizes.spaceLG} ${sizes.spaceXL}` : '0'};
  max-height: ${props => props.isExpanded ? '300px' : '0'};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.isExpanded ? '1' : '0'};
  
  @media (max-width: 768px) {
    padding: ${props => props.isExpanded ? `${sizes.spaceMD} ${sizes.spaceLG}` : '0'};
  }
`

export const QuickStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  font-weight: 600;
  color: ${colors.textPrimary};
  
  span {
    white-space: nowrap;
  }
  
  @media (max-width: 768px) {
    font-size: ${sizes.fontXS};
    flex-wrap: wrap;
    justify-content: center;
  }
`

export const ToggleButton = styled.button<{ isExpanded: boolean }>`
  padding: ${sizes.spaceSM} ${sizes.spaceLG};
  background: ${props => props.isExpanded 
    ? `linear-gradient(135deg, ${colors.highlightBorder} 0%, ${colors.selectedBorder} 100%)`
    : `linear-gradient(135deg, ${colors.textSecondary} 0%, ${colors.textLight} 100%)`
  };
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
    transform: translateY(-1px);
    box-shadow: 
      0 6px 16px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
  
  &:active {
    transform: translateY(0);
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
  gap: ${sizes.spaceSM};
  min-width: 0; /* Prevents flex items from overflowing */
  
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
  min-width: 180px;
  max-width: 220px;
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
  
  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
  }
`

export const SearchInput = styled.input`
  padding: ${sizes.spaceSM} ${sizes.spaceMD};
  border: 2px solid ${colors.borderDefault};
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  min-width: 250px;
  flex: 1;
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
  padding: ${sizes.spaceSM} ${sizes.spaceMD};
  background: linear-gradient(135deg, ${colors.selectedBorder} 0%, ${colors.highlightBorder} 100%);
  color: white;
  border: none;
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 44px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, ${colors.highlightBorder} 0%, ${colors.selectedBorder} 100%);
    transform: translateY(-1px);
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
  padding: ${sizes.spaceSM} ${sizes.spaceMD};
  background: linear-gradient(135deg, ${colors.textLight} 0%, ${colors.textSecondary} 100%);
  color: white;
  border: none;
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 44px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, ${colors.textSecondary} 0%, #495057 100%);
    transform: translateY(-1px);
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