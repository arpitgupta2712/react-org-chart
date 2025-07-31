import React from 'react'
import { Stats } from '../styles/StatsStyles'
import { EmployeeStats } from '../../../hooks/useEmployeeStats'

interface StatsDisplayProps {
  stats: EmployeeStats
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <Stats>
      <strong>📊 Organization Overview:</strong>{' '}
      Showing {stats.filtered} of {stats.total} employees |{' '}
      Largest team: {stats.largestTeam} reports
    </Stats>
  )
}