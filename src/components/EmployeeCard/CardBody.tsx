import React from 'react'
import { Employee } from '../../types'
import { RawEmployee } from '../../services/dataLoader'
import { EmailIcon, CalendarIcon, UserIcon, ShieldIcon } from '../icons'
import { formatDate } from '../../utils/formatters'
import {
  CardBody as StyledCardBody,
  EmployeeTitle,
  EmployeeDetails,
  DetailRow,
  DetailLabel,
  DetailValue,
  ExecutiveStatus
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
        
        {/* Manager/Authority - Always show for consistent card height */}
        {showManager && (
          employee.parentId && managerName ? (
            <DetailRow>
              <DetailLabel><UserIcon /> Reports to:</DetailLabel>
              <DetailValue>{managerName}</DetailValue>
            </DetailRow>
          ) : (
            <DetailRow>
              <DetailLabel><ShieldIcon /> Authority:</DetailLabel>
              <DetailValue>
                <ExecutiveStatus>
                  {employee.tier === 1 ? 'Board Member' : 'Executive Leadership'}
                </ExecutiveStatus>
              </DetailValue>
            </DetailRow>
          )
        )}
      </EmployeeDetails>
    </StyledCardBody>
  )
}