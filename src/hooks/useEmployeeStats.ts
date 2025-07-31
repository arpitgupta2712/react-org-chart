import { useMemo } from 'react'
import { Employee } from '../types'
import { RawEmployee } from '../services/dataLoader'

export interface EmployeeStats {
  total: number
  filtered: number
  managers: number
  tiers: number
  avgSalary: number
  largestTeam: number
}

/**
 * Custom hook for calculating employee statistics
 */
export const useEmployeeStats = (
  employees: Employee[],
  filteredEmployees: Employee[],
  rawEmployees: RawEmployee[]
): EmployeeStats => {
  const stats = useMemo(() => {
    const managers = employees.filter(emp => emp.children.length > 0)
    const maxTier = Math.max(...employees.map(emp => emp.tier))
    const avgSalary = rawEmployees
      .filter(emp => emp.salary_package)
      .reduce((sum, emp) => sum + emp.salary_package, 0) / rawEmployees.length
    const largestTeam = Math.max(...managers.map(m => m.children.length), 0)

    return {
      total: employees.length,
      filtered: filteredEmployees.length,
      managers: managers.length,
      tiers: maxTier,
      avgSalary: Math.round(avgSalary),
      largestTeam
    }
  }, [employees, filteredEmployees, rawEmployees])

  return stats
}