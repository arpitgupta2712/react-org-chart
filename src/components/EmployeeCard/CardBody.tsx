import React, { useState, useEffect } from 'react'
import { Employee } from '../../types'
import { RawEmployee } from '../../services/dataLoader'
import { 
  createEmployeeDataSets,
  DataSet,
  formatDate
} from './dataSets'
import { formatCurrency, formatAccountNumber } from '../../utils/formatters'
import { TruncatedText as TruncatedTextUtil } from '../../utils/componentUtils'
import { RelativeTime } from '../common/RelativeTime'
import {
  CardBody as StyledCardBody,
  EmployeeTitle,
  DataSetTitle,
  EmployeeDetails,
  DetailRow,
  DetailLabel,
  DetailValue,
  ExecutiveStatus,
  TruncatedText,
  TooltipContainer,
  Tooltip,
  CopyHint
} from './styles/BodyStyles'
import { MissingData } from './styles/CardStyles'

interface CardBodyProps {
  employee: Employee
  rawEmployee?: RawEmployee
  managerName?: string
  showManager?: boolean
  currentDataSetIndex?: number
}



// Component for truncated address with tooltip (now using utility)
const TruncatedAddress: React.FC<{ address: string }> = ({ address }) => {
  return (
    <TooltipContainer>
      <TruncatedTextUtil
        text={address}
        maxLength={25}
        showTooltip={true}
        enableCopy={true}
      />
    </TooltipContainer>
  )
}

export const CardBody: React.FC<CardBodyProps> = ({ 
  employee, 
  rawEmployee, 
  managerName, 
  showManager = true,
  currentDataSetIndex: externalDataSetIndex
}) => {
  const [internalDataSetIndex, setInternalDataSetIndex] = useState(0)

  // Get data sets from dedicated file
  const dataSets = createEmployeeDataSets(showManager)

  // Auto-rotation effect - only runs if no external control is provided
  useEffect(() => {
    if (externalDataSetIndex !== undefined) return // Don't auto-rotate if externally controlled
    
    const interval = setInterval(() => {
      setInternalDataSetIndex((prevIndex) => (prevIndex + 1) % dataSets.length)
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(interval)
  }, [dataSets.length, externalDataSetIndex])

  // Use external index if provided, otherwise use internal index
  const currentDataSetIndex = externalDataSetIndex !== undefined ? externalDataSetIndex : internalDataSetIndex
  const currentDataSet = dataSets[currentDataSetIndex]

  return (
    <StyledCardBody>
      <EmployeeTitle>{employee.position}</EmployeeTitle>
      <DataSetTitle>{currentDataSet.name}</DataSetTitle>
      
      <EmployeeDetails>
        {currentDataSet.fields.map((field, index) => {
          const IconComponent = field.icon
          const value = field.value(employee, rawEmployee, managerName)
          
          // Handle special case for truncated address
          const displayValue: React.ReactNode = value && typeof value === 'object' && 'type' in value && value.type === 'truncated-address' 
            ? <TruncatedAddress address={(value as any).address} />
            : value as React.ReactNode
          
          return (
            <DetailRow key={`${currentDataSet.id}-${index}`}>
              <DetailLabel>
                <IconComponent /> {field.label}
              </DetailLabel>
              <DetailValue>
                {displayValue}
              </DetailValue>
            </DetailRow>
          )
        })}
      </EmployeeDetails>
    </StyledCardBody>
  )
}