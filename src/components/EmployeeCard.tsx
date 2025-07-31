import React, { useState } from 'react'
import styled from 'styled-components'
import { Employee, getHierarchyLabel } from '../types'
import { RawEmployee } from '../services/dataLoader'
import { colors, sizes, getTierColors } from '../constants/colors'

// 🎨 Modern SVG Icons
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
)

const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
  </svg>
)

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
)

const TeamIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 5c0-1.66-1.34-3-3-3S10 3.34 10 5s1.34 3 3 3 3-1.34 3-3zM9 8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm6 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 7c-2.66 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zM9 15c-2.66 0-8 1.34-8 4v3h7v-3c0-1.46 1.47-2.73 3.5-3.5-.17-.17-.36-.34-.65-.5H9z"/>
  </svg>
)

const CrownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6L9.5 9 7 6 4.5 9 2 6v12h20V6l-2.5 3L17 6l-2.5 3L12 6zm0 3.5L14.5 12 12 17.5 9.5 12 12 9.5z"/>
  </svg>
)

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
    showSalary = false, // 💰 Salary not shown by default (as requested)
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

  const formatPhone = (phone: string) => {
    if (!phone) return 'No phone available'
    // Format: +91 88618 64426 or similar
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
    }
    return phone
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
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
            <EmployeeInfo>
              <EmployeeName>{employee.name}</EmployeeName>
              <EmployeeSubtitle>
                <PhoneIcon />
                {rawEmployee?.phone ? (
                  <a href={`tel:${rawEmployee.phone}`}>
                    {formatPhone(rawEmployee.phone)}
                  </a>
                ) : (
                  <MissingData>Phone not provided</MissingData>
                )}
              </EmployeeSubtitle>
            </EmployeeInfo>
            <EmployeeId>
          {rawEmployee?.company_id || employee.id}
            </EmployeeId>
          </CardHeader>

      {/* Card Body */}
          <CardBody>
            <EmployeeTitle>{employee.position}</EmployeeTitle>
        
        {/* Employee Details */}
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
                    <MissingData>Email not provided</MissingData>
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
                    <MissingData>Date not recorded</MissingData>
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
                    <MissingData>Company not assigned</MissingData>
                  )}
                </DetailValue>
              </DetailRow>
              
              {showTier && (
                <DetailRow>
                  <DetailLabel><CrownIcon /> Tier:</DetailLabel>
                  <DetailValue>{getTierName(employee.tier)}</DetailValue>
                </DetailRow>
          )}
          
          {showManager && employee.parentId && managerName && (
                <DetailRow>
                  <DetailLabel><UserIcon /> Reports to:</DetailLabel>
                  <DetailValue>{managerName}</DetailValue>
                </DetailRow>
              )}
            </EmployeeDetails>
          </CardBody>

          {/* Team Summary - Just count and flip button */}
          {showReports && hasReports && (
            <TeamSummary>
              <TeamCount>
                <TeamIcon /> {employee.children.length} direct report{employee.children.length !== 1 ? 's' : ''}
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
              <CrownIcon /> {employee.name}'s Team
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

const EmployeeInfo = styled.div`
  flex: 1;
  margin-right: ${sizes.spaceMD};
`

const EmployeeName = styled.div`
  font-size: ${sizes.employeeName};
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: ${sizes.spaceXS};
  
  /* Add a subtle highlight */
  background: linear-gradient(135deg, currentColor 0%, currentColor 100%);
  background-clip: text;
  -webkit-background-clip: text;
`

const EmployeeSubtitle = styled.div`
  font-size: ${sizes.fontSM};
  font-weight: 600;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: ${sizes.spaceXS};
  
  svg {
    opacity: 0.8;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }
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
  gap: ${sizes.spaceXS};
  
  svg {
    opacity: 0.7;
    flex-shrink: 0;
  }
`

const CompanyTag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: ${sizes.spaceXS} ${sizes.spaceSM};
  border-radius: 0.75rem;
  font-size: ${sizes.fontXS};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

const MissingData = styled.span`
  color: ${colors.warning};
  font-style: italic;
  font-size: 0.9em;
  font-weight: 600;
  opacity: 0.85;
  border: 1px dashed ${colors.warning};
  padding: 0.3rem 0.6rem;
  border-radius: 0.35rem;
  background: rgba(199, 165, 116, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: help;
  white-space: nowrap;
  display: inline-block;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
    background: ${colors.warning};
    color: white;
    border-color: ${colors.warning};
    box-shadow: 0 4px 12px rgba(199, 165, 116, 0.3);
  }

  &::before {
    content: "⚠️ ";
    margin-right: 0.25rem;
    font-size: 0.8em;
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
  gap: ${sizes.spaceSM};
  
  svg {
    opacity: 0.8;
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
  gap: ${sizes.spaceSM};
  
  svg {
    opacity: 0.8;
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