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
// Removed useCurrentTime import - now inlined for better performance
import { formatDate, formatTime } from '../../utils/dateUtils'
import { useEmployeeDataContext } from '../../contexts/EmployeeDataContext'

export const AppHeader: React.FC = () => {
  // Inline current time logic - optimized for this specific use case
  const [currentTime, setCurrentTime] = React.useState(new Date())
  
  React.useEffect(() => {
    // Update every 30 seconds instead of every second for better performance
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  const { employees } = useEmployeeDataContext()

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