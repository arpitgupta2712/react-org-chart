import React from 'react'
import { Employee } from '../../types'
import { RawEmployee } from '../../services/dataLoader'
import { CardHeader } from './CardHeader'
import { CardBody } from './CardBody'
import { TeamSummaryComponent } from './TeamSummaryComponent'
import { TeamDetailsComponent } from './TeamDetailsComponent'
import {
  FlipContainer,
  CardFront,
  CardBack
} from './styles/FlipCardStyles'

interface FlipCardProps {
  employee: Employee
  rawEmployee?: RawEmployee
  managerName?: string
  isFlipped: boolean
  config?: {
    showReports?: boolean
    showManager?: boolean
  }
  onFlipCard: (e: React.MouseEvent) => void
  onTeamMemberClick: (reportEmployee: Employee, e: React.MouseEvent) => void
}

export const FlipCard: React.FC<FlipCardProps> = ({
  employee,
  rawEmployee,
  managerName,
  isFlipped,
  config = {},
  onFlipCard,
  onTeamMemberClick
}) => {
  const { showReports = true, showManager = true } = config

  return (
    <FlipContainer isFlipped={isFlipped}>
      {/* FRONT OF CARD */}
      <CardFront>
        <CardHeader employee={employee} rawEmployee={rawEmployee} />
        <CardBody 
          employee={employee} 
          rawEmployee={rawEmployee} 
          managerName={managerName}
          showManager={showManager}
        />
        {showReports && (
          <TeamSummaryComponent 
            employee={employee} 
            onFlipCard={onFlipCard} 
          />
        )}
      </CardFront>

      {/* BACK OF CARD - Team Details */}
      <CardBack>
        <TeamDetailsComponent
          employee={employee}
          onFlipCard={onFlipCard}
          onTeamMemberClick={onTeamMemberClick}
        />
      </CardBack>
    </FlipContainer>
  )
}