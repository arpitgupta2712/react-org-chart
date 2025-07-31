import { useState, useEffect } from 'react'
import { Employee } from '../types'
import { dataLoader, RawEmployee } from '../services/dataLoader'

export interface UseEmployeeDataReturn {
  employees: Employee[]
  rawEmployees: RawEmployee[]
  loading: boolean
  error: string | null
  getRawEmployee: (employeeId: string) => RawEmployee | undefined
  getManagerName: (managerId: string) => string
}

/**
 * Custom hook for managing employee data loading and basic employee operations
 */
export const useEmployeeData = (): UseEmployeeDataReturn => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [rawEmployees, setRawEmployees] = useState<RawEmployee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load data on hook mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const { employees, rawEmployees } = await dataLoader.loadEmployees()
        setEmployees(employees)
        setRawEmployees(rawEmployees)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Get raw employee data for a given employee ID
  const getRawEmployee = (employeeId: string): RawEmployee | undefined => {
    return rawEmployees.find(raw => raw.employee_id === employeeId)
  }

  // Get manager name for an employee
  const getManagerName = (managerId: string): string => {
    const manager = employees.find(emp => emp.id === managerId)
    return manager ? manager.name : 'Unknown'
  }

  return {
    employees,
    rawEmployees,
    loading,
    error,
    getRawEmployee,
    getManagerName
  }
}