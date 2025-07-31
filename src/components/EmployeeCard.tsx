import React, { useState } from 'react'
import styled from 'styled-components'
import { Employee, getHierarchyLabel } from '../types'
import { RawEmployee } from '../services/dataLoader'
import { colors, sizes, getTierColors } from '../constants/colors'

interface EmployeeCardProps {
  employee: Employee
  rawEmployee?: RawEmployee
  config?: {
    showSalary?: boolean
    showPhone?: boolean
    showReports?: boolean
    showTier?: boolean
    showManager?: boolean
    compact?: boolean
  }
  managerName?: string
  onCardClick?: (employee: Employee) => void
  onReportClick?: (employee: Employee) => void
  isSelected?: boolean
  isHighlighted?: boolean
  isDimmed?: boolean
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  rawEmployee,
  config = {},
  managerName,
  onCardClick,
  onReportClick,
  isSelected = false,
  isHighlighted = false,
  isDimmed = false
}) => {
  
  const {
    showSalary = true,
    showPhone = true,
    showReports = true,
    showTier = true,
    showManager = true,
    compact = false
  } = config

  const hasReports = employee.children.length > 0

  // Use the dynamic hierarchy label function from types
  const getTierName = (tier: number): string => {
    return getHierarchyLabel(tier)
  }

  const formatPhone = () => {
    if (!rawEmployee?.phone) {
      return <span className="no-data">No phone</span>
    }
    return (
      <a href={`tel:${rawEmployee.phone}`} className="phone-link">
        {rawEmployee.phone}
      </a>
    )
  }

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(employee)
    }
  }

  const handleTeamMemberClick = (reportEmployee: Employee, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering card click
    if (onReportClick) {
      onReportClick(reportEmployee)
    }
  }

  const tierColors = getTierColors(employee.tier)

  return (
    <StyledEmployeeCard 
      tier={employee.tier}
      compact={compact}
      hasReports={hasReports}
      isSelected={isSelected}
      isHighlighted={isHighlighted}
      isDimmed={isDimmed}
      data-employee-id={employee.id}
      data-name={employee.name}
      data-designation={employee.position}
      data-phone={rawEmployee?.phone || ''}
      data-tier={employee.tier}
      onClick={handleCardClick}
    >
      {/* Card Header */}
      <CardHeader>
        <EmployeeName>{employee.name}</EmployeeName>
        <EmployeeId>
          {rawEmployee?.company_id || employee.id}
        </EmployeeId>
      </CardHeader>

      {/* Card Body */}
      <CardBody>
        <EmployeeTitle>{employee.position}</EmployeeTitle>
        
        {/* Employee Details */}
        <EmployeeDetails>
          {showPhone && (
            <DetailRow>
              <DetailLabel>Phone:</DetailLabel>
              <DetailValue>{formatPhone()}</DetailValue>
            </DetailRow>
          )}
          
          {showSalary && rawEmployee?.salary_package && (
            <DetailRow>
              <DetailLabel>Salary:</DetailLabel>
              <DetailValue>
                ₹{rawEmployee.salary_package.toLocaleString()}
              </DetailValue>
            </DetailRow>
          )}
          
          {showTier && (
            <DetailRow>
              <DetailLabel>Tier:</DetailLabel>
              <DetailValue>{getTierName(employee.tier)}</DetailValue>
            </DetailRow>
          )}
          
          {showManager && employee.parentId && managerName && (
            <DetailRow>
              <DetailLabel>Reports to:</DetailLabel>
              <DetailValue>{managerName}</DetailValue>
            </DetailRow>
          )}
        </EmployeeDetails>
      </CardBody>

      {/* Reports Section */}
      {showReports && hasReports && (
        <ReportsSection>
          <ReportsInfo>
            <ReportsCount>{employee.children.length}</ReportsCount>
            <ReportsLabel>direct reports</ReportsLabel>
          </ReportsInfo>
          <ReportsHint>Click card to highlight team</ReportsHint>
          
          <TeamPreview>
            {employee.children.slice(0, 3).map((child, index) => (
              <TeamMemberName 
                key={child.id}
                onClick={(e) => handleTeamMemberClick(child, e)}
                title={`Navigate to ${child.name}`}
              >
                {child.name}
                {index < Math.min(employee.children.length - 1, 2) && ', '}
              </TeamMemberName>
            ))}
            {employee.children.length > 3 && (
              <MoreMembers>... +{employee.children.length - 3} more</MoreMembers>
            )}
          </TeamPreview>
        </ReportsSection>
      )}
    </StyledEmployeeCard>
  )
}

// 🎨 ALL STYLES IN ONE PLACE - Easy to find and modify!
const StyledEmployeeCard = styled.div<{
  tier: number
  compact: boolean
  hasReports: boolean
  isSelected: boolean
  isHighlighted: boolean
  isDimmed: boolean
}>`
  font-family: 'PT Sans', sans-serif;
  background: ${props => {
    const tierColors = getTierColors(props.tier);
    return tierColors.background;
  }};
  color: ${props => {
    const tierColors = getTierColors(props.tier);
    return tierColors.text;
  }};
  border: 2px solid ${props => {
    const tierColors = getTierColors(props.tier);
    return tierColors.border;
  }};
  border-radius: ${sizes.cardBorderRadius};
  padding: ${props => props.compact ? '1.25rem' : sizes.cardPadding};
  min-height: ${props => props.compact ? '9rem' : sizes.cardMinHeight};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: ${props => {
    const tierColors = getTierColors(props.tier);
    return tierColors.shadow;
  }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  }

  // Selected state - blue border with glow
  ${props => props.isSelected && `
    border: 3px solid ${colors.selectedBorder} !important;
    box-shadow: 0 0 0 4px rgba(127, 163, 184, 0.4), ${getTierColors(props.tier).shadow} !important;
    transform: translateY(-3px);
    z-index: 2;
  `}

  // Highlighted state (subordinates) - green border  
  ${props => props.isHighlighted && `
    border: 2px solid ${colors.highlightBorder} !important;
    box-shadow: 0 0 0 3px ${colors.focusRing}, ${getTierColors(props.tier).shadow} !important;
    transform: translateY(-1px);
    z-index: 1;
  `}

  // Dimmed state
  ${props => props.isDimmed && `
    opacity: ${colors.dimmedOpacity};
    filter: grayscale(50%) brightness(0.8);
    transform: scale(0.98);
    
    &:hover {
      opacity: 0.6;
      filter: grayscale(30%) brightness(0.9);
      transform: scale(0.99);
    }
  `}
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${sizes.spaceMD};
`

const EmployeeName = styled.div`
  font-size: ${sizes.employeeName};
  font-weight: 700;
  line-height: 1.25;
  flex: 1;
`

const EmployeeId = styled.div`
  font-size: ${sizes.employeeId};
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  padding: ${sizes.spaceXS} ${sizes.spaceSM};
  border-radius: 0.75rem;
  margin-left: ${sizes.spaceSM};
`

const CardBody = styled.div`
  flex: 1;
`

const EmployeeTitle = styled.div`
  font-size: ${sizes.employeeTitle};
  font-weight: 600;
  margin-bottom: ${sizes.spaceMD};
  line-height: 1.3;
`

const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sizes.spaceXS};
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${sizes.employeeDetails};
`

const DetailLabel = styled.span`
  font-weight: 500;
  opacity: 0.9;
`

const DetailValue = styled.span`
  font-weight: 600;
  text-align: right;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .no-data {
    opacity: 0.6;
    font-style: italic;
  }
`

const ReportsSection = styled.div`
  margin-top: ${sizes.spaceLG};
  padding-top: ${sizes.spaceMD};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`

const ReportsInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${sizes.spaceXS};
  margin-bottom: ${sizes.spaceXS};
`

const ReportsCount = styled.span`
  font-size: ${sizes.fontLG};
  font-weight: 700;
  color: ${colors.textWhite};
`

const ReportsLabel = styled.span`
  font-size: ${sizes.fontXS};
  font-weight: 500;
  opacity: 0.8;
`

const ReportsHint = styled.div`
  font-size: ${sizes.fontXS};
  opacity: 0.7;
  font-style: italic;
  margin-bottom: ${sizes.spaceSM};
`

const TeamPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${sizes.spaceXS};
  align-items: center;
`

const TeamMemberName = styled.span`
  font-size: ${sizes.fontXS};
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all 0.15s ease;
  
  &:hover {
    text-decoration-color: currentColor;
    transform: translateY(-1px);
  }
`

const MoreMembers = styled.span`
  font-size: ${sizes.fontXS};
  font-weight: 500;
  opacity: 0.7;
`

export default EmployeeCard