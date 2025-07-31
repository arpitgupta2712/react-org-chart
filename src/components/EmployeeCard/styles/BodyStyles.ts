import styled from 'styled-components'
import { sizes, design } from '../../../constants/colors'

export const CardBody = styled.div`
  flex-grow: 1; /* Allow body to take up remaining space */
  position: relative;
  z-index: 1;
`

export const EmployeeTitle = styled.div`
  font-family: ${design.typography.fontFamily};
  font-size: ${sizes.employeeTitle};
  font-weight: 700;
  margin-bottom: ${sizes.spaceLG};
  line-height: 1.3;
  opacity: 0.95;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  /* Add subtle underline */
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${sizes.spaceSM};
    left: 0;
    width: 3rem;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1px;
  }
`

export const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sizes.spaceMD};
`

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${sizes.employeeDetails};
  padding: ${sizes.spaceXS} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`

export const DetailLabel = styled.span`
  font-family: ${design.typography.fontFamily};
  font-weight: 600;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: ${sizes.spaceXS};
  
  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2;
    opacity: 0.7;
    flex-shrink: 0;
  }
`

export const DetailValue = styled.span`
  font-family: ${design.typography.fontFamily};
  font-weight: 700;
  text-align: right;
  flex-shrink: 0;
  
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }
  
  .no-data {
    opacity: 0.6;
    font-style: italic;
    font-weight: 500;
  }
`

export const ExecutiveStatus = styled.span`
  font-weight: 700;
  color: inherit;
  text-align: center;
  display: block;
  width: 100%;
  font-style: italic;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.85em;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`

export const TruncatedText = styled.span`
  position: relative;
  cursor: help;
  
  &:hover {
    opacity: 0.8;
  }
`

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const Tooltip = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: ${sizes.spaceSM} ${sizes.spaceMD};
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 500;
  white-space: nowrap;
  max-width: 250px;
  word-wrap: break-word;
  white-space: normal;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: ${sizes.spaceMD};
    border: 4px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
  }
  
  &:hover {
    cursor: pointer;
  }
`

export const CopyHint = styled.div`
  font-size: 0.7em;
  opacity: 0.7;
  margin-top: ${sizes.spaceXS};
  font-style: italic;
`

