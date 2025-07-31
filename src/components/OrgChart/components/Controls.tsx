import React, { useState } from 'react'
import {
  Controls as StyledControls,
  ControlsHeader,
  ControlsContent,
  ControlGroup,
  FilterSelect,
  SearchInput,
  ActionButton,
  ResetButton,
  FilterLabel,
  ToggleButton,
  QuickStats,
  CompactFilterRow
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
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Calculate active filters for quick stats
  const activeFilters = [
    designationFilter && `Position: ${designationFilter}`,
    tierFilter !== '' && `Tier: ${tiers.find(t => t.tier === tierFilter)?.label}`,
    searchQuery.trim() && `Search: "${searchQuery.trim()}"`
  ].filter(Boolean)

  const totalEmployees = Object.values(employeeCounts).reduce((sum, count) => sum + count, 0)

  return (
    <StyledControls isExpanded={isExpanded}>
      {/* Compact Header Bar */}
      <ControlsHeader>
        <QuickStats>
          <span>📊 {totalEmployees} Employees</span>
          {activeFilters.length > 0 && (
            <span>• 🔍 {activeFilters.length} Filter{activeFilters.length > 1 ? 's' : ''} Active</span>
          )}
        </QuickStats>
        
        <ControlGroup>
          <ToggleButton 
            onClick={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
          >
            {isExpanded ? '⚙️ Hide Filters' : '⚙️ Show Filters'}
          </ToggleButton>
          
          {/* Quick action buttons always visible */}
          <ActionButton onClick={onExpandAll} title="Expand All Cards">
            📖
          </ActionButton>
          <ActionButton onClick={onCollapseAll} title="Collapse All Cards">
            📕
          </ActionButton>
          {activeFilters.length > 0 && (
            <ResetButton onClick={onReset} title="Reset All Filters">
              🔄
            </ResetButton>
          )}
        </ControlGroup>
      </ControlsHeader>

      {/* Expandable Content */}
      <ControlsContent isExpanded={isExpanded}>
        {/* Compact Filter Row */}
        <CompactFilterRow>
          <ControlGroup>
            <FilterLabel>🏢</FilterLabel>
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
              placeholder="🔍 Search..." 
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