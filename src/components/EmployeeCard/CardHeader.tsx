import React from 'react'
import { Employee, getHierarchyLabel } from '../../types'
import { RawEmployee } from '../../services/dataLoader'
import { PhoneIcon } from '../icons'
import { formatPhone } from '../../utils/formatters'
import {
  CardHeader as StyledCardHeader,
  EmployeeInfo,
  HeaderRight,
  EmployeeName,
  EmployeeSubtitle,
  EmployeeId
} from './styles/HeaderStyles'
import { MissingData } from './styles/CardStyles'

interface CardHeaderProps {
  employee: Employee
  rawEmployee?: RawEmployee
  guestMode?: boolean
}

export const CardHeader: React.FC<CardHeaderProps> = ({ employee, rawEmployee, guestMode = false }) => {
  return (
    <StyledCardHeader>
      <EmployeeInfo>
        <EmployeeName>{employee.name}</EmployeeName>
        <EmployeeSubtitle>
          {guestMode ? (
            // Show position in guest mode
            <span>{employee.position}</span>
          ) : (
            // Show phone in normal mode
            <>
              <PhoneIcon />
              {rawEmployee?.phone ? (
                <a href={`tel:${rawEmployee.phone}`}>
                  {formatPhone(rawEmployee.phone)}
                </a>
              ) : (
                <MissingData>No phone provided</MissingData>
              )}
            </>
          )}
        </EmployeeSubtitle>
      </EmployeeInfo>
      <HeaderRight>
        <EmployeeId>
          {rawEmployee?.company_id || employee.id}
        </EmployeeId>
      </HeaderRight>
    </StyledCardHeader>
  )
}