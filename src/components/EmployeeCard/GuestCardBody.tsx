import React from 'react'
import { Employee } from '../../types'
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
      {/* Minimal body for guest mode - could be empty or show tier info */}
    </StyledCardBody>
  )
}