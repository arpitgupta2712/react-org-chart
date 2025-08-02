import React from 'react'
import {
  HeaderContainer,
  HeaderContent,
  HeaderTextContent,
  CompanyTitle,
  CompanySubtitle,
  HeaderIcon,
  TechStack
} from './styles.js'
import { useCurrentTime } from '../../hooks/useCurrentTime'
import { formatDate, formatTime } from '../../utils/dateUtils'
import { useEmployeeData } from '../../hooks/useEmployeeData'

export const AppHeader: React.FC = () => {
  const currentTime = useCurrentTime()
  const { employees } = useEmployeeData()

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderTextContent>
          <CompanyTitle>GoalTech Innovation</CompanyTitle>
          <CompanySubtitle>
            <TechStack>{employees.length} Employees</TechStack> • <TechStack>{formatDate(currentTime)}</TechStack> • <TechStack>{formatTime(currentTime)}</TechStack>
          </CompanySubtitle>
        </HeaderTextContent>
        <HeaderIcon>
          <img src="/logo.png" alt="GoalTech Logo" />
        </HeaderIcon>
      </HeaderContent>
    </HeaderContainer>
  )
}