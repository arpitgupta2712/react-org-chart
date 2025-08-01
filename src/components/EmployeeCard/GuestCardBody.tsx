import React from 'react'
import { Employee } from '../../types'
import { getHierarchyLabel } from '../../types'
import {
  CardBody as StyledCardBody,
  EmployeeTitle
} from './styles/BodyStyles'

interface GuestCardBodyProps {
  employee: Employee
}

export const GuestCardBody: React.FC<GuestCardBodyProps> = ({ employee }) => {
  return (
    <StyledCardBody>
      <EmployeeTitle>
        {employee.position} • {getHierarchyLabel(employee.tier)}
      </EmployeeTitle>
    </StyledCardBody>
  )
}