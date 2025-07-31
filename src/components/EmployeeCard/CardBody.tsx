import React, { useState, useEffect } from 'react'
import { Employee } from '../../types'
import { RawEmployee } from '../../services/dataLoader'
import { 
  EmailIcon, 
  CalendarIcon, 
  UserIcon, 
  ShieldIcon,
  PersonIcon,
  FamilyIcon,
  HomeIcon,
  CityIcon,
  MoneyIcon,
  BankIcon,
  CodeIcon,
  IdIcon,
  DocumentIcon,
  VerifiedIcon
} from '../icons'
import { RelativeTime } from '../common/RelativeTime'
import {
  CardBody as StyledCardBody,
  EmployeeTitle,
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
}

// Data set definitions for rotating employee details
interface DataSet {
  id: string
  name: string
  fields: Array<{
    icon: React.ComponentType
    label: string
    value: (employee: Employee, rawEmployee?: RawEmployee, managerName?: string) => React.ReactNode
  }>
}

// Utility functions for formatting
const formatCurrency = (amount: number | string | null | undefined): string => {
  if (!amount) return 'Not provided'
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(numAmount)
}

const formatAccountNumber = (account: string | null | undefined): string => {
  if (!account) return 'Not provided'
  // Show only last 4 digits for security
  return account.length > 4 ? `****${account.slice(-4)}` : account
}

const formatDate = (dateString: string | null | undefined): React.ReactNode => {
  if (!dateString) return <MissingData>Not provided</MissingData>
  return <RelativeTime dateString={dateString} />
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
  showManager = true 
}) => {
  const [currentDataSetIndex, setCurrentDataSetIndex] = useState(0)

  // Define all data sets
  const dataSets: DataSet[] = [
    {
      id: 'basic',
      name: 'Basic Info',
      fields: [
        {
          icon: EmailIcon,
          label: 'Email:',
          value: (emp, raw) => raw?.company_email_id ? (
            <a href={`mailto:${raw.company_email_id}`}>{raw.company_email_id}</a>
          ) : <MissingData>No email provided</MissingData>
        },
        {
          icon: CalendarIcon,
          label: 'Joined:',
          value: (emp, raw) => formatDate(raw?.date_of_joining)
        },
        {
          icon: showManager && employee.parentId && managerName ? UserIcon : ShieldIcon,
          label: showManager && employee.parentId && managerName ? 'Reports to:' : 'Authority:',
          value: (emp, raw, mgr) => showManager && emp.parentId && mgr ? mgr : (
            <ExecutiveStatus>
              {emp.tier === 1 ? 'Board Member' : 'Executive Leadership'}
            </ExecutiveStatus>
          )
        }
      ]
    },
    {
      id: 'personal',
      name: 'Personal Details',
      fields: [
        {
          icon: PersonIcon,
          label: 'Nickname:',
          value: (emp, raw) => raw?.nickname || <MissingData>Not provided</MissingData>
        },
        {
          icon: EmailIcon,
          label: 'Personal Email:',
          value: (emp, raw) => raw?.personal_email_id ? (
            <a href={`mailto:${raw.personal_email_id}`}>{raw.personal_email_id}</a>
          ) : <MissingData>Not provided</MissingData>
        },
        {
          icon: CalendarIcon,
          label: 'Date of Birth:',
          value: (emp, raw) => formatDate(raw?.date_of_birth)
        }
      ]
    },
    {
      id: 'emergency',
      name: 'Emergency Details',
      fields: [
        {
          icon: FamilyIcon,
          label: "Father's Name:",
          value: (emp, raw) => raw?.fathers_name || <MissingData>Not provided</MissingData>
        },
        {
          icon: HomeIcon,
          label: 'Address:',
          value: (emp, raw) => raw?.address ? <TruncatedAddress address={raw.address} /> : <MissingData>Not provided</MissingData>
        },
        {
          icon: CityIcon,
          label: 'City:',
          value: (emp, raw) => raw?.city ? `${raw.city}, ${raw.state || ''}`.trim().replace(/,$/, '') : <MissingData>Not provided</MissingData>
        }
      ]
    },
    {
      id: 'salary',
      name: 'Salary Details',
      fields: [
        {
          icon: MoneyIcon,
          label: 'Package:',
          value: (emp, raw) => raw?.salary_package ? formatCurrency(raw.salary_package) : <MissingData>Not disclosed</MissingData>
        },
        {
          icon: BankIcon,
          label: 'Bank Account:',
          value: (emp, raw) => raw?.salary_bank_account ? formatAccountNumber(raw.salary_bank_account) : <MissingData>Not provided</MissingData>
        },
        {
          icon: CodeIcon,
          label: 'IFSC Code:',
          value: (emp, raw) => raw?.IFSC_code || <MissingData>Not provided</MissingData>
        }
      ]
    },
    {
      id: 'government',
      name: 'Government IDs',
      fields: [
        {
          icon: IdIcon,
          label: 'Aadhaar:',
          value: (emp, raw) => raw?.aadhaar_number ? `****${raw.aadhaar_number.slice(-4)}` : <MissingData>Not provided</MissingData>
        },
        {
          icon: DocumentIcon,
          label: 'PAN Number:',
          value: (emp, raw) => raw?.pan_number || <MissingData>Not provided</MissingData>
        },
        {
          icon: VerifiedIcon,
          label: 'PF Registered:',
          value: (emp, raw) => raw?.pf_registered === 'Yes' ? 'Yes' : raw?.pf_registered === 'No' ? 'No' : <MissingData>Not specified</MissingData>
        }
      ]
    }
  ]

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDataSetIndex((prevIndex) => (prevIndex + 1) % dataSets.length)
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(interval)
  }, [dataSets.length])

  const currentDataSet = dataSets[currentDataSetIndex]

  return (
    <StyledCardBody>
      <EmployeeTitle>{employee.position}</EmployeeTitle>
      
      <EmployeeDetails>
        {currentDataSet.fields.map((field, index) => {
          const IconComponent = field.icon
          return (
            <DetailRow key={`${currentDataSet.id}-${index}`}>
              <DetailLabel>
                <IconComponent /> {field.label}
              </DetailLabel>
              <DetailValue>
                {field.value(employee, rawEmployee, managerName)}
              </DetailValue>
            </DetailRow>
          )
        })}
      </EmployeeDetails>
    </StyledCardBody>
  )
}