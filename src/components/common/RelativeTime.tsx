import React from 'react'
import styled from 'styled-components'
import { getRelativeTime, formatRelativeTime } from '../../utils/relativeTime'
import { formatDate } from '../../utils/formatters'

export interface RelativeTimeProps {
  dateString: string | null | undefined
  showTooltip?: boolean
  className?: string
}

const RelativeTimeContainer = styled.span`
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-weight: inherit;
  cursor: ${props => props.title ? 'help' : 'default'};
  transition: all 0.2s ease;
  
  &:hover {
    opacity: ${props => props.title ? '0.8' : '1'};
  }
`

const MissingDataText = styled.span`
  opacity: 0.6;
  font-style: italic;
  font-weight: 500;
  color: inherit;
`

export const RelativeTime: React.FC<RelativeTimeProps> = ({ 
  dateString, 
  showTooltip = true,
  className 
}) => {
  const relativeTime = getRelativeTime(dateString)
  
  if (!relativeTime) {
    return <MissingDataText className={className}>No date recorded</MissingDataText>
  }
  
  const tooltipText = showTooltip && dateString ? 
    `Exact date: ${formatDate(dateString)}` : 
    undefined
  
  return (
    <RelativeTimeContainer 
      title={tooltipText}
      className={className}
    >
      {relativeTime.text}
    </RelativeTimeContainer>
  )
}

export default RelativeTime