/**
 * Reusable React component utilities for the org chart
 */
import React, { useState } from 'react'

// Basic utility components for consistent data display
export const MissingData: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  React.createElement('span', { className: 'no-data' }, children)
)

export const ExecutiveStatus: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  React.createElement('span', { className: 'executive-status' }, children)
)

// Text truncation utility
export interface TruncatedTextProps {
  text: string
  maxLength?: number
  showTooltip?: boolean
  enableCopy?: boolean
  className?: string
}

export const TruncatedText: React.FC<TruncatedTextProps> = ({ 
  text, 
  maxLength = 25, 
  showTooltip = true,
  enableCopy = true,
  className 
}) => {
  const [showTooltip_internal, setShowTooltip_internal] = useState(false)
  
  const truncatedText = text.length > maxLength 
    ? `${text.slice(0, maxLength)}...` 
    : text

  const handleCopyToClipboard = async () => {
    if (!enableCopy) return
    try {
      await navigator.clipboard.writeText(text)
      // Could add a temporary "Copied!" indication here
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err)
    }
  }

  if (text.length <= maxLength) {
    return <span className={className}>{text}</span>
  }

  if (!showTooltip) {
    return <span className={className}>{truncatedText}</span>
  }

  return (
    <span 
      className={className}
      style={{ position: 'relative', cursor: enableCopy ? 'pointer' : 'default' }}
      onMouseEnter={() => setShowTooltip_internal(true)}
      onMouseLeave={() => setShowTooltip_internal(false)}
      onClick={handleCopyToClipboard}
      title={showTooltip_internal ? `${text}${enableCopy ? ' (Click to copy)' : ''}` : undefined}
    >
      {truncatedText}
    </span>
  )
}

// Clipboard utility function
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.warn('Failed to copy to clipboard:', err)
    return false
  }
}