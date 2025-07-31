import React, { useMemo } from 'react'
import { useEmployeeData } from '../../hooks/useEmployeeData'
import { useEmployeeFiltering } from '../../hooks/useEmployeeFiltering'
import { useEmployeeStats } from '../../hooks/useEmployeeStats'
import { useEmployeeSelection } from '../../hooks/useEmployeeSelection'
import { Controls } from './components/Controls'
import { StatsDisplay } from './components/StatsDisplay'
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
    filteredEmployees,
    designations,
    resetFilters
  } = useEmployeeFiltering(employees, rawEmployees)

  // Employee selection and highlighting
  const {
    selectedEmployeeId,
    highlightedEmployeeId,
    showingSubordinatesForId,
    handleCardClick,
    handleReportClick,
    resetSelection,
    getAllSubordinates
  } = useEmployeeSelection(employees)

  // Statistics
  const stats = useEmployeeStats(employees, filteredEmployees, rawEmployees)

  // Calculate employee counts for filter options
  const employeeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    employees.forEach(emp => {
      counts[emp.position] = (counts[emp.position] || 0) + 1
    })
    return counts
  }, [employees])

  // Action handlers
  const handleExpandAll = () => {
    // This would need to be implemented with state management for each card
    // For now, just log the action
    console.log('📖 Expand all requested')
  }

  const handleCollapseAll = () => {
    // This would need to be implemented with state management for each card
    // For now, just log the action
    console.log('📕 Collapse all requested')
  }

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
        designations={designations}
        employeeCounts={employeeCounts}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
        onReset={handleReset}
      />

      <StatsDisplay stats={stats} />

      <EmployeeGridComponent
        employees={filteredEmployees}
        getRawEmployee={getRawEmployee}
        getManagerName={getManagerName}
        onCardClick={handleCardClick}
        onReportClick={handleReportClick}
        selectedEmployeeId={selectedEmployeeId}
        highlightedEmployeeId={highlightedEmployeeId}
        showingSubordinatesForId={showingSubordinatesForId}
        getAllSubordinates={getAllSubordinates}
        searchQuery={searchQuery}
        designationFilter={designationFilter}
        onResetFilters={resetFilters}
      />
    </Container>
  )
}

export default OrgChart