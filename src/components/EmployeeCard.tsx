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
  border: 3px solid ${props => {
    const tierColors = getTierColors(props.tier);
    return tierColors.border;
  }};
  border-radius: ${sizes.cardBorderRadius};
  padding: ${props => props.compact ? '2rem' : sizes.cardPadding};
  min-height: ${props => props.compact ? '18rem' : sizes.cardMinHeight};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  /* Enhanced shadows with multiple layers */
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.15),
    0 4px 10px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  /* Subtle pattern overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.2),
      0 8px 16px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  // Selected state - blue border with glow
  ${props => props.isSelected && `
    border: 4px solid ${colors.selectedBorder} !important;
    box-shadow: 
      0 0 0 4px rgba(127, 163, 184, 0.4),
      0 20px 40px rgba(127, 163, 184, 0.3),
      0 8px 16px rgba(0, 0, 0, 0.15) !important;
    transform: translateY(-8px);
    z-index: 2;
  `}

  // Highlighted state (subordinates) - green border  
  ${props => props.isHighlighted && `
    border: 3px solid ${colors.highlightBorder} !important;
    box-shadow: 
      0 0 0 3px ${colors.focusRing},
      0 15px 30px rgba(143, 166, 142, 0.25),
      0 6px 12px rgba(0, 0, 0, 0.1) !important;
    transform: translateY(-4px);
    z-index: 1;
  `}

  // Dimmed state
  ${props => props.isDimmed && `
    opacity: ${colors.dimmedOpacity};
    filter: grayscale(50%) brightness(0.8);
    transform: scale(0.96);
    
    &:hover {
      opacity: 0.6;
      filter: grayscale(30%) brightness(0.9);
      transform: scale(0.98);
    }
  `}
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${sizes.spaceLG};
  position: relative;
  z-index: 1;
`

const EmployeeName = styled.div`
  font-size: ${sizes.employeeName};
  font-weight: 800;
  line-height: 1.2;
  flex: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-right: ${sizes.spaceMD};
  
  /* Add a subtle highlight */
  background: linear-gradient(135deg, currentColor 0%, currentColor 100%);
  background-clip: text;
  -webkit-background-clip: text;
`

const EmployeeId = styled.div`
  font-size: ${sizes.employeeId};
  font-weight: 700;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${sizes.spaceSM} ${sizes.spaceMD};
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 4rem;
  
  &::before {
    content: '#';
    opacity: 0.7;
    font-weight: 500;
  }
`

const CardBody = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`

const EmployeeTitle = styled.div`
  font-size: ${sizes.employeeTitle};
  font-weight: 700;
  margin-bottom: ${sizes.spaceXL};
  line-height: 1.3;
  opacity: 0.95;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  /* Add subtle underline */
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${sizes.spaceSM};
    left: 0;
    width: 3rem;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1px;
  }
`

const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sizes.spaceMD};
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${sizes.employeeDetails};
  padding: ${sizes.spaceSM} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`

const DetailLabel = styled.span`
  font-weight: 600;
  opacity: 0.85;
  display: flex;
  align-items: center;
  
  /* Add icons based on content */
  &::before {
    content: '📱';
    margin-right: ${sizes.spaceXS};
    font-size: 0.9em;
  }
  
  /* Phone label */
  ${props => props.children === 'Phone:' && `
    &::before {
      content: '📱';
    }
  `}
  
  /* Salary label */
  ${props => props.children === 'Salary:' && `
    &::before {
      content: '💰';
    }
  `}
  
  /* Tier label */
  ${props => props.children === 'Tier:' && `
    &::before {
      content: '🏆';
    }
  `}
  
  /* Reports to label */
  ${props => props.children === 'Reports to:' && `
    &::before {
      content: '👤';
    }
  `}
`

const DetailValue = styled.span`
  font-weight: 700;
  text-align: right;
  flex-shrink: 0;
  
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }
  
  .no-data {
    opacity: 0.6;
    font-style: italic;
    font-weight: 500;
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
  box-sizing: border-box;
  overflow: hidden;
`

// 👥 TEAM SUMMARY (Front of card)
const TeamSummary = styled.div`
  margin-top: auto;
  padding: ${sizes.spaceLG} 0 0 0;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  
  /* Add a subtle glow effect */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
  }
`

const TeamCount = styled.div`
  font-size: ${sizes.fontLG};
  font-weight: 700;
  opacity: 0.95;
  display: flex;
  align-items: center;
  
  &::before {
    content: '👥';
    margin-right: ${sizes.spaceSM};
    font-size: 1.2em;
  }
`

const FlipButton = styled.button`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: inherit;
  padding: ${sizes.spaceMD} ${sizes.spaceLG};
  border-radius: 1.25rem;
  font-size: ${sizes.fontSM};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.25) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`

// 📋 BACK OF CARD (Team details)
const BackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${sizes.spaceXL};
  padding-bottom: ${sizes.spaceLG};
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
  }
`

const BackTitle = styled.h3`
  font-size: ${sizes.sectionTitle};
  font-weight: 800;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  
  &::before {
    content: '👑';
    margin-right: ${sizes.spaceSM};
    font-size: 1.2em;
  }
`

const TeamDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TeamStats = styled.div`
  text-align: center;
  margin-bottom: ${sizes.spaceXL};
  padding: ${sizes.spaceLG};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  strong {
    font-size: ${sizes.font2XL};
    font-weight: 800;
    display: block;
    margin-bottom: ${sizes.spaceSM};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  font-size: ${sizes.fontLG};
  font-weight: 600;
  opacity: 0.9;
`

const TeamList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${sizes.spaceSM};
  margin-bottom: ${sizes.spaceMD};
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0; /* Important for flex scrolling */
  
  /* Custom scrollbar for better UX */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`

const TeamMember = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${sizes.spaceLG};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
    transform: translateX(8px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`

const MemberInfo = styled.div`
  flex: 1;
  z-index: 1;
  position: relative;
`

const MemberName = styled.div`
  font-weight: 700;
  font-size: ${sizes.fontLG};
  margin-bottom: ${sizes.spaceSM};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`

const MemberRole = styled.div`
  font-size: ${sizes.fontSM};
  opacity: 0.85;
  font-weight: 600;
`

const NavigateIcon = styled.div`
  font-weight: 700;
  font-size: ${sizes.fontLG};
  opacity: 0.6;
  transition: all 0.3s ease;
  z-index: 1;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  
  ${TeamMember}:hover & {
    opacity: 1;
    transform: translateX(4px) scale(1.1);
    background: rgba(255, 255, 255, 0.2);
  }
`

const TeamHint = styled.div`
  font-size: ${sizes.fontSM};
  opacity: 0.8;
  text-align: center;
  font-style: italic;
  margin-top: auto;
  padding: ${sizes.spaceLG};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 500;
`

export default EmployeeCard