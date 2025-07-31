import { useState, useMemo } from 'react'
import { Employee, getHierarchyLabel } from '../types'
import { RawEmployee } from '../services/dataLoader'

export interface UseEmployeeFilteringReturn {
  searchQuery: string
  setSearchQuery: (query: string) => void
  designationFilter: string
  setDesignationFilter: (filter: string) => void
  tierFilter: number | ''
  setTierFilter: (filter: number | '') => void
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

  // Filter employees based on search, designation, and tier
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

    return filtered
  }, [employees, rawEmployees, searchQuery, designationFilter, tierFilter])

  const resetFilters = () => {
    setSearchQuery('')
    setDesignationFilter('')
    setTierFilter('')
  }

  return {
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
  }
}