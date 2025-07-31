import { useState, useMemo } from 'react'
import { Employee } from '../types'
import { RawEmployee } from '../services/dataLoader'

export interface UseEmployeeFilteringReturn {
  searchQuery: string
  setSearchQuery: (query: string) => void
  designationFilter: string
  setDesignationFilter: (filter: string) => void
  filteredEmployees: Employee[]
  designations: string[]
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

  // Get unique designations for filter
  const designations = useMemo(() => {
    const unique = [...new Set(employees.map(emp => emp.position))].sort()
    return unique
  }, [employees])

  // Filter employees based on search and designation
  const filteredEmployees = useMemo(() => {
    let filtered = employees

    // Apply designation filter
    if (designationFilter) {
      filtered = filtered.filter(emp => emp.position === designationFilter)
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
          rawEmp?.phone?.toLowerCase().includes(query)
        )
      })
    }

    return filtered
  }, [employees, rawEmployees, searchQuery, designationFilter])

  const resetFilters = () => {
    setSearchQuery('')
    setDesignationFilter('')
  }

  return {
    searchQuery,
    setSearchQuery,
    designationFilter,
    setDesignationFilter,
    filteredEmployees,
    designations,
    resetFilters
  }
}