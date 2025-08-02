/**
 * Employee Data Context - Shared data layer for employee information
 * Eliminates data duplication between components that need employee data
 */
import React, { createContext, useContext, ReactNode } from 'react'
import { useEmployeeData, UseEmployeeDataReturn } from '../hooks/useEmployeeData'

// Create the context
const EmployeeDataContext = createContext<UseEmployeeDataReturn | undefined>(undefined)

// Provider component
interface EmployeeDataProviderProps {
  children: ReactNode
}

export const EmployeeDataProvider: React.FC<EmployeeDataProviderProps> = ({ children }) => {
  const employeeData = useEmployeeData()
  
  return (
    <EmployeeDataContext.Provider value={employeeData}>
      {children}
    </EmployeeDataContext.Provider>
  )
}

// Custom hook to consume the context
export const useEmployeeDataContext = (): UseEmployeeDataReturn => {
  const context = useContext(EmployeeDataContext)
  
  if (context === undefined) {
    throw new Error('useEmployeeDataContext must be used within an EmployeeDataProvider')
  }
  
  return context
}

// Export the context for advanced use cases
export { EmployeeDataContext }