import { useState, useMemo } from 'react'
import { Employee, getHierarchyLabel } from '../types'
import { RawEmployee } from '../services/dataLoader'

export type SortOption = 'date' | 'name'

export interface UseEmployeeFilteringReturn {
  searchQuery: string
  setSearchQuery: (query: string) => void
  designationFilter: string
  setDesignationFilter: (filter: string) => void
  tierFilter: number | ''
  setTierFilter: (filter: number | '') => void
  sortBy: SortOption
  setSortBy: (sort: SortOption) => void
  filteredEmployees: Employee[]
  designations: string[]
  tiers: Array<{ tier: number; label: string; count: number }>
  resetFilters: () => void
}

/**
 * Custom hook for managing employee filtering and search functionality
 */
export const useEmployeeFiltering = (
  employees: Employee[],
  rawEmployees: RawEmployee[]
): UseEmployeeFilteringReturn => {
  const [searchQuery, setSearchQuery] = useState('')
  const [designationFilter, setDesignationFilter] = useState('')
  const [tierFilter, setTierFilter] = useState<number | ''>('')
  const [sortBy, setSortBy] = useState<SortOption>('date')

  // Get unique designations for filter
  const designations = useMemo(() => {
    const unique = [...new Set(employees.map(emp => emp.position))].sort()
    return unique
  }, [employees])

  // Get unique tiers with labels and counts for filter
  const tiers = useMemo(() => {
    const tierCounts = employees.reduce((acc, emp) => {
      acc[emp.tier] = (acc[emp.tier] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    const unique = [...new Set(employees.map(emp => emp.tier))]
      .sort((a, b) => a - b)
      .map(tier => ({
        tier,
        label: getHierarchyLabel(tier),
        count: tierCounts[tier] || 0
      }))
    
    return unique
  }, [employees])

  // Filter and sort employees based on search, designation, tier, and sort option
  const filteredEmployees = useMemo(() => {
    let filtered = employees

    // Apply designation filter
    if (designationFilter) {
      filtered = filtered.filter(emp => emp.position === designationFilter)
    }

    // Apply tier filter
    if (tierFilter !== '') {
      filtered = filtered.filter(emp => emp.tier === tierFilter)
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
          rawEmp?.phone?.toLowerCase().includes(query) ||
          getHierarchyLabel(emp.tier).toLowerCase().includes(query)
        )
      })
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else {
        // Sort by joining date (newest first, null values at top)
        const rawA = rawEmployees.find(raw => raw.employee_id === a.id)
        const rawB = rawEmployees.find(raw => raw.employee_id === b.id)
        
        const dateStringA = rawA?.date_of_joining
        const dateStringB = rawB?.date_of_joining
        
        // Handle null/undefined dates - put them at the top for admin attention
        if (!dateStringA && !dateStringB) return 0
        if (!dateStringA) return -1  // A goes first (top)
        if (!dateStringB) return 1   // B goes first (top)
        
        // Parse dates properly
        const dateA = new Date(dateStringA)
        const dateB = new Date(dateStringB)
        
        // Handle invalid dates
        if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0
        if (isNaN(dateA.getTime())) return -1  // Invalid A goes to top
        if (isNaN(dateB.getTime())) return 1   // Invalid B goes to top
        
        // Sort valid dates newest first (reverse chronological)
        return dateB.getTime() - dateA.getTime()
      }
    })

    return filtered
  }, [employees, rawEmployees, searchQuery, designationFilter, tierFilter, sortBy])

  const resetFilters = () => {
    setSearchQuery('')
    setDesignationFilter('')
    setTierFilter('')
    setSortBy('date')
  }

  return {
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
  }
}