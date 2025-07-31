import React from 'react'
import {
  Controls as StyledControls,
  ControlGroup,
  FilterSelect,
  SearchInput,
  ActionButton,
  ResetButton,
  FilterLabel,
  FilterSection
} from '../styles/ControlStyles'
import { ShieldIcon } from '../../icons'

interface ControlsProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  designationFilter: string
  onDesignationFilterChange: (value: string) => void
  tierFilter: number | ''
  onTierFilterChange: (value: number | '') => void
  designations: string[]
  tiers: Array<{ tier: number; label: string; count: number }>
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
  tierFilter,
  onTierFilterChange,
  designations,
  tiers,
  employeeCounts,
  onExpandAll,
  onCollapseAll,
  onReset
}) => {
  return (
    <StyledControls>
      {/* Filter Section */}
      <FilterSection>
        <ControlGroup>
          <FilterLabel>🏢 Position:</FilterLabel>
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
          <FilterLabel>
            <ShieldIcon /> Tier:
          </FilterLabel>
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
      </FilterSection>
      
      {/* Search Section */}
      <ControlGroup>
        <SearchInput 
          type="text" 
          placeholder="🔍 Search name, position, tier, phone, ID..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </ControlGroup>
      
      {/* Action Section */}
      <ControlGroup>
        <ActionButton onClick={onExpandAll}>
          📖 Expand All
        </ActionButton>
        <ActionButton onClick={onCollapseAll}>
          📕 Collapse All
        </ActionButton>
        <ResetButton onClick={onReset}>
          🔄 Reset Filters
        </ResetButton>
      </ControlGroup>
    </StyledControls>
  )
}