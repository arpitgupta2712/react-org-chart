import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import EmployeeCard from './EmployeeCard'
import { Employee } from '../types'
import { dataLoader, RawEmployee } from '../services/dataLoader'
import { colors, sizes } from '../constants/colors'

const OrgChart: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [rawEmployees, setRawEmployees] = useState<RawEmployee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const [highlightedEmployeeId, setHighlightedEmployeeId] = useState<string | null>(null)
  const [showingSubordinatesForId, setShowingSubordinatesForId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [designationFilter, setDesignationFilter] = useState('')

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const { employees, rawEmployees } = await dataLoader.loadEmployees()
        setEmployees(employees)
        setRawEmployees(rawEmployees)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Get unique designations for filter
  const designations = useMemo(() => {
    const unique = [...new Set(employees.map(emp => emp.position))].sort()
    return unique
  }, [employees])

  // Filter employees based on search and designation
  const filteredEmployees = useMemo(() => {
    let filtered = employees

    // Apply designation filter
    if (designationFilter) {
      filtered = filtered.filter(emp => emp.position === designationFilter)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(emp => {
        const rawEmp = rawEmployees.find(raw => raw.employee_id === emp.id)
        return (
          emp.name.toLowerCase().includes(query) ||
          emp.position.toLowerCase().includes(query) ||
          emp.id.toLowerCase().includes(query) ||
          rawEmp?.company_id.toLowerCase().includes(query) ||
          rawEmp?.phone?.toLowerCase().includes(query)
        )
      })
    }

    return filtered
  }, [employees, rawEmployees, searchQuery, designationFilter])

  // Get employee statistics
  const stats = useMemo(() => {
    const managers = employees.filter(emp => emp.children.length > 0)
    const maxTier = Math.max(...employees.map(emp => emp.tier))
    const avgSalary = rawEmployees
      .filter(emp => emp.salary_package)
      .reduce((sum, emp) => sum + emp.salary_package, 0) / rawEmployees.length
    const largestTeam = Math.max(...managers.map(m => m.children.length), 0)

    return {
      total: employees.length,
      filtered: filteredEmployees.length,
      managers: managers.length,
      tiers: maxTier,
      avgSalary: Math.round(avgSalary),
      largestTeam
    }
  }, [employees, filteredEmployees, rawEmployees])

  // Get raw employee data for a given employee ID
  const getRawEmployee = (employeeId: string): RawEmployee | undefined => {
    return rawEmployees.find(raw => raw.employee_id === employeeId)
  }

  // Get manager name for an employee
  const getManagerName = (managerId: string): string => {
    const manager = employees.find(emp => emp.id === managerId)
    return manager ? manager.name : 'Unknown'
  }

  // Get all subordinates (direct and indirect reports) of an employee
  const getAllSubordinates = (employeeId: string): Set<string> => {
    const subordinates = new Set<string>()
    const employee = employees.find(emp => emp.id === employeeId)
    
    if (!employee) return subordinates
    
    const addSubordinatesRecursively = (emp: Employee) => {
      emp.children.forEach(child => {
        subordinates.add(child.id)
        addSubordinatesRecursively(child)
      })
    }
    
    addSubordinatesRecursively(employee)
    return subordinates
  }

  // Event handlers
  const handleCardClick = (employee: Employee) => {
    if (showingSubordinatesForId === employee.id) {
      // If clicking on the same employee, clear subordinate view
      setShowingSubordinatesForId(null)
      setSelectedEmployeeId(employee.id)
      setHighlightedEmployeeId(null)
    } else {
      // Show subordinates and select the employee
      setShowingSubordinatesForId(employee.id)
      setSelectedEmployeeId(employee.id)
      setHighlightedEmployeeId(null)
    }
    console.log(`👤 Selected: ${employee.name}`)
  }

  const handleReportClick = (employee: Employee) => {
    // When clicking on a team member, both highlight and select them for visibility
    setHighlightedEmployeeId(employee.id)
    setSelectedEmployeeId(employee.id)
    setShowingSubordinatesForId(null) // Clear subordinate view
    console.log(`🎯 Navigated to: ${employee.name}`)
    
    // Scroll to employee
    setTimeout(() => {
      const element = document.querySelector(`[data-employee-id="${employee.id}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const expandAll = () => {
    // This would need to be implemented with state management for each card
    // For now, just log the action
    console.log('📖 Expand all requested')
  }

  const collapseAll = () => {
    // This would need to be implemented with state management for each card
    // For now, just log the action
    console.log('📕 Collapse all requested')
  }

  const resetView = () => {
    setSearchQuery('')
    setDesignationFilter('')
    setSelectedEmployeeId(null)
    setHighlightedEmployeeId(null)
    setShowingSubordinatesForId(null)
    console.log('🔄 View reset')
  }

  // Render loading state
  if (loading) {
    return (
      <Container>
        <LoadingState>
          <Spinner />
          <h3>Loading Organization Chart...</h3>
          <p>Please wait while we fetch the employee data</p>
        </LoadingState>
      </Container>
    )
  }

  // Render error state
  if (error) {
    return (
      <Container>
        <ErrorState>
          <h3>Failed to load data</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </ErrorState>
      </Container>
    )
  }

  return (
    <Container>
      {/* Controls */}
      <Controls>
        <ControlGroup>
          <label><strong>Filter:</strong></label>
          <FilterSelect 
            value={designationFilter} 
            onChange={(e) => setDesignationFilter(e.target.value)}
          >
            <option value="">All Employees</option>
            {designations.map(designation => {
              const count = employees.filter(emp => emp.position === designation).length
              return (
                <option key={designation} value={designation}>
                  {designation} ({count})
                </option>
              )
            })}
          </FilterSelect>
        </ControlGroup>
        
        <ControlGroup>
          <SearchInput 
            type="text" 
            placeholder="🔍 Search name, phone, ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </ControlGroup>
        
        <ControlGroup>
          <ActionButton onClick={expandAll}>
            📖 Expand All
          </ActionButton>
          <ActionButton onClick={collapseAll}>
            📕 Collapse All
          </ActionButton>
          <ResetButton onClick={resetView}>
            🔄 Reset
          </ResetButton>
        </ControlGroup>
      </Controls>

      {/* Statistics */}
      <Stats>
        <strong>📊 Organization Overview:</strong>{' '}
        Showing {stats.filtered} of {stats.total} employees |{' '}
        Largest team: {stats.largestTeam} reports
      </Stats>

      {/* Employee Grid */}
      <EmployeeGrid>
        {filteredEmployees.length === 0 ? (
          <NoResults>
            <p>No employees found matching your criteria.</p>
            <button onClick={resetView}>Clear Filters</button>
          </NoResults>
        ) : (
          filteredEmployees.map(employee => {
            // Calculate subordinate highlighting logic
            const subordinates = showingSubordinatesForId ? getAllSubordinates(showingSubordinatesForId) : new Set()
            const isSubordinate = subordinates.has(employee.id)
            const isManager = showingSubordinatesForId === employee.id
            
            // Determine if card should be dimmed
            const isDimmedByFilters = Boolean(
              (searchQuery && !filteredEmployees.find(e => e.id === employee.id)) ||
              (designationFilter && employee.position !== designationFilter)
            )
            
            const isDimmedBySubordinateView = Boolean(
              showingSubordinatesForId && !isSubordinate && !isManager
            )
            
            return (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                rawEmployee={getRawEmployee(employee.id)}
                managerName={employee.parentId ? getManagerName(employee.parentId) : undefined}
                onCardClick={handleCardClick}
                onReportClick={handleReportClick}
                isSelected={selectedEmployeeId === employee.id}
                isHighlighted={highlightedEmployeeId === employee.id || isSubordinate}
                isDimmed={isDimmedByFilters || isDimmedBySubordinateView}
              />
            )
          })
        )}
      </EmployeeGrid>
    </Container>
  )
}

// 🎨 ALL ORGCHART STYLES IN ONE PLACE!
const Container = styled.div`
  font-family: 'PT Sans', sans-serif;
  background: ${colors.appBackground};
  min-height: 100vh;
  padding: ${sizes.space2XL};
  
  @media (max-width: 1200px) {
    padding: ${sizes.spaceXL};
  }
  
  @media (max-width: 768px) {
    padding: ${sizes.spaceLG};
  }
`

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  color: ${colors.textPrimary};
  
  h3 {
    font-size: ${sizes.fontXL};
    margin: ${sizes.spaceLG} 0 ${sizes.spaceMD} 0;
    font-weight: 700;
  }
  
  p {
    font-size: ${sizes.fontBase};
    color: ${colors.textSecondary};
  }
`

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 4px solid ${colors.borderLight};
  border-top: 4px solid ${colors.selectedBorder};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  color: ${colors.error};
  
  h3 {
    font-size: ${sizes.fontXL};
    margin-bottom: ${sizes.spaceMD};
    font-weight: 700;
  }
  
  p {
    font-size: ${sizes.fontBase};
    margin-bottom: ${sizes.spaceLG};
  }
  
  button {
    padding: ${sizes.spaceMD} ${sizes.spaceLG};
    background: ${colors.error};
    color: white;
    border: none;
    border-radius: ${sizes.spaceMD};
    font-size: ${sizes.fontBase};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: ${colors.textSecondary};
    }
  }
`

const Controls = styled.div`
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

const ControlGroup = styled.div`
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

const FilterSelect = styled.select`
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

const SearchInput = styled.input`
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

const ActionButton = styled.button`
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

const ResetButton = styled.button`
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

const Stats = styled.div`
  background: ${colors.cardBackground};
  padding: ${sizes.spaceLG};
  border-radius: ${sizes.spaceMD};
  margin-bottom: ${sizes.spaceXL};
  font-size: ${sizes.fontBase};
  color: ${colors.textPrimary};
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  
  strong {
    color: ${colors.selectedBorder};
  }
`

const EmployeeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  gap: ${sizes.space2XL};
  align-items: start; /* ⚡️ Align cards to top for clean rows */
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
    gap: ${sizes.spaceXL};
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${sizes.spaceLG};
  }
`

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${sizes.space2XL};
  background: ${colors.cardBackground};
  border-radius: ${sizes.cardBorderRadius};
  color: ${colors.textSecondary};
  
  p {
    font-size: ${sizes.fontLG};
    margin-bottom: ${sizes.spaceLG};
  }
  
  button {
    padding: ${sizes.spaceMD} ${sizes.spaceXL};
    background: ${colors.selectedBorder};
    color: white;
    border: none;
    border-radius: ${sizes.spaceMD};
    font-size: ${sizes.fontBase};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: ${colors.highlightBorder};
    }
  }
`

export default OrgChart