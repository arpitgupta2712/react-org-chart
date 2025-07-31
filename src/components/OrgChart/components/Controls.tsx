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
  SortIcon
} from '../../icons'

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
  onReset
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Calculate active filters
  const activeFilters = [
    designationFilter && `Position: ${designationFilter}`,
    tierFilter !== '' && `Tier: ${tiers.find(t => t.tier === tierFilter)?.label}`,
    searchQuery.trim() && `Search: "${searchQuery.trim()}"`
  ].filter(Boolean)

  return (
    <StyledControls isExpanded={isExpanded}>
      {/* Simple Header Bar */}
      <ControlsHeader>
        <ControlGroup>
          <ToggleButton 
            onClick={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
          >
            <SettingsIcon /> {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </ToggleButton>
          
          <ToggleButton
            onClick={() => onSortChange(sortBy === 'date' ? 'name' : 'date')}
            isExpanded={false}
            title={`Currently sorting by ${sortBy === 'date' ? 'joining date (newest first)' : 'name (A-Z)'}`}
          >
            <SortIcon /> {sortBy === 'date' ? 'By Date' : 'By Name'}
          </ToggleButton>
        </ControlGroup>
        
        {activeFilters.length > 0 && (
          <ResetButton onClick={onReset} title="Reset All Filters">
            <ResetIcon /> Reset Filters
          </ResetButton>
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