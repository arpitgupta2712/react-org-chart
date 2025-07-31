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
  const [isFlipped, setIsFlipped] = useState(false)

  // Use the dynamic hierarchy label function from types
  const getTierName = (tier: number): string => {
    return getHierarchyLabel(tier)
  }

  const handleFlipCard = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the main card click
    setIsFlipped(!isFlipped)
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
      <FlipContainer isFlipped={isFlipped}>
        {/* FRONT OF CARD */}
        <CardFront>
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

          {/* Team Summary - Just count and flip button */}
          {showReports && hasReports && (
            <TeamSummary>
              <TeamCount>
                👥 {employee.children.length} direct report{employee.children.length !== 1 ? 's' : ''}
              </TeamCount>
              <FlipButton onClick={handleFlipCard}>
                View Team →
              </FlipButton>
            </TeamSummary>
          )}
        </CardFront>

        {/* BACK OF CARD - Team Details */}
        <CardBack>
          <BackHeader>
            <BackTitle>
              {employee.name}'s Team
            </BackTitle>
            <FlipButton onClick={handleFlipCard}>
              ← Back
            </FlipButton>
          </BackHeader>

          <TeamDetails>
            <TeamStats>
              <strong>{employee.children.length}</strong> Direct Reports
            </TeamStats>
            
            <TeamList>
              {employee.children.map((child, index) => (
                <TeamMember 
                  key={child.id}
                  onClick={(e) => handleTeamMemberClick(child, e)}
                  title={`Navigate to ${child.name}`}
                >
                  <MemberInfo>
                    <MemberName>{child.name}</MemberName>
                    <MemberRole>{child.position}</MemberRole>
                  </MemberInfo>
                  <NavigateIcon>→</NavigateIcon>
                </TeamMember>
              ))}
            </TeamList>
            
            <TeamHint>Click any team member to navigate to their card</TeamHint>
          </TeamDetails>
        </CardBack>
      </FlipContainer>
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

// 🔄 FLIP CARD COMPONENTS
const FlipContainer = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
`

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  padding: ${sizes.spaceLG};
`

// 👥 TEAM SUMMARY (Front of card)
const TeamSummary = styled.div`
  margin-top: auto;
  padding-top: ${sizes.spaceMD};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TeamCount = styled.div`
  font-size: ${sizes.fontSM};
  font-weight: 600;
  opacity: 0.9;
`

const FlipButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: inherit;
  padding: ${sizes.spaceXS} ${sizes.spaceSM};
  border-radius: ${sizes.spaceSM};
  font-size: ${sizes.fontXS};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`

// 📋 BACK OF CARD (Team details)
const BackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${sizes.spaceLG};
  padding-bottom: ${sizes.spaceMD};
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const BackTitle = styled.h3`
  font-size: ${sizes.fontLG};
  font-weight: 700;
  margin: 0;
`

const TeamDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const TeamStats = styled.div`
  text-align: center;
  margin-bottom: ${sizes.spaceLG};
  font-size: ${sizes.fontBase};
  
  strong {
    font-size: ${sizes.fontXL};
    display: block;
    margin-bottom: ${sizes.spaceXS};
  }
`

const TeamList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${sizes.spaceSM};
  margin-bottom: ${sizes.spaceMD};
  max-height: 200px;
  overflow-y: auto;
`

const TeamMember = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${sizes.spaceSM};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${sizes.spaceSM};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(4px);
  }
`

const MemberInfo = styled.div`
  flex: 1;
`

const MemberName = styled.div`
  font-weight: 600;
  font-size: ${sizes.fontSM};
  margin-bottom: ${sizes.spaceXS};
`

const MemberRole = styled.div`
  font-size: ${sizes.fontXS};
  opacity: 0.8;
`

const NavigateIcon = styled.div`
  font-weight: 700;
  opacity: 0.6;
  transition: all 0.2s ease;
  
  ${TeamMember}:hover & {
    opacity: 1;
    transform: translateX(2px);
  }
`

const TeamHint = styled.div`
  font-size: ${sizes.fontXS};
  opacity: 0.7;
  text-align: center;
  font-style: italic;
  margin-top: auto;
`

export default EmployeeCard