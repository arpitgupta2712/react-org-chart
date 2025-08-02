import React from 'react'
import { Employee } from '../../types'
import { RawEmployee } from '../../services/dataLoader'
import { RelativeTime } from '../common/RelativeTime'
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

// Data set definitions for rotating employee details
export interface DataSet {
  id: string
  name: string
  fields: Array<{
    icon: React.ComponentType
    label: string
    value: (employee: Employee, rawEmployee?: RawEmployee, managerName?: string) => React.ReactNode | { type: 'truncated-address'; address: string }
  }>
}

// Utility functions for formatting
export const formatCurrency = (amount: number | string | null | undefined): string => {
  if (!amount) return 'Not provided'
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount)
}

export const formatAccountNumber = (accountNumber: string | null | undefined): string => {
  if (!accountNumber) return 'Not provided'
  const cleanNumber = accountNumber.replace(/\D/g, '')
  if (cleanNumber.length < 4) return '****'
  return `****${cleanNumber.slice(-4)}`
}

export const formatDate = (dateString: string | null | undefined): React.ReactNode => {
  if (!dateString) return React.createElement('span', { className: 'no-data' }, 'Not provided')
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return React.createElement('span', { className: 'no-data' }, 'Invalid date')
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    return React.createElement('span', { className: 'no-data' }, 'Invalid date')
  }
}

export const formatRelativeDate = (dateString: string | null | undefined): React.ReactNode => {
  if (!dateString) return React.createElement('span', { className: 'no-data' }, 'Not provided')
  return React.createElement(RelativeTime, { dateString, showTooltip: true })
}

// Missing data component placeholder
export const MissingData: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  React.createElement('span', { className: 'no-data' }, children)
)

// Executive status component placeholder  
export const ExecutiveStatus: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  React.createElement('span', { className: 'executive-status' }, children)
)

// Define all employee data sets
export const createEmployeeDataSets = (showManager: boolean): DataSet[] => [
  {
    id: 'basic',
    name: 'Basic Info',
    fields: [
      {
        icon: EmailIcon,
        label: 'Email:',
        value: (emp, raw) => raw?.company_email_id ? (
          React.createElement('a', { href: `mailto:${raw.company_email_id}` }, raw.company_email_id)
        ) : React.createElement('span', { className: 'no-data' }, 'No email provided')
      },
      {
        icon: CalendarIcon,
        label: 'Joined:',
        value: (emp, raw) => formatRelativeDate(raw?.date_of_joining)
      },
      {
        icon: showManager ? UserIcon : ShieldIcon,
        label: showManager ? 'Reports to:' : 'Authority:',
        value: (employee, raw, mgr) => showManager && employee.parentId && mgr ? mgr : (
          React.createElement('span', { className: 'executive-status' }, 
            employee.tier === 1 ? 'Board Member' : 'Executive Leadership'
          )
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
        value: (emp, raw) => raw?.nickname || React.createElement('span', { className: 'no-data' }, 'Not provided')
      },
      {
        icon: EmailIcon,
        label: 'Personal Email:',
        value: (emp, raw) => raw?.personal_email_id ? (
          React.createElement('a', { href: `mailto:${raw.personal_email_id}` }, raw.personal_email_id)
        ) : React.createElement('span', { className: 'no-data' }, 'Not provided')
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
        value: (emp, raw) => raw?.fathers_name || React.createElement('span', { className: 'no-data' }, 'Not provided')
      },
      {
        icon: HomeIcon,
        label: 'Address:',
        value: (emp, raw) => {
          if (!raw?.address) return React.createElement('span', { className: 'no-data' }, 'Not provided')
          // Return a custom component marker that CardBody will handle
          return { type: 'truncated-address', address: raw.address }
        }
      },
      {
        icon: CityIcon,
        label: 'City:',
        value: (emp, raw) => raw?.city ? 
          `${raw.city}, ${raw.state || ''}`.trim().replace(/,$/, '') : 
          React.createElement('span', { className: 'no-data' }, 'Not provided')
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
        value: (emp, raw) => raw?.salary_package ? 
          formatCurrency(raw.salary_package) : 
          React.createElement('span', { className: 'no-data' }, 'Not disclosed')
      },
      {
        icon: BankIcon,
        label: 'Bank Account:',
        value: (emp, raw) => raw?.salary_bank_account ? 
          formatAccountNumber(raw.salary_bank_account) : 
          React.createElement('span', { className: 'no-data' }, 'Not provided')
      },
      {
        icon: CodeIcon,
        label: 'IFSC Code:',
        value: (emp, raw) => raw?.IFSC_code || React.createElement('span', { className: 'no-data' }, 'Not provided')
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
        value: (emp, raw) => raw?.aadhaar_number ? 
          `****${raw.aadhaar_number.slice(-4)}` : 
          React.createElement('span', { className: 'no-data' }, 'Not provided')
      },
      {
        icon: DocumentIcon,
        label: 'PAN Number:',
        value: (emp, raw) => raw?.pan_number || React.createElement('span', { className: 'no-data' }, 'Not provided')
      },
      {
        icon: VerifiedIcon,
        label: 'PF Registered:',
        value: (emp, raw) => raw?.pf_registered === 'Yes' ? 'Yes' : 
          raw?.pf_registered === 'No' ? 'No' : 
          React.createElement('span', { className: 'no-data' }, 'Not specified')
      }
    ]
  }
]