import { useState, useMemo, useCallback } from 'react'
import { Employee } from '../types'
import { getHierarchyLabel } from '../utils/hierarchy'
import { RawEmployee } from '../services/dataLoader'
import { useDebounce } from './useDebounce'
import { createEmployeeSearchMatcher, createEmployeeSorter } from '../utils/employeeUtils'

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
 * Optimized custom hook for managing employee filtering and search functionality
 * Features: debounced search, cached computations, optimized sorting
 */
export const useEmployeeFiltering = (
  employees: Employee[],
  rawEmployees: RawEmployee[]
): UseEmployeeFilteringReturn => {
  const [searchQuery, setSearchQuery] = useState('')
  const [designationFilter, setDesignationFilter] = useState('')
  const [tierFilter, setTierFilter] = useState<number | ''>('')
  const [sortBy, setSortBy] = useState<SortOption>('date')

  // Debounce search query to reduce filtering frequency
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Memoized raw employee lookup map for better performance
  const rawEmployeeMap = useMemo(() => {
    return new Map(rawEmployees.map(raw => [raw.employee_id, raw]))
  }, [rawEmployees])

  // Get unique designations for filter - memoized
  const designations = useMemo(() => {
    return [...new Set(employees.map(emp => emp.position))].sort()
  }, [employees])

  // Get unique tiers with labels and counts for filter - optimized
  const tiers = useMemo(() => {
    const tierCounts = new Map<number, number>()
    const tierSet = new Set<number>()
    
    // Single pass to collect both unique tiers and counts
    employees.forEach(emp => {
      tierSet.add(emp.tier)
      tierCounts.set(emp.tier, (tierCounts.get(emp.tier) || 0) + 1)
    })

    return Array.from(tierSet)
      .sort((a, b) => a - b)
      .map(tier => ({
        tier,
        label: getHierarchyLabel(tier),
        count: tierCounts.get(tier) || 0
      }))
  }, [employees])

  // Create optimized search matcher - memoized
  const searchMatcher = useMemo(() => {
    return createEmployeeSearchMatcher(debouncedSearchQuery)
  }, [debouncedSearchQuery])

  // Create optimized sorter - memoized  
  const sorter = useMemo(() => {
    return createEmployeeSorter(sortBy, rawEmployees)
  }, [sortBy, rawEmployees])

  // Filter and sort employees with optimized performance
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

    // Apply optimized search filter with debouncing
    if (debouncedSearchQuery.trim()) {
      filtered = filtered.filter(emp => {
        const rawEmp = rawEmployeeMap.get(emp.id)
        return searchMatcher(emp, rawEmp)
      })
    }

    // Apply optimized sorting
    return [...filtered].sort(sorter)
  }, [
    employees, 
    designationFilter, 
    tierFilter, 
    debouncedSearchQuery, 
    searchMatcher, 
    sorter, 
    rawEmployeeMap
  ])

  // Memoized reset function to prevent unnecessary re-renders
  const resetFilters = useCallback(() => {
    setSearchQuery('')
    setDesignationFilter('')
    setTierFilter('')
    setSortBy('date')
  }, [])

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