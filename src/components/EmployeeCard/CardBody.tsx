import React from 'react'
import { Employee } from '../../types'
import { RawEmployee } from '../../services/dataLoader'
import { EmailIcon, CalendarIcon, BuildingIcon, UserIcon } from '../icons'
import { formatDate } from '../../utils/formatters'
import {
  CardBody as StyledCardBody,
  EmployeeTitle,
  EmployeeDetails,
  DetailRow,
  DetailLabel,
  DetailValue,
  CompanyTag
} from './styles/BodyStyles'
import { MissingData } from './styles/CardStyles'

interface CardBodyProps {
  employee: Employee
  rawEmployee?: RawEmployee
  managerName?: string
  showManager?: boolean
}

export const CardBody: React.FC<CardBodyProps> = ({ 
  employee, 
  rawEmployee, 
  managerName, 
  showManager = true 
}) => {
  return (
    <StyledCardBody>
      <EmployeeTitle>{employee.position}</EmployeeTitle>
      
      <EmployeeDetails>
        {/* Email - Always show */}
        <DetailRow>
          <DetailLabel><EmailIcon /> Email:</DetailLabel>
          <DetailValue>
            {rawEmployee?.company_email_id ? (
              <a href={`mailto:${rawEmployee.company_email_id}`}>
                {rawEmployee.company_email_id}
              </a>
            ) : (
              <MissingData>No email provided</MissingData>
            )}
          </DetailValue>
        </DetailRow>
        
        {/* Joining Date - Always show */}
        <DetailRow>
          <DetailLabel><CalendarIcon /> Joined:</DetailLabel>
          <DetailValue>
            {rawEmployee?.date_of_joining ? (
              formatDate(rawEmployee.date_of_joining)
            ) : (
              <MissingData>No date recorded</MissingData>
            )}
          </DetailValue>
        </DetailRow>
        
        {/* Company - Always show */}
        <DetailRow>
          <DetailLabel><BuildingIcon /> Company:</DetailLabel>
          <DetailValue>
            {rawEmployee?.company_billed_to ? (
              <CompanyTag>{rawEmployee.company_billed_to}</CompanyTag>
            ) : (
              <MissingData>No company assigned</MissingData>
            )}
          </DetailValue>
        </DetailRow>
        
        {/* Manager */}
        {showManager && employee.parentId && managerName && (
          <DetailRow>
            <DetailLabel><UserIcon /> Reports to:</DetailLabel>
            <DetailValue>{managerName}</DetailValue>
          </DetailRow>
        )}
      </EmployeeDetails>
    </StyledCardBody>
  )
}