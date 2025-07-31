import React from 'react'
import { Employee } from '../../types'
import { TeamIcon } from '../icons'
import {
  TeamSummary,
  TeamCount
} from './styles/TeamStyles'
import { FlipButton } from './styles/FlipCardStyles'

interface TeamSummaryProps {
  employee: Employee
  onFlipCard: (e: React.MouseEvent) => void
}

export const TeamSummaryComponent: React.FC<TeamSummaryProps> = ({ 
  employee, 
  onFlipCard 
}) => {
  const hasReports = employee.children.length > 0

  if (!hasReports) {
    return null
  }

  return (
    <TeamSummary>
      <TeamCount>
        <TeamIcon /> {employee.children.length} direct report{employee.children.length !== 1 ? 's' : ''}
      </TeamCount>
      <FlipButton onClick={onFlipCard}>
        View Team →
      </FlipButton>
    </TeamSummary>
  )
}