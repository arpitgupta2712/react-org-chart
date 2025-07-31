import React from 'react'
import { Employee, getHierarchyLabel } from '../../types'
import { RawEmployee } from '../../services/dataLoader'
import { CardHeader } from './CardHeader'
import { CardBody } from './CardBody'
import { StyledEmployeeCard, TierHeader, CompanyFooter } from './styles/CardStyles'

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

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(employee)
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
      {/* 🏷️ Tier Header - dedicated space at top of card */}
      <TierHeader tier={employee.tier}>
        <span>{getHierarchyLabel(employee.tier)}</span>
      </TierHeader>
      
      {/* Card Content */}
      <CardHeader employee={employee} rawEmployee={rawEmployee} />
      <CardBody 
        employee={employee} 
        rawEmployee={rawEmployee} 
        managerName={managerName}
        showManager={showManager}
      />
      
      {/* 🏢 Company Footer - dedicated space at bottom of card */}
      <CompanyFooter tier={employee.tier}>
        <span>
          {rawEmployee?.company_billed_to || 'No Company Assigned'}
        </span>
      </CompanyFooter>
    </StyledEmployeeCard>
  )
}

export default EmployeeCard