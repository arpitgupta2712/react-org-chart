import React from 'react'
import {
  Controls as StyledControls,
  ControlGroup,
  FilterSelect,
  SearchInput,
  ActionButton,
  ResetButton
} from '../styles/ControlStyles'

interface ControlsProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  designationFilter: string
  onDesignationFilterChange: (value: string) => void
  designations: string[]
  employeeCounts: Record<string, number>
  onExpandAll: () => void
  onCollapseAll: () => void
  onReset: () => void
}

export const Controls: React.FC<ControlsProps> = ({
  searchQuery,
  onSearchChange,
  designationFilter,
  onDesignationFilterChange,
  designations,
  employeeCounts,
  onExpandAll,
  onCollapseAll,
  onReset
}) => {
  return (
    <StyledControls>
      <ControlGroup>
        <label><strong>Filter:</strong></label>
        <FilterSelect 
          value={designationFilter} 
          onChange={(e) => onDesignationFilterChange(e.target.value)}
        >
          <option value="">All Employees</option>
          {designations.map(designation => (
            <option key={designation} value={designation}>
              {designation} ({employeeCounts[designation] || 0})
            </option>
          ))}
        </FilterSelect>
      </ControlGroup>
      
      <ControlGroup>
        <SearchInput 
          type="text" 
          placeholder="🔍 Search name, phone, ID..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </ControlGroup>
      
      <ControlGroup>
        <ActionButton onClick={onExpandAll}>
          📖 Expand All
        </ActionButton>
        <ActionButton onClick={onCollapseAll}>
          📕 Collapse All
        </ActionButton>
        <ResetButton onClick={onReset}>
          🔄 Reset
        </ResetButton>
      </ControlGroup>
    </StyledControls>
  )
}