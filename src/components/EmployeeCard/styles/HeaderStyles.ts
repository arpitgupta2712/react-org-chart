import styled from 'styled-components'
import { sizes } from '../../../constants/colors'

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${sizes.spaceMD};
  position: relative;
  z-index: 1;
`

export const EmployeeInfo = styled.div`
  flex: 1;
  margin-right: ${sizes.spaceMD};
`

export const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`

export const TierBadge = styled.div<{ tier: number }>`
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(0, 0, 0, 0.2);
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    inset 0 1px 2px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.3px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
  white-space: nowrap;
  text-align: center;
`

export const EmployeeName = styled.div`
  font-size: ${sizes.employeeName};
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: ${sizes.spaceXS};
  
  /* Add a subtle highlight */
  background: linear-gradient(135deg, currentColor 0%, currentColor 100%);
  background-clip: text;
  -webkit-background-clip: text;
`

export const EmployeeSubtitle = styled.div`
  font-size: ${sizes.fontSM};
  font-weight: 600;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: ${sizes.spaceXS};
  
  svg {
    opacity: 0.8;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }
`

export const EmployeeId = styled.div`
  font-size: ${sizes.employeeId};
  font-weight: 700;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${sizes.spaceSM} ${sizes.spaceMD};
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 4rem;
  
  &::before {
    content: '#';
    opacity: 0.7;
    font-weight: 500;
  }
`