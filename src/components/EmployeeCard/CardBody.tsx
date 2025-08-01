import React, { useState, useEffect } from 'react'
import { Employee } from '../../types'
import { RawEmployee } from '../../services/dataLoader'
import { 
  createEmployeeDataSets,
  DataSet,
  formatCurrency,
  formatAccountNumber,
  formatDate
} from './dataSets'
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



// Component for truncated address with tooltip
const TruncatedAddress: React.FC<{ address: string }> = ({ address }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const maxLength = 25 // Maximum characters to show in truncated view

  const truncatedAddress = address.length > maxLength 
    ? `${address.slice(0, maxLength)}...` 
    : address

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address)
      // Could add a temporary "Copied!" indication here
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err)
    }
  }

  if (address.length <= maxLength) {
    return <span>{address}</span>
  }

  return (
    <TooltipContainer>
      <TruncatedText
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {truncatedAddress}
      </TruncatedText>
      <Tooltip 
        visible={showTooltip}
        onClick={handleCopyToClipboard}
      >
        {address}
        <CopyHint>Click to copy full address</CopyHint>
      </Tooltip>
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