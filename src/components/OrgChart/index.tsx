import React, { useMemo, useState } from 'react'
import { useEmployeeData } from '../../hooks/useEmployeeData'
import { useEmployeeFiltering } from '../../hooks/useEmployeeFiltering'
import { useEmployeeSelection } from '../../hooks/useEmployeeSelection'
import { useScreenSize } from '../../hooks/useScreenSize'
import { Controls } from './components/Controls'
import { LoadingStateComponent } from './components/LoadingStateComponent'
import { ErrorStateComponent } from './components/ErrorStateComponent'
import { EmployeeGridComponent } from './components/EmployeeGridComponent'
import { TierView } from './components/TierView'
import { ViewMode } from './components/ViewToggle'
import { Container } from './styles/LayoutStyles'

const OrgChart: React.FC = () => {
  // Screen size detection for responsive view switching
  const { isNarrow: isNarrowScreen, isMobile } = useScreenSize()

  // View mode state - defaults to tier view on narrow screens
  const [viewMode, setViewMode] = useState<ViewMode>(() => 
    isNarrowScreen ? 'tier' : 'grid'
  )

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
    sortBy,
    setSortBy,
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
    getAllSubordinates,
    getDirectSubordinates
  } = useEmployeeSelection(employees)

  // Data set navigation for employee cards (only used in grid view)
  const [currentDataSetIndex, setCurrentDataSetIndex] = useState(0)
  const [isManualMode, setIsManualMode] = useState(false)
  const dataSetCount = 5 // We have 5 data sets: basic, personal, emergency, salary, government

  // Auto-switch to tier view on narrow screens
  React.useEffect(() => {
    if (isNarrowScreen && viewMode === 'grid') {
      setViewMode('tier')
    }
  }, [isNarrowScreen, viewMode])

  const handleNextDataSet = () => {
    setIsManualMode(true) // Switch to manual mode when navigation is used
    setCurrentDataSetIndex((prev) => (prev + 1) % dataSetCount)
  }

  const handlePreviousDataSet = () => {
    setIsManualMode(true) // Switch to manual mode when navigation is used
    setCurrentDataSetIndex((prev) => (prev - 1 + dataSetCount) % dataSetCount)
  }

  const handleToggleMode = () => {
    setIsManualMode((prev) => !prev)
    // If switching to auto mode, the timer will restart automatically
  }

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

  // View change handler
  const handleViewChange = (newView: ViewMode) => {
    setViewMode(newView)
    // Reset some states when switching views
    if (newView === 'tier') {
      // Reset data set navigation to auto mode for tier view
      setIsManualMode(false)
      setCurrentDataSetIndex(0)
    }
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
        sortBy={sortBy}
        onSortChange={setSortBy}
        designations={designations}
        tiers={tiers}
        employeeCounts={employeeCounts}
        onReset={handleReset}
        currentDataSetIndex={currentDataSetIndex}
        onPreviousDataSet={handlePreviousDataSet}
        onNextDataSet={handleNextDataSet}
        dataSetCount={dataSetCount}
        isManualMode={isManualMode}
        onToggleMode={handleToggleMode}
        currentView={viewMode}
        onViewChange={handleViewChange}
        isNarrowScreen={isNarrowScreen}
      />

      {/* Conditional view rendering */}
      {viewMode === 'tier' ? (
        <TierView
          employees={filteredEmployees}
          getRawEmployee={getRawEmployee}
          getManagerName={getManagerName}
          onCardClick={handleCardClick}
          selectedEmployeeId={selectedEmployeeId || undefined}
          highlightedEmployeeId={highlightedEmployeeId || undefined}
          currentDataSetIndex={isManualMode ? currentDataSetIndex : undefined}
        />
      ) : (
        <EmployeeGridComponent
          employees={filteredEmployees}
          getRawEmployee={getRawEmployee}
          getManagerName={getManagerName}
          onCardClick={handleCardClick}
          selectedEmployeeId={selectedEmployeeId}
                      highlightedEmployeeId={highlightedEmployeeId}
            showingSubordinatesForId={showingSubordinatesForId}
            getDirectSubordinates={getDirectSubordinates}
          searchQuery={searchQuery}
          designationFilter={designationFilter}
          tierFilter={tierFilter}
          onResetFilters={resetFilters}
          currentDataSetIndex={isManualMode ? currentDataSetIndex : undefined}
        />
      )}
    </Container>
  )
}

export default OrgChart