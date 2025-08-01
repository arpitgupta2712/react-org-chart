import React, { useState } from 'react'
import {
  Controls as StyledControls,
  ControlsHeader,
  ControlsContent,
  ControlGroup,
  FilterSelect,
  SearchInput,
  ResetButton,
  FilterLabel,
  ToggleButton,
  CompactFilterRow
} from '../styles/ControlStyles'
import { 
  ShieldIcon, 
  SettingsIcon, 
  ResetIcon,
  BuildingIcon,
  SortIcon,
  PreviousIcon,
  NextIcon,
  AutoIcon,
  ManualIcon
} from '../../icons'
import { ViewToggle, ViewMode } from './ViewToggle'

// Reusable component for filter/sort controls (left side)
interface FilterControlsProps {
  isExpanded: boolean
  onToggleExpanded: () => void
  sortBy: 'date' | 'name'
  onSortChange: (sort: 'date' | 'name') => void
  onReset: () => void
  activeFiltersCount: number
}

const FilterControls: React.FC<FilterControlsProps> = ({
  isExpanded,
  onToggleExpanded,
  sortBy,
  onSortChange,
  onReset,
  activeFiltersCount
}) => (
  <ControlGroup>
    <ToggleButton 
      onClick={onToggleExpanded}
      isExpanded={isExpanded}
      title={isExpanded ? 'Hide Filters' : 'Show Filters'}
    >
      <SettingsIcon />
    </ToggleButton>
    
    <ToggleButton
      onClick={() => onSortChange(sortBy === 'date' ? 'name' : 'date')}
      isExpanded={sortBy === 'date'}
      title={`Currently sorting by ${sortBy === 'date' ? 'joining date (newest first)' : 'name (A-Z)'}`}
    >
      {sortBy === 'date' ? 'Sort By Date' : 'Sort By Name'}
    </ToggleButton>
    
    <ResetButton 
      onClick={onReset} 
      title="Reset All Filters"
      disabled={activeFiltersCount === 0}
    >
      <ResetIcon />
    </ResetButton>
  </ControlGroup>
)

// Reusable component for data set navigation (right side)
interface DataSetNavigationProps {
  currentDataSetIndex: number
  isManualMode: boolean
  onToggleMode: () => void
  onPreviousDataSet: () => void
  onNextDataSet: () => void
  dataSetNames: string[]
}

const DataSetNavigation: React.FC<DataSetNavigationProps> = ({
  currentDataSetIndex,
  isManualMode,
  onToggleMode,
  onPreviousDataSet,
  onNextDataSet,
  dataSetNames
}) => (
  <ControlGroup>
    <ToggleButton
      onClick={onToggleMode}
      isExpanded={isManualMode}
      title={isManualMode ? 'Switch to Auto Mode (5s rotation)' : 'Switch to Manual Mode'}
    >
      {isManualMode ? <ManualIcon /> : <AutoIcon />}
    </ToggleButton>
    
    <ToggleButton
      onClick={onPreviousDataSet}
      isExpanded={false}
      title="Previous Data Set"
      disabled={!isManualMode}
    >
      <PreviousIcon />
    </ToggleButton>
    
    <span style={{ 
      fontSize: '0.9rem', 
      color: isManualMode ? '#333' : '#999', 
      padding: '0 0.5rem',
      minWidth: '140px',
      textAlign: 'center'
    }}>
      {dataSetNames[currentDataSetIndex]} {!isManualMode && '(Auto)'}
    </span>
    
    <ToggleButton
      onClick={onNextDataSet}
      isExpanded={false}
      title="Next Data Set"
      disabled={!isManualMode}
    >
      <NextIcon />
    </ToggleButton>
  </ControlGroup>
)

interface ControlsProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  designationFilter: string
  onDesignationFilterChange: (value: string) => void
  tierFilter: number | ''
  onTierFilterChange: (value: number | '') => void
  sortBy: 'date' | 'name'
  onSortChange: (sort: 'date' | 'name') => void
  designations: string[]
  tiers: Array<{ tier: number; label: string; count: number }>
  employeeCounts: Record<string, number>
  onReset: () => void
  currentDataSetIndex: number
  onPreviousDataSet: () => void
  onNextDataSet: () => void
  dataSetCount: number
  isManualMode: boolean
  onToggleMode: () => void
  // View toggle props
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
  isNarrowScreen: boolean
}

export const Controls: React.FC<ControlsProps> = ({
  searchQuery,
  onSearchChange,
  designationFilter,
  onDesignationFilterChange,
  tierFilter,
  onTierFilterChange,
  sortBy,
  onSortChange,
  designations,
  tiers,
  employeeCounts,
  onReset,
  currentDataSetIndex,
  onPreviousDataSet,
  onNextDataSet,
  dataSetCount,
  isManualMode,
  onToggleMode,
  currentView,
  onViewChange,
  isNarrowScreen
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Data set names
  const dataSetNames = ['Basic Info', 'Personal Details', 'Emergency Details', 'Salary Details', 'Government IDs']
  
  // Calculate active filters
  const activeFilters = [
    designationFilter && `Position: ${designationFilter}`,
    tierFilter !== '' && `Tier: ${tiers.find(t => t.tier === tierFilter)?.label}`,
    searchQuery.trim() && `Search: "${searchQuery.trim()}"`
  ].filter(Boolean)

  return (
    <StyledControls isExpanded={isExpanded}>
      {/* Header Bar with Left/Right Layout */}
      <ControlsHeader>
        {/* View Toggle - only show on larger screens where both views are practical */}
        {!isNarrowScreen && (
          <ViewToggle
            currentView={currentView}
            onViewChange={onViewChange}
            isNarrowScreen={isNarrowScreen}
            disabled={false}
          />
        )}
        
        {/* Filter/Sort Controls */}
        <FilterControls
          isExpanded={isExpanded}
          onToggleExpanded={() => setIsExpanded(!isExpanded)}
          sortBy={sortBy}
          onSortChange={onSortChange}
          onReset={onReset}
          activeFiltersCount={activeFilters.length}
        />
        
        {/* Only show data set navigation in grid view */}
        {currentView === 'grid' && (
          <DataSetNavigation
            currentDataSetIndex={currentDataSetIndex}
            isManualMode={isManualMode}
            onToggleMode={onToggleMode}
            onPreviousDataSet={onPreviousDataSet}
            onNextDataSet={onNextDataSet}
            dataSetNames={dataSetNames}
          />
        )}
      </ControlsHeader>

      {/* Expandable Content */}
      <ControlsContent isExpanded={isExpanded}>
        {/* Compact Filter Row */}
        <CompactFilterRow>
          <ControlGroup>
            <FilterLabel><BuildingIcon /></FilterLabel>
            <FilterSelect 
              value={designationFilter} 
              onChange={(e) => onDesignationFilterChange(e.target.value)}
            >
              <option value="">All Positions</option>
              {designations.map(designation => (
                <option key={designation} value={designation}>
                  {designation} ({employeeCounts[designation] || 0})
                </option>
              ))}
            </FilterSelect>
          </ControlGroup>

          <ControlGroup>
            <FilterLabel><ShieldIcon /></FilterLabel>
            <FilterSelect 
              value={tierFilter} 
              onChange={(e) => onTierFilterChange(e.target.value === '' ? '' : Number(e.target.value))}
            >
              <option value="">All Tiers</option>
              {tiers.map(({ tier, label, count }) => (
                <option key={tier} value={tier}>
                  Tier {tier}: {label} ({count})
                </option>
              ))}
            </FilterSelect>
          </ControlGroup>
          
          <ControlGroup>
            <SearchInput 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </ControlGroup>
        </CompactFilterRow>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div style={{ 
            marginTop: '1rem', 
            fontSize: '0.85rem', 
            color: '#666',
            fontStyle: 'italic'
          }}>
            Active: {activeFilters.join(' • ')}
          </div>
        )}
      </ControlsContent>
    </StyledControls>
  )
}