/**
 * Consolidated date and time utility functions
 */

// Type definitions
export interface RelativeTimeResult {
  value: number
  unit: 'year' | 'month' | 'day' | 'today' | 'future'
  text: string
}

// Date object formatters (for current time display)
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Date string formatters (for employee data)
export const formatDateString = (dateString: string): string => {
  if (!dateString) return 'Not specified'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Relative time functions
export const getRelativeTime = (dateString: string | null | undefined): RelativeTimeResult | null => {
  if (!dateString) return null
  
  const inputDate = new Date(dateString)
  if (isNaN(inputDate.getTime())) return null
  
  const today = new Date()
  const diffInMs = today.getTime() - inputDate.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  // Handle future dates
  if (diffInDays < 0) {
    return {
      value: Math.abs(diffInDays),
      unit: 'future',
      text: 'Future date'
    }
  }
  
  // Handle today
  if (diffInDays === 0) {
    return {
      value: 0,
      unit: 'today',
      text: 'Today'
    }
  }
  
  // Handle days (less than 30 days)
  if (diffInDays < 30) {
    return {
      value: diffInDays,
      unit: 'day',
      text: `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
    }
  }
  
  // Handle months (less than 365 days / 12 months)
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return {
      value: months,
      unit: 'month',
      text: `${months} month${months === 1 ? '' : 's'} ago`
    }
  }
  
  // Handle years
  const years = Math.floor(diffInDays / 365)
  const remainingMonths = Math.floor((diffInDays % 365) / 30)
  
  if (remainingMonths === 0) {
    return {
      value: years,
      unit: 'year',
      text: `${years} year${years === 1 ? '' : 's'} ago`
    }
  } else {
    return {
      value: years,
      unit: 'year',
      text: `${years} year${years === 1 ? '' : 's'}, ${remainingMonths} month${remainingMonths === 1 ? '' : 's'} ago`
    }
  }
}

export const formatRelativeTime = (dateString: string | null | undefined): string => {
  const result = getRelativeTime(dateString)
  return result ? result.text : 'No date recorded'
}