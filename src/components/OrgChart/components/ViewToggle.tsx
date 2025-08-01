import React from 'react'
import { Grid, Layers } from 'lucide-react'
import { ViewToggleContainer, ToggleButton } from '../styles/ViewToggleStyles'

export type ViewMode = 'grid' | 'tier'

interface ViewToggleProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
  isNarrowScreen: boolean
  disabled?: boolean
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  currentView,
  onViewChange,
  isNarrowScreen,
  disabled = false
}) => {
  return (
    <ViewToggleContainer>
      <ToggleButton
        isActive={currentView === 'grid'}
        onClick={() => onViewChange('grid')}
        disabled={disabled}
        title="Grid View - See all employees at once"
      >
        <Grid size={20} />
      </ToggleButton>

      <ToggleButton
        isActive={currentView === 'tier'}
        onClick={() => onViewChange('tier')}
        disabled={disabled}
        title="Tier View - Navigate hierarchy one tier at a time"
        isRecommended={isNarrowScreen}
      >
        <Layers size={20} />
      </ToggleButton>
    </ViewToggleContainer>
  )
}

export default ViewToggle