import React from 'react'
import EmployeeCard from '../../EmployeeCard'
import { Employee } from '../../../types'
import { RawEmployee } from '../../../services/dataLoader'
import { EmployeeGrid } from '../styles/LayoutStyles'
import { NoResults } from '../styles/StateStyles'

interface EmployeeGridComponentProps {
  employees: Employee[]
  getRawEmployee: (employeeId: string) => RawEmployee | undefined
  getManagerName: (managerId: string) => string
  onCardClick: (employee: Employee) => void
  selectedEmployeeId: string | null
  highlightedEmployeeId: string | null
  showingSubordinatesForId: string | null
  getDirectSubordinates: (employeeId: string) => Set<string>
  searchQuery: string
  designationFilter: string
  tierFilter: number | ''
  onResetFilters: () => void
  currentDataSetIndex?: number
}

export const EmployeeGridComponent: React.FC<EmployeeGridComponentProps> = ({
  employees,
  getRawEmployee,
  getManagerName,
  onCardClick,
  selectedEmployeeId,
  highlightedEmployeeId,
  showingSubordinatesForId,
  getDirectSubordinates,
  searchQuery,
  designationFilter,
  tierFilter,
  onResetFilters,
  currentDataSetIndex
}) => {
  if (employees.length === 0) {
    return (
      <EmployeeGrid>
        <NoResults>
          <p>No employees found matching your criteria.</p>
          <button onClick={onResetFilters}>Clear Filters</button>
        </NoResults>
      </EmployeeGrid>
    )
  }

  return (
    <EmployeeGrid>
      {employees.map(employee => {
        // Calculate subordinate highlighting logic - only direct reports (+1 tier)
        const directSubordinates = showingSubordinatesForId ? getDirectSubordinates(showingSubordinatesForId) : new Set()
        const isDirectSubordinate = directSubordinates.has(employee.id)
        const isManager = showingSubordinatesForId === employee.id
        
        // Determine if card should be dimmed
        const isDimmedByFilters = Boolean(
          (searchQuery && !employees.find(e => e.id === employee.id)) ||
          (designationFilter && employee.position !== designationFilter)
        )
        
        const isDimmedBySubordinateView = Boolean(
          showingSubordinatesForId && !isDirectSubordinate && !isManager
        )
        
        return (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            rawEmployee={getRawEmployee(employee.id)}
            managerName={employee.parentId ? getManagerName(employee.parentId) : undefined}
            onCardClick={onCardClick}
            isSelected={selectedEmployeeId === employee.id}
            isHighlighted={highlightedEmployeeId === employee.id || isDirectSubordinate}
            isDimmed={isDimmedByFilters || isDimmedBySubordinateView}
            currentDataSetIndex={currentDataSetIndex}
          />
        )
      })}
    </EmployeeGrid>
  )
}