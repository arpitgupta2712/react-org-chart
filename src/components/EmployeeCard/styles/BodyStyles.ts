import styled from 'styled-components'
import { sizes } from '../../../constants/colors'

export const CardBody = styled.div`
  flex-grow: 1; /* Allow body to take up remaining space */
  position: relative;
  z-index: 1;
`

export const EmployeeTitle = styled.div`
  font-size: ${sizes.employeeTitle};
  font-weight: 700;
  margin-bottom: ${sizes.spaceXL};
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
  padding: ${sizes.spaceSM} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`

export const DetailLabel = styled.span`
  font-weight: 600;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: ${sizes.spaceXS};
  
  svg {
    opacity: 0.7;
    flex-shrink: 0;
  }
`

export const DetailValue = styled.span`
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

export const CompanyTag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: ${sizes.spaceXS} ${sizes.spaceSM};
  border-radius: 0.75rem;
  font-size: ${sizes.fontXS};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`