/**
 * Utility functions for employee data processing and optimization
 */
import { Employee } from '../types'
import { getHierarchyLabel } from './hierarchy'
import { RawEmployee } from '../services/dataLoader'

// Cache for parsed dates to avoid repeated parsing
const dateCache = new Map<string, Date | null>()

/**
 * Optimized date parsing with caching
 */
export const parseDate = (dateString: string | null | undefined): Date | null => {
  if (!dateString) return null
  
  // Check cache first
  if (dateCache.has(dateString)) {
    return dateCache.get(dateString)!
  }
  
  const date = new Date(dateString)
  const isValid = !isNaN(date.getTime())
  const result = isValid ? date : null
  
  // Cache the result (including null for invalid dates)
  dateCache.set(dateString, result)
  
  return result
}

/**
 * Employee search matcher - optimized for performance
 */
export const createEmployeeSearchMatcher = (query: string) => {
  const normalizedQuery = query.toLowerCase().trim()
  
  if (!normalizedQuery) {
    return () => true // No filter if empty query
  }
  
  return (employee: Employee, rawEmployee?: RawEmployee): boolean => {
    // Pre-computed search fields to avoid repeated calls
    const searchFields = [
      employee.name,
      employee.position,
      employee.id,
      rawEmployee?.company_id || '',
      rawEmployee?.phone || '',
      getHierarchyLabel(employee.tier)
    ]
    
    return searchFields.some(field => 
      field.toLowerCase().includes(normalizedQuery)
    )
  }
}

/**
 * Employee sorter factory - optimized date sorting
 */
export const createEmployeeSorter = (
  sortBy: 'name' | 'date',
  rawEmployees: RawEmployee[]
) => {
  // Create lookup map for raw employees to avoid repeated finds
  const rawEmployeeMap = new Map(
    rawEmployees.map(raw => [raw.employee_id, raw])
  )
  
  return (a: Employee, b: Employee): number => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    }
    
    // Date sorting with cached parsing
    const rawA = rawEmployeeMap.get(a.id)
    const rawB = rawEmployeeMap.get(b.id)
    
    const dateStringA = rawA?.date_of_joining
    const dateStringB = rawB?.date_of_joining
    
    // Handle null/undefined dates - put them at the top for admin attention
    if (!dateStringA && !dateStringB) return 0
    if (!dateStringA) return -1  // A goes first (top)
    if (!dateStringB) return 1   // B goes first (top)
    
    // Use cached date parsing
    const dateA = parseDate(dateStringA)
    const dateB = parseDate(dateStringB)
    
    // Handle invalid dates
    if (!dateA && !dateB) return 0
    if (!dateA) return -1  // Invalid A goes to top
    if (!dateB) return 1   // Invalid B goes to top
    
    // Sort valid dates newest first (reverse chronological)
    return dateB.getTime() - dateA.getTime()
  }
}

/**
 * Clear the date cache (useful for testing or memory management)
 */
export const clearDateCache = (): void => {
  dateCache.clear()
}