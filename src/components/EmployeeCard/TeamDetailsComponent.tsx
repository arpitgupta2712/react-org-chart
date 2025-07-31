import React from 'react'
import { Employee } from '../../types'
import { CrownIcon } from '../icons'
import {
  BackHeader,
  BackTitle,
  TeamDetails,
  TeamStats,
  TeamList,
  TeamMember,
  MemberInfo,
  MemberName,
  MemberRole,
  NavigateIcon,
  TeamHint
} from './styles/TeamStyles'
import { FlipButton } from './styles/FlipCardStyles'

interface TeamDetailsProps {
  employee: Employee
  onFlipCard: (e: React.MouseEvent) => void
  onTeamMemberClick: (reportEmployee: Employee, e: React.MouseEvent) => void
}

export const TeamDetailsComponent: React.FC<TeamDetailsProps> = ({ 
  employee, 
  onFlipCard, 
  onTeamMemberClick 
}) => {
  return (
    <>
      <BackHeader>
        <BackTitle>
          <CrownIcon /> {employee.name}'s Team
        </BackTitle>
        <FlipButton onClick={onFlipCard}>
          ← Back
        </FlipButton>
      </BackHeader>

      <TeamDetails>
        <TeamStats>
          <strong>{employee.children.length}</strong> Direct Reports
        </TeamStats>
        
        <TeamList>
          {employee.children.map((child) => (
            <TeamMember 
              key={child.id}
              onClick={(e) => onTeamMemberClick(child, e)}
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
    </>
  )
}