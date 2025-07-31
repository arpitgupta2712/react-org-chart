import React, { useMemo } from 'react'
import { useEmployeeData } from '../../hooks/useEmployeeData'
import { useEmployeeFiltering } from '../../hooks/useEmployeeFiltering'

import { useEmployeeSelection } from '../../hooks/useEmployeeSelection'
import { Controls } from './components/Controls'
import { LoadingStateComponent } from './components/LoadingStateComponent'
import { ErrorStateComponent } from './components/ErrorStateComponent'
import { EmployeeGridComponent } from './components/EmployeeGridComponent'
import { Container } from './styles/LayoutStyles'

const OrgChart: React.FC = () => {
  // Data management
  const {
    employees,
    rawEmployees,
    loading,
    error,
    getRawEmployee,
    getManagerName
  } = useEmployeeData()

  // Filtering and search
  const {
    searchQuery,
    setSearchQuery,
    designationFilter,
    setDesignationFilter,
    tierFilter,
    setTierFilter,
    filteredEmployees,
    designations,
    tiers,
    resetFilters
  } = useEmployeeFiltering(employees, rawEmployees)

  // Employee selection and highlighting
  const {
    selectedEmployeeId,
    highlightedEmployeeId,
    showingSubordinatesForId,
    handleCardClick,
    resetSelection,
    getAllSubordinates
  } = useEmployeeSelection(employees)

  // Statistics (removed - redundant with controls data)

  // Calculate employee counts for filter options
  const employeeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    employees.forEach(emp => {
      counts[emp.position] = (counts[emp.position] || 0) + 1
    })
    return counts
  }, [employees])

  // Reset handler
  const handleReset = () => {
    resetFilters()
    resetSelection()
    console.log('🔄 View reset')
  }

  // Render loading state
  if (loading) {
    return (
      <Container>
        <LoadingStateComponent />
      </Container>
    )
  }

  // Render error state
  if (error) {
    return (
      <Container>
        <ErrorStateComponent error={error} />
      </Container>
    )
  }

  return (
    <Container>
      <Controls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        designationFilter={designationFilter}
        onDesignationFilterChange={setDesignationFilter}
        tierFilter={tierFilter}
        onTierFilterChange={setTierFilter}
        designations={designations}
        tiers={tiers}
        employeeCounts={employeeCounts}
        onReset={handleReset}
      />

      <EmployeeGridComponent
        employees={filteredEmployees}
        getRawEmployee={getRawEmployee}
        getManagerName={getManagerName}
        onCardClick={handleCardClick}
        selectedEmployeeId={selectedEmployeeId}
        highlightedEmployeeId={highlightedEmployeeId}
        showingSubordinatesForId={showingSubordinatesForId}
        getAllSubordinates={getAllSubordinates}
        searchQuery={searchQuery}
        designationFilter={designationFilter}
        tierFilter={tierFilter}
        onResetFilters={resetFilters}
      />
    </Container>
  )
}

export default OrgChart