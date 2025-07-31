import { useState } from 'react'
import { Employee } from '../types'

export interface UseEmployeeSelectionReturn {
  selectedEmployeeId: string | null
  highlightedEmployeeId: string | null
  showingSubordinatesForId: string | null
  handleCardClick: (employee: Employee) => void
  resetSelection: () => void
  getAllSubordinates: (employeeId: string) => Set<string>
}

/**
 * Custom hook for managing employee selection and highlighting states
 */
export const useEmployeeSelection = (employees: Employee[]): UseEmployeeSelectionReturn => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const [highlightedEmployeeId, setHighlightedEmployeeId] = useState<string | null>(null)
  const [showingSubordinatesForId, setShowingSubordinatesForId] = useState<string | null>(null)

  // Get all subordinates (direct and indirect reports) of an employee
  const getAllSubordinates = (employeeId: string): Set<string> => {
    const subordinates = new Set<string>()
    const employee = employees.find(emp => emp.id === employeeId)
    
    if (!employee) return subordinates
    
    const addSubordinatesRecursively = (emp: Employee) => {
      emp.children.forEach(child => {
        subordinates.add(child.id)
        addSubordinatesRecursively(child)
      })
    }
    
    addSubordinatesRecursively(employee)
    return subordinates
  }

  const handleCardClick = (employee: Employee) => {
    if (showingSubordinatesForId === employee.id) {
      // If clicking on the same employee, clear subordinate view
      setShowingSubordinatesForId(null)
      setSelectedEmployeeId(employee.id)
      setHighlightedEmployeeId(null)
    } else {
      // Show subordinates and select the employee
      setShowingSubordinatesForId(employee.id)
      setSelectedEmployeeId(employee.id)
      setHighlightedEmployeeId(null)
    }
    console.log(`👤 Selected: ${employee.name}`)
  }



  const resetSelection = () => {
    setSelectedEmployeeId(null)
    setHighlightedEmployeeId(null)
    setShowingSubordinatesForId(null)
  }

  return {
    selectedEmployeeId,
    highlightedEmployeeId,
    showingSubordinatesForId,
    handleCardClick,
    resetSelection,
    getAllSubordinates
  }
}