import styled from 'styled-components'
import { colors, sizes } from '../../../constants/colors'

export const Controls = styled.div`
  background: ${colors.cardBackground};
  padding: ${sizes.spaceXL};
  border-radius: ${sizes.cardBorderRadius};
  margin-bottom: ${sizes.spaceXL};
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-wrap: wrap;
  gap: ${sizes.spaceXL};
  align-items: center;
  
  @media (max-width: 768px) {
    padding: ${sizes.spaceLG};
    gap: ${sizes.spaceMD};
    flex-direction: column;
    align-items: stretch;
  }
`

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${sizes.spaceSM};
  
  label {
    font-size: ${sizes.fontBase};
    font-weight: 600;
    color: ${colors.textPrimary};
    white-space: nowrap;
  }
  
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`

export const FilterSelect = styled.select`
  padding: ${sizes.spaceSM} ${sizes.spaceMD};
  border: 2px solid ${colors.borderDefault};
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  background: white;
  cursor: pointer;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${colors.selectedBorder};
    box-shadow: 0 0 0 3px ${colors.focusRing};
  }
`

export const SearchInput = styled.input`
  padding: ${sizes.spaceSM} ${sizes.spaceMD};
  border: 2px solid ${colors.borderDefault};
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  min-width: 250px;
  
  &:focus {
    outline: none;
    border-color: ${colors.selectedBorder};
    box-shadow: 0 0 0 3px ${colors.focusRing};
  }
  
  &::placeholder {
    color: ${colors.textLight};
  }
`

export const ActionButton = styled.button`
  padding: ${sizes.spaceSM} ${sizes.spaceLG};
  background: ${colors.selectedBorder};
  color: white;
  border: none;
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${colors.highlightBorder};
    transform: translateY(-1px);
  }
`

export const ResetButton = styled.button`
  padding: ${sizes.spaceSM} ${sizes.spaceLG};
  background: ${colors.textLight};
  color: white;
  border: none;
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontSM};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${colors.textSecondary};
    transform: translateY(-1px);
  }
`