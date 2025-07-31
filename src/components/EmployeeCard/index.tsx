import React, { useState } from 'react'
import { Employee } from '../../types'
import { RawEmployee } from '../../services/dataLoader'
import { FlipCard } from './FlipCard'
import { StyledEmployeeCard } from './styles/CardStyles'

interface EmployeeCardProps {
  employee: Employee
  rawEmployee?: RawEmployee
  config?: {
    showSalary?: boolean
    showPhone?: boolean
    showReports?: boolean
    showTier?: boolean
    showManager?: boolean
    compact?: boolean
  }
  managerName?: string
  onCardClick?: (employee: Employee) => void
  onReportClick?: (employee: Employee) => void
  isSelected?: boolean
  isHighlighted?: boolean
  isDimmed?: boolean
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  rawEmployee,
  config = {},
  managerName,
  onCardClick,
  onReportClick,
  isSelected = false,
  isHighlighted = false,
  isDimmed = false
}) => {
  
  const {
    showSalary = false, // 💰 Salary not shown by default (as requested)
    showPhone = true,
    showReports = true,
    showTier = true,
    showManager = true,
    compact = false
  } = config

  const hasReports = employee.children.length > 0
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlipCard = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the main card click
    setIsFlipped(!isFlipped)
  }

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(employee)
    }
  }

  const handleTeamMemberClick = (reportEmployee: Employee, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering card click
    if (onReportClick) {
      onReportClick(reportEmployee)
    }
  }

  return (
    <StyledEmployeeCard 
      tier={employee.tier}
      compact={compact}
      hasReports={hasReports}
      isSelected={isSelected}
      isHighlighted={isHighlighted}
      isDimmed={isDimmed}
      data-employee-id={employee.id}
      data-name={employee.name}
      data-designation={employee.position}
      data-phone={rawEmployee?.phone || ''}
      data-tier={employee.tier}
      onClick={handleCardClick}
    >
      <FlipCard
        employee={employee}
        rawEmployee={rawEmployee}
        managerName={managerName}
        isFlipped={isFlipped}
        config={{ showReports, showManager }}
        onFlipCard={handleFlipCard}
        onTeamMemberClick={handleTeamMemberClick}
      />
    </StyledEmployeeCard>
  )
}

export default EmployeeCard